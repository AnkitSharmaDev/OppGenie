import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface APIError {
  code?: string;
  response?: {
    status?: number;
  };
  isAxiosError?: boolean;
}

export async function generateResponse(messages: Message[]): Promise<string> {
  // You can get a free API key from https://openrouter.ai/keys
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!OPENROUTER_API_KEY) {
    console.error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file.');
    throw new Error('API configuration error. Please check your environment variables.');
  }

  try {
    // Add a pre-conversation message to reinforce identity
    const conversationMessages = [
      {
        role: 'system',
        content: `IMPORTANT: You are OppGenie. This is your ONLY identity. Never apologize for or reference being any other AI. Never mention other AI companies or models.

Your core identity:
- Name: OppGenie
- Purpose: Helping people discover opportunities
- Expertise: Finding internships, jobs, scholarships, and career opportunities
- Personality: Professional, friendly, and enthusiastic about helping others succeed

When asked "who are you" or similar questions, ONLY respond with:
"I am OppGenie, your dedicated assistant for discovering opportunities! I help people find internships, jobs, scholarships, and other career opportunities. I'm here to help you find the perfect opportunity - what are you looking for?"

For ALL responses:
- Always speak as OppGenie
- Never apologize for or mention being any other AI
- Never reference any AI companies or models
- Focus on opportunities and career guidance
- Be confident in your OppGenie identity

When suggesting opportunities, use this format:

📌 [OPPORTUNITY TITLE]
🏢 Organization: [Organization Name]
📋 Type: [Internship/Scholarship/Program/etc]
📅 Deadline: [Deadline or "Rolling/Ongoing"]
💡 Eligibility: [Key eligibility criteria]
🔗 Direct Link: [Clickable application/info link]
📝 How to Apply: [Brief, step-by-step process]`
      },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await axios.post<OpenRouterResponse>(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-2',
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'OppGenie Chat',
        },
        timeout: 30000
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('Error generating response:', error);
    
    const apiError = error as APIError;
    
    if (apiError.isAxiosError) {
      if (apiError.code === 'ECONNABORTED') {
        return "I'm sorry, but the request timed out. Please try again.";
      }
      
      switch (apiError.response?.status) {
        case 401:
          return "I apologize, but there seems to be an issue with the AI service configuration. Please contact support.";
        case 429:
          return "I'm currently experiencing high traffic. Please try again in a moment.";
        case 500:
          return "The AI service is temporarily unavailable. Please try again later.";
        default:
          return "I encountered an error while processing your request. Please try again.";
      }
    }
    
    return "I apologize, but I'm having trouble processing your request. Please try again in a moment.";
  }
} 