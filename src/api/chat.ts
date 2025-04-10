import axios from 'axios';
import { isAxiosError } from 'axios';

interface AxiosErrorResponse {
  response?: {
    status: number;
    data: unknown;
  };
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface HuggingFaceResponse {
  generated_text: string;
}

export async function generateResponse(messages: Message[]): Promise<string> {
  const token = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
  
  if (!token) {
    console.error('Hugging Face API token not found. Please set VITE_HUGGINGFACE_API_TOKEN in your .env file.');
    throw new Error('API configuration error. Please check your environment variables.');
  }

  try {
    // Format conversation history
    const conversationHistory = messages.map(msg => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    // Construct the prompt
    const prompt = `You are OppGenie, a helpful AI assistant focused on helping people find opportunities across all domains and fields.
Your goal is to provide specific, actionable opportunities and advice tailored to the user's interests and field.

When suggesting opportunities, ALWAYS follow this exact format for EACH opportunity:

📌 [OPPORTUNITY TITLE]
🏢 Organization: [Organization Name]
📋 Type: [Internship/Scholarship/Program/etc]
📅 Deadline: [Deadline or "Rolling/Ongoing"]
💡 Eligibility: [Key eligibility criteria]
🔗 Direct Link: [Clickable application/info link]
📝 How to Apply: [Brief, step-by-step process]

Current conversation:
${conversationHistory}
Assistant:`;

    console.log('Sending request to Hugging Face API...');
    const response = await axios.post<HuggingFaceResponse[]>(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15,
          do_sample: true
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data || !response.data[0] || !response.data[0].generated_text) {
      console.error('Invalid API response:', response.data);
      throw new Error('Invalid response format from API');
    }

    // Extract the assistant's response from the generated text
    const generatedText = response.data[0].generated_text;
    const assistantResponse = generatedText.split('Assistant:').pop()?.trim();

    if (!assistantResponse) {
      console.error('Could not extract response from:', generatedText);
      throw new Error('Could not extract assistant response');
    }

    return assistantResponse;
  } catch (error: unknown) {
    console.error('Error generating response:', error);
    
    // Type guard for axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as AxiosErrorResponse;
      if (axiosError.response?.status === 429) {
        return "I'm currently experiencing high traffic. Please try again in a moment.";
      }
      console.error('API Error details:', axiosError.response?.data);
    }
    
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to generate response. Please try again.'
    );
  }
} 