const MISTRAL_API_KEY = 'B5uShX2m6M9s4xb7fFHg0z6pcXTmTQhC';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const simulateHack = async (target: string): Promise<{ output: string }> => {
  const prompt = `Simulate a hacking attempt on ${target}. Provide a step-by-step output of the hacking process, using technical jargon and cybersecurity concepts. The response should be concise and focused only on the hacking simulation.`;

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          { role: 'system', content: 'You are a hacking simulation AI. Provide realistic, technical responses for hacking attempts.' },
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
    return { output: 'Hack simulation failed due to unexpected firewall interference.' };
  }
};

