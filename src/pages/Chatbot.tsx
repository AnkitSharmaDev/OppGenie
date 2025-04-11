import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send, Trash2 } from 'lucide-react';
import { generateResponse } from '../api/chat';
import { db } from '../firebase';
import { collection, query, orderBy, addDoc, serverTimestamp, where, onSnapshot, deleteDoc, getDocs } from 'firebase/firestore';

import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: any;
}

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds

    const setupFirestoreListener = () => {
      try {
        const q = query(
          collection(db, 'messages'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const newMessages: Message[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              newMessages.push({
                id: doc.id,
                role: data.role,
                content: data.content,
                timestamp: data.timestamp
              });
            });
            setMessages(newMessages);
            setRetryCount(0); // Reset retry count on success
          }, 
          (error) => {
            console.error('Error fetching messages:', error);
            
            // Check if error is due to ad blocker or network issues
            if (error.code === 'permission-denied' || error.code === 'unavailable') {
              toast.error('Unable to connect to chat service. Please check your internet connection or disable ad blockers.');
            } else if (retryCount < MAX_RETRIES) {
              toast.error('Failed to load messages. Retrying...');
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
                setupFirestoreListener();
              }, RETRY_DELAY * (retryCount + 1));
            } else {
              toast.error('Could not connect to the chat service. Please refresh the page or try again later.');
            }
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error('Error setting up Firestore listener:', error);
        toast.error('Failed to initialize chat. Please refresh the page.');
        return () => {}; // Return empty cleanup function
      }
    };

    const unsubscribe = setupFirestoreListener();
    return () => unsubscribe();
  }, [user, retryCount]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = async () => {
    if (!user) return;
    
    try {
      const q = query(collection(db, 'messages'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setMessages([]);
      toast.success('Chat history cleared');
    } catch (error) {
      console.error('Error clearing chat:', error);
      toast.error('Failed to clear chat history');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setInput('');
    setIsLoading(true);

    try {
      // Add user message to Firestore with retry logic
      let attempts = 0;
      const MAX_ATTEMPTS = 3;
      
      while (attempts < MAX_ATTEMPTS) {
        try {
          await addDoc(collection(db, 'messages'), {
            ...userMessage,
            userId: user.uid,
            timestamp: serverTimestamp()
          });
          break;
        } catch (error) {
          attempts++;
          if (attempts === MAX_ATTEMPTS) {
            console.error('Failed to save message:', error);
            toast.error('Failed to send message. Please check your internet connection or try disabling ad blockers.');
            setIsLoading(false);
            return;
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }

      // Generate AI response
      let response: string;
      try {
        response = await generateResponse([...messages, userMessage]);
      } catch (error) {
        console.error('Error generating AI response:', error);
        response = "I apologize, but I'm currently experiencing technical difficulties. In the meantime, you can:\n\n" +
                  "1. Browse our Opportunities page for the latest listings\n" +
                  "2. Use the search feature to find specific opportunities\n" +
                  "3. Try asking your question again in a few minutes";
      }

      // Add AI response to Firestore with retry logic
      attempts = 0;
      while (attempts < MAX_ATTEMPTS) {
        try {
          await addDoc(collection(db, 'messages'), {
            role: 'assistant',
            content: response,
            userId: user.uid,
            timestamp: serverTimestamp()
          });
          break;
        } catch (error) {
          attempts++;
          if (attempts === MAX_ATTEMPTS) {
            console.error('Failed to save AI response:', error);
            toast.error('Failed to save response. Please check your connection.');
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast.error('Failed to process message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat with OppGenie</h1>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-muted rounded-full"
          aria-label="Clear chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about opportunities..."
          className="w-full p-4 pr-12 rounded-lg border bg-background"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/80 disabled:opacity-50"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
} 