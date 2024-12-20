import { generateMockResponse } from './mock-ai'

export async function getAIResponse(input: string): Promise<string> {
  try {
    // Simulate more complex processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    return generateMockResponse(input)
  } catch (error) {
    console.error('Error generating AI response:', error)
    return "I'm experiencing a quantum fluctuation in my neural network. Please restate your query."
  }
}

