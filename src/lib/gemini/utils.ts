export const parseGeminiResponse = <T>(data: unknown): T => {
  if (typeof data !== 'string') {
    throw new Error('AI response did not return text');
  }

  const jsonString = data.replace(/```json\n?|```/g, '').trim();

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    throw new Error(`Failed to parse JSON from AI response: ${e}`);
  }
};
