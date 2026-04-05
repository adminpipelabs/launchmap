import { Router, Request, Response } from 'express';

const router = Router();
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';

// POST /api/report/legal — returns legal requirements for a niche + location
router.post('/legal', async (req: Request, res: Response) => {
  const { idea, location } = req.body || {};
  if (!idea || !location) return res.status(400).json({ error: 'idea and location are required' });
  if (!ANTHROPIC_KEY) return res.json({ requirements: [], summary: 'API not configured' });

  const prompt = `You are a business setup advisor. List the main legal and licensing requirements to start a "${idea}" business in ${location}.

Return a JSON array of objects with this shape:
[{ "category": "Licensing", "requirement": "...", "authority": "...", "estimatedCost": "...", "timeframe": "..." }]

Include: business registration, industry licenses, insurance requirements, tax registration.
Be specific to ${location}. Max 6 items. Return only valid JSON, no explanation.`;

  try {
    const res2 = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 600, messages: [{ role: 'user', content: prompt }] }),
    });
    const d = await res2.json() as any;
    const text = d.content?.[0]?.text || '[]';
    const requirements = JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || '[]');
    return res.json({ requirements });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
