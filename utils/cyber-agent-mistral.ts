const MISTRAL_API_KEY = 'B5uShX2m6M9s4xb7fFHg0z6pcXTmTQhC';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function generateMistralAIResponse(input: string): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are the Cyber Agent, an advanced AI assistant with deep knowledge of technology, cybersecurity, and futuristic concepts. Respond in a manner that\'s engaging, slightly mysterious, and showcases your vast knowledge. Occasionally use tech jargon or make references to advanced concepts.'
    },
    {
      role: 'user',
      content: input
    }
  ];

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: messages,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm experiencing a quantum fluctuation in my neural network. Please restate your query.";
  }
}

export async function generateAIResponse(input: string): Promise<string> {
  return generateMistralAIResponse(input);
}

// Fallback function in case Mistral AI API is not available
export function generateMockResponse(input: string): string {
  const responses = [
    "Fascinating query. Let me process that through my quantum neural networks...",
    "Your input has triggered a cascade of possibilities in my cognitive matrix.",
    "Analyzing your request at the speed of entangled particles...",
    "Interesting. That concept intersects with several cutting-edge technologies we're developing.",
    "I'm cross-referencing your query with our vast databanks of futuristic knowledge.",
    "Your question touches on some of the most advanced concepts in our digital frontier.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

