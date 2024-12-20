const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const simulateHack = async (target: string): Promise<{ output: string }> => {
  const prompt = `Simulate a hacking attempt on ${target}. Provide a step-by-step output of the hacking process.`;

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: 'You are a hacking simulation AI.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { output: data.choices[0].message.content };
  } catch (error) {
    console.error('Error simulating hack:', error);
    return { output: 'Hack simulation failed.' };
  }
};

