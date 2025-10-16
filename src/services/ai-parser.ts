import Anthropic from '@anthropic-ai/sdk';
import type { AIParseResult } from '../types/ai.js';

export class AIExpenseParser {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async parseExpense(naturalLanguageInput: string): Promise<AIParseResult> {
    const prompt = `Parse the following expense description into structured data:

"${naturalLanguageInput}"

Extract:
1. Description (clear summary of what was purchased)
2. Amount (numeric value, in USD if not specified)
3. Category (food, transportation, entertainment, utilities, shopping, healthcare, education, or other)
4. Date (default to today if not specified)
5. Tags (relevant keywords)

Respond in JSON format:
{
  "description": "...",
  "amount": 0.00,
  "category": "...",
  "date": "YYYY-MM-DD",
  "tags": ["..."],
  "confidence": 0.0-1.0
}`;

    const message = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      ...parsed,
      date: new Date(parsed.date),
    };
  }

  async analyzeSpending(expenses: Array<{ category: string; amount: number; date: Date }>): Promise<{
    summary: string;
    insights: string[];
  }> {
    const expenseData = JSON.stringify(expenses, null, 2);

    const prompt = `Analyze the following spending data and provide insights:

${expenseData}

Provide:
1. A brief summary of spending patterns
2. Key insights about the user's expenses
3. Practical recommendations for better budgeting

Respond in JSON format:
{
  "summary": "...",
  "insights": ["...", "..."]
}`;

    const message = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    return JSON.parse(jsonMatch[0]);
  }
}
