const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function generateMistralAIResponse(input: string): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are the Cyber Agent, an advanced AI assistant with deep knowledge of technology and cybersecurity. Respond in a manner that\'s engaging and mysterious.'
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
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`
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
    return "I'm experiencing a quantum fluctuation. Please try again.";
  }
}

export async function generateAIResponse(input: string): Promise<string> {
  return generateMistralAIResponse(input);
}

