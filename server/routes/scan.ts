import { Router, Request, Response } from 'express';

const router = Router();

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const ANTHROPIC_KEY  = process.env.ANTHROPIC_API_KEY || '';

// Search Google Places for businesses matching a query in a location
async function searchPlaces(query: string, location: string, limit = 20): Promise<any[]> {
  if (!GOOGLE_API_KEY) return [];
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.websiteUri,places.nationalPhoneNumber,places.editorialSummary,places.photos,places.regularOpeningHours',
    },
    body: JSON.stringify({ textQuery: `${query} in ${location}`, maxResultCount: Math.min(limit, 20) }),
  });
  if (!res.ok) return [];
  const d = await res.json() as any;
  return d.places || [];
}

// Score a single business profile (0–100)
function scoreProfile(place: any): number {
  let score = 0;
  const reviews = place.userRatingCount || 0;
  const rating  = place.rating || 0;
  if (reviews >= 100) score += 20;
  else if (reviews >= 50) score += 14;
  else if (reviews >= 20) score += 8;
  else if (reviews >= 5)  score += 4;
  if (rating >= 4.8 && reviews > 0) score += 15;
  else if (rating >= 4.5) score += 10;
  else if (rating >= 4.0) score += 5;
  if (place.websiteUri)       score += 15;
  if (place.editorialSummary) score += 15;
  if ((place.photos?.length || 0) >= 5) score += 15;
  else if ((place.photos?.length || 0) >= 1) score += 8;
  if (place.regularOpeningHours) score += 10;
  if (place.nationalPhoneNumber) score += 10;
  return Math.min(score, 100);
}

// Ask Claude for a quick market summary
async function getAISummary(idea: string, location: string, marketSize: number, avgScore: number, weakCount: number): Promise<string> {
  if (!ANTHROPIC_KEY) return '';
  const prompt = `You are a sharp startup advisor. Give a 2-sentence market opportunity summary for:
Business idea: "${idea}" in ${location}
Data: ${marketSize} competitors found, average profile strength ${avgScore}/100, ${weakCount} with weak online presence (score <50).
Be direct, specific, no fluff. Focus on the opportunity gap.`;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 150, messages: [{ role: 'user', content: prompt }] }),
    });
    const d = await res.json() as any;
    return d.content?.[0]?.text || '';
  } catch { return ''; }
}

// Compute opportunity score (0–100)
function opportunityScore(marketSize: number, avgProfileScore: number, weakPct: number): { score: number; label: string; color: string } {
  // More businesses + weaker profiles = better opportunity
  const sizePts   = Math.min(marketSize / 2, 40);           // up to 40pts for market size
  const weakPts   = weakPct * 40;                            // up to 40pts for weak competition
  const satPts    = Math.max(0, 20 - avgProfileScore / 5);  // up to 20pts — lower avg = more room
  const raw = Math.round(sizePts + weakPts + satPts);
  const score = Math.min(raw, 100);
  if (score >= 75) return { score, label: 'High opportunity', color: '#10b981' };
  if (score >= 50) return { score, label: 'Good opportunity', color: '#f59e0b' };
  if (score >= 30) return { score, label: 'Moderate',         color: '#f97316' };
  return              { score, label: 'Competitive market',   color: '#ef4444' };
}

// POST /api/scan
router.post('/', async (req: Request, res: Response) => {
  const { idea, location } = req.body || {};
  if (!idea || !location) return res.status(400).json({ error: 'idea and location are required' });

  try {
    // Run up to 2 search queries to get broader coverage
    const queries = [idea, `${idea} company`];
    const seen = new Set<string>();
    const places: any[] = [];
    for (const q of queries) {
      const results = await searchPlaces(q, location, 20);
      for (const p of results) {
        if (p.id && !seen.has(p.id)) { seen.add(p.id); places.push(p); }
      }
    }

    const scores    = places.map(scoreProfile);
    const avgScore  = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const weakCount = scores.filter(s => s < 50).length;
    const weakPct   = scores.length ? weakCount / scores.length : 0;
    const opportunity = opportunityScore(places.length, avgScore, weakPct);

    // Top 5 competitors (highest scored = most established)
    const ranked = places
      .map((p, i) => ({ name: p.displayName?.text || 'Unknown', score: scores[i], reviews: p.userRatingCount || 0, rating: p.rating || 0, website: !!p.websiteUri }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // AI summary (fast, cheap — Haiku)
    const aiSummary = await getAISummary(idea, location, places.length, avgScore, weakCount);

    return res.json({
      idea,
      location,
      marketSize:      places.length,
      avgProfileScore: avgScore,
      weakCompetitors: weakCount,
      weakPct:         Math.round(weakPct * 100),
      opportunity,
      topCompetitors:  ranked,
      aiSummary,
      scannedAt:       new Date().toISOString(),
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
