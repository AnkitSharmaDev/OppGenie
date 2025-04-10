import axios from 'axios';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export const generateResponse = async (messages: Message[]): Promise<string> => {
  try {
    const token = import.meta.env.VITE_HF_TOKEN;
    if (!token) {
      throw new Error('Hugging Face API token is not configured');
    }

    const conversationHistory = messages.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    const prompt = `You are OppGenie, an AI assistant specialized in helping Gen Z find meaningful opportunities in tech and computer science. Focus on providing specific, actionable opportunities and advice.

When suggesting opportunities, always include:
- Role title and organization
- Required technical skills and qualifications
- Application process and deadlines
- Location (remote/hybrid/in-person)
- Compensation details (if available)
- Growth opportunities
- Links or resources for more information

For computer science and tech opportunities, focus on:
1. Software Development:
   - Frontend (React, Vue, Angular)
   - Backend (Node.js, Python, Java)
   - Full-stack positions
   - Mobile development
   - Cloud and DevOps

2. Open Source:
   - First-time contributor opportunities
   - Good first issues
   - Mentored projects
   - Hackathons

3. Internships:
   - Tech company internships
   - Research positions
   - Summer of Code programs

4. Learning Resources:
   - Online courses
   - Coding bootcamps
   - Technical certifications
   - Project-based learning

Current conversation:
${conversationHistory}`;

    const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    const result = await response.json();
    return result[0].generated_text;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
};
