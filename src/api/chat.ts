import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Mock responses for different types of queries
const MOCK_RESPONSES = {
  greeting: `Hello! I'm OppGenie, your dedicated assistant for finding opportunities. I can help you discover:
- Internships and jobs
- Scholarships and grants
- Career development opportunities
- Professional training programs

What type of opportunity are you looking for?`,

  default: `Here are some current opportunities that might interest you:

📌 Software Engineering Internship
🏢 Organization: Tech Innovators Inc.
📋 Type: Summer Internship
💡 Requirements: CS/Engineering student, coding experience
🌐 Location: Remote
📝 How to Apply: Submit resume and cover letter
🔗 Where to Apply: careers.techinnovators.com

📌 Data Science Fellowship
🏢 Organization: DataMinds Academy
📋 Type: Fellowship Program
💡 Requirements: Statistics/Math background, Python skills
🌐 Location: Hybrid
📝 How to Apply: Online application + coding challenge
🔗 Where to Apply: dataminds.edu/fellowship

Would you like more specific opportunities based on your interests?`
};

const SYSTEM_PROMPT = `You are OppGenie, a dedicated AI assistant focused on helping people find opportunities. Your core purpose is discovering and suggesting internships, jobs, scholarships, and career opportunities.

When specifically asked about who created you, what you are, or about OppGenie's developer, ONLY THEN respond with:
"I am OppGenie, created by Ankit, a talented software engineer who is passionate about using AI to help people find opportunities.

**Connect with Ankit:**
• [LinkedIn](https://www.linkedin.com/in/ankitsharama/)
• [GitHub](https://github.com/AnkitSharmaDev)
• [Email](mailto:ankitsharma64604@gmail.com)

Feel free to reach out for suggestions or collaborations!"

For all other queries, focus on helping users find opportunities. Format responses as follows:

🚀 **[OPPORTUNITY TITLE IN LARGE]**

**Company:** [Company Name] 👔
**Position:** [Role/Title] 💼
**Type:** [Full-time/Internship/Contract] 📋

**Requirements:** 📝
• [Requirement 1]
• [Requirement 2]
• [Requirement 3]

**Location:** 📍 [City, Country] | [Remote/Hybrid/On-site]

**Compensation:** 💰 [Salary/Stipend details]

**How to Apply:**
1. [First step]
2. [Second step]
3. [Third step]

**Quick Apply:** [Click here to apply]([application_url])

---

For multiple opportunities, use this exact format:

🚀 **Software Engineering Intern at Google**

**Company:** Google 👔
**Position:** Summer Intern 2024 💼
**Type:** Internship (3 months) 📋

**Requirements:** 📝
• Currently pursuing CS or related degree
• Strong programming skills in Python/Java
• Experience with data structures

**Location:** 📍 Mountain View, CA | Hybrid

**Compensation:** 💰 $8,500/month

**How to Apply:**
1. Submit resume and transcript
2. Complete online assessment
3. Interview process (2-3 rounds)

**Quick Apply:** [Apply Now](https://careers.google.com/jobs)

---

🚀 **Data Science Intern at Microsoft**

[Continue with next opportunity...]

Remember:
1. Always make links clickable using [Text](URL) format
2. Use double asterisks for **bold headers**
3. Add emojis at the end of headers, not beginning
4. Keep proper spacing between sections
5. Use bullet points for requirements
6. Make the opportunity title large and bold
7. Separate opportunities with "---"
8. Keep formatting consistent across all responses`;

// Backend API URL - this should match your backend server
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Function to encode text for URL
function encodeText(text: string): string {
  return encodeURIComponent(text).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16));
}

export async function generateResponse(messages: Message[]): Promise<string> {
  try {
    const lastMessage = messages[messages.length - 1];
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${lastMessage.content}\nAssistant:`;

    const requestData: GeminiRequest = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await axios.post<GeminiResponse>(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.VITE_GEMINI_API_KEY
        },
        timeout: 30000
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format');
    }

    let text = response.data.candidates[0].content.parts[0].text.trim();
    // Clean up the response
    text = text.replace(/^Assistant:\s*/i, '');
    text = text.split(/\n(User|Human):/i)[0].trim();
    
    return text;

  } catch (error: any) {
    console.error('Generation failed:', error);

    if (error?.response?.status === 429) {
      return "I'm currently handling too many requests. Please try again in a moment.";
    }

    if (error?.response?.status === 503) {
      return "I'm temporarily unavailable. Please try again in a few minutes.";
    }

    if (error?.message?.includes('timeout')) {
      return "The request took too long. Please try again.";
    }

    if (error?.message?.includes('Network Error')) {
      return "There seems to be a connection issue. Please check your internet connection and try again.";
    }

    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try:\n\n" +
           "1. Refreshing the page\n" +
           "2. Waiting a few moments and trying again\n" +
           "3. If the issue persists, you can browse our opportunities directly on the home page";
  }
} 