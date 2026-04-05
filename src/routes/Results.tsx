import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Competitor = { name: string; score: number; reviews: number; rating: number; website: boolean };
type Opportunity = { score: number; label: string; color: string };
type ScanResult = {
  idea: string; location: string;
  marketSize: number; avgProfileScore: number;
  weakCompetitors: number; weakPct: number;
  opportunity: Opportunity;
  topCompetitors: Competitor[];
  aiSummary: string;
};
type LegalReq = { category: string; requirement: string; authority: string; estimatedCost: string; timeframe: string };

function OpportunityRing({ score, color }: { score: number; color: string }) {
  const size = 140, r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={70} cy={70} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={10} />
      <circle cx={70} cy={70} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
        style={{ animation: 'draw-ring 1.2s ease forwards', transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
      />
      <text x="70" y="65" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="Inter, system-ui">{score}</text>
      <text x="70" y="84" textAnchor="middle" fill="#3d4a5c" fontSize="11" fontWeight="500" fontFamily="Inter, system-ui">out of 100</text>
    </svg>
  );
}

function Stat({ value, label, sub, color }: { value: string; label: string; sub?: string; color?: string }) {
  return (
    <div style={{ padding: '22px 24px' }}>
      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px', color: color || 'var(--text)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function Results() {
  const { state } = useLocation() as { state: { result: ScanResult } };
  const navigate  = useNavigate();
  const [legal, setLegal]         = useState<LegalReq[] | null>(null);
  const [legalLoading, setLegalLoading] = useState(false);
  const [showPaywall, setShowPaywall]   = useState(false);
  const [visible, setVisible]           = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  if (!state?.result) { navigate('/'); return null; }
  const r = state.result;

  const opportunityColor = r.opportunity.color;
  const competitionLabel = r.avgProfileScore >= 70 ? 'Saturated' : r.avgProfileScore >= 45 ? 'Moderate' : 'Weak';
  const competitionColor = r.avgProfileScore >= 70 ? 'var(--red)' : r.avgProfileScore >= 45 ? 'var(--amber)' : 'var(--green)';

  async function unlockReport() {
    setShowPaywall(false);
    setLegalLoading(true);
    try {
      const res = await fetch('/api/report/legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: r.idea, location: r.location }),
      });
      const d = await res.json();
      setLegal(d.requirements || []);
    } catch { setLegal([]); }
    finally { setLegalLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Paywall */}
      {showPaywall && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#0d1526', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: 36, maxWidth: 420, width: '100%', animation: 'fade-up 0.25s ease' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 20 }}>📋</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 8 }}>Full market report</h3>
            <p style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Get legal requirements, startup costs and a step-by-step GTM plan for <strong style={{ color: 'var(--text)' }}>{r.idea}</strong> in <strong style={{ color: 'var(--text)' }}>{r.location}</strong>.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {['Licensing & legal requirements', 'Estimated startup costs', 'GTM action plan', 'PDF export'].map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)' }}><span style={{ color: 'var(--green)' }}>✓</span>{f}</li>
              ))}
            </ul>
            <button onClick={unlockReport} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
              Unlock for $29
            </button>
            <button onClick={() => setShowPaywall(false)} style={{ width: '100%', padding: '10px', borderRadius: 12, border: 'none', background: 'none', color: 'var(--text-3)', fontSize: 13 }}>
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="url(#lgr)"/><path d="M8 20 L14 8 L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="14" cy="17" r="2" fill="white"/><defs><linearGradient id="lgr" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs></svg>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>LaunchMap</span>
        </div>
        <button onClick={() => navigate('/')} style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid var(--border-hi)', background: 'none', color: 'var(--text-2)', fontSize: 13 }}>
          ← New scan
        </button>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px', opacity: visible ? 1 : 0, transition: 'opacity 0.4s', animation: visible ? 'fade-up 0.4s ease' : 'none' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Market scan complete</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.8px', marginBottom: 10, textTransform: 'capitalize' }}>
            {r.idea} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>·</span> {r.location}
          </h1>
          {r.aiSummary && (
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 580 }}>{r.aiSummary}</p>
          )}
        </div>

        {/* Score + stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 20 }}>
          {/* Score ring */}
          <div style={{ padding: '28px 28px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <OpportunityRing score={r.opportunity.score} color={opportunityColor} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: opportunityColor }}>{r.opportunity.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Opportunity score</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ borderRight: '1px solid var(--border)' }}>
            <Stat value={String(r.marketSize)} label="Competitors found" sub={`in ${r.location}`} />
          </div>
          <div style={{ borderRight: '1px solid var(--border)' }}>
            <Stat value={`${r.weakPct}%`} label="Have weak profiles" sub="opportunity gap" color={r.weakPct > 40 ? 'var(--green)' : r.weakPct > 20 ? 'var(--amber)' : 'var(--red)'} />
          </div>
          <div>
            <Stat value={`${r.avgProfileScore}`} label="Avg profile score" sub={`${competitionLabel} competition`} color={competitionColor} />
          </div>
        </div>

        {/* Top competitors */}
        {r.topCompetitors.length > 0 && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 20 }}>
            <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Top competitors</span>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Ranked by Google profile strength</span>
            </div>
            {r.topCompetitors.map((c, i) => {
              const barColor = c.score >= 70 ? 'var(--red)' : c.score >= 45 ? 'var(--amber)' : 'var(--green)';
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 22px', borderBottom: i < r.topCompetitors.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--bg-raised)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--text-3)', fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                      {c.reviews.toLocaleString()} reviews · {c.rating}★{!c.website && ' · no website'}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 100, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                      <div style={{ width: `${c.score}%`, height: '100%', borderRadius: 3, background: barColor, transition: 'width 1s ease' }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', width: 32, textAlign: 'right' }}>{c.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Legal requirements */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Legal requirements</span>
            {!legal && !legalLoading && (
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(59,130,246,0.1)', color: '#93c5fd', fontWeight: 600 }}>Full report</span>
            )}
          </div>
          <div style={{ padding: '20px 22px' }}>
            {legalLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-2)', fontSize: 14 }}>
                <div style={{ width: 16, height: 16, border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Researching requirements for {r.location}…
              </div>
            ) : legal ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {legal.length === 0
                  ? <p style={{ color: 'var(--text-2)', fontSize: 14 }}>No specific requirements found.</p>
                  : legal.map((l, i) => (
                    <div key={i} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 7, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'rgba(59,130,246,0.1)', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l.category}</span>
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 5 }}>{l.requirement}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{l.authority} · {l.estimatedCost} · {l.timeframe}</div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <div style={{ filter: 'blur(5px)', pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: 10, userSelect: 'none' }}>
                  {['Business registration', 'Industry licensing', 'Professional liability insurance', 'State tax registration'].map(f => (
                    <div key={f} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
                      <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 5 }}>{f}</div>
                      <div style={{ height: 9, background: 'rgba(255,255,255,0.04)', borderRadius: 4, width: '55%' }} />
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button onClick={() => setShowPaywall(true)} style={{ padding: '12px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: '#fff', fontWeight: 700, fontSize: 14, boxShadow: '0 8px 32px rgba(37,99,235,0.35)' }}>
                    Unlock full report — $29
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pipeline CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0d1a3a, #0d1526)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 'var(--radius)', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 6 }}>
              Ready to reach all {r.marketSize} {r.idea}s in {r.location}?
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
              Launch automated outreach — personalised emails to every weak competitor.
            </div>
          </div>
          <button style={{ padding: '12px 24px', borderRadius: 11, border: 'none', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: '#fff', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}>
            Launch pipeline — $99/mo
          </button>
        </div>
      </div>
    </div>
  );
}
