// src/services/aiService.ts
import { AgentDecision } from '../types';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const aiService = {
  processEvent: async (eventData: any): Promise<AgentDecision[]> => {
    if (!eventData || typeof eventData !== 'object') {
      throw new Error('Invalid event data provided to AI Orchestrator.');
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${import.meta.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analyze this procurement event: ${JSON.stringify(eventData)}` }] }]
        })
      });

      if (!response.ok) throw new Error(`AI Service Error: ${response.statusText}`);

      const data = await response.json();
      // Parsear respuesta del LLM a AgentDecision[]
      return JSON.parse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('AI Processing failed:', error);
      throw new Error('Failed to process event through AI Orchestrator');
    }
  }
};
