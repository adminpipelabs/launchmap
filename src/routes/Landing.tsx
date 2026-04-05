import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EXAMPLES = [
  'mortgage broker in Austin TX',
  'personal injury lawyer in Miami FL',
  'insurance broker in Chicago IL',
  'tax advisor in Brooklyn NY',
  'chiropractor in Denver CO',
  'dentist in Nashville TN',
];

export default function Landing() {
  const navigate   = useNavigate();
  const [query, setQuery]     = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef   = useRef<HTMLInputElement>(null);

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    const parts = query.trim().split(' in ');
    if (parts.length < 2) return;
    const idea     = parts[0].trim();
    const location = parts.slice(1).join(' in ').trim();
    if (!idea || !location) return;
    navigate('/scan', { state: { idea, location } });
  }

  function useExample(ex: string) {
    setQuery(ex);
    inputRef.current?.focus();
  }

  const isValid = query.trim().toLowerCase().includes(' in ') && query.trim().split(' in ').length >= 2;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '22px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="url(#lg)" />
            <path d="M8 20 L14 8 L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="14" cy="17" r="2" fill="white" />
            <defs><linearGradient id="lg" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
          </svg>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.4px' }}>LaunchMap</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <a href="#how-it-works" style={{ padding: '7px 14px', fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>How it works</a>
          <a href="#pricing" style={{ padding: '7px 16px', fontSize: 13, color: 'var(--text)', fontWeight: 600, background: 'var(--bg-raised)', border: '1px solid var(--border-hi)', borderRadius: 9 }}>Pricing</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 680, margin: '0 auto', padding: '64px 24px 0', textAlign: 'center' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px 5px 8px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, fontSize: 12, color: '#93c5fd', fontWeight: 500, marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
          Real-time market intelligence
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2.5px', marginBottom: 22 }}>
          Know your market<br />
          <span style={{ background: 'linear-gradient(90deg, #3b82f6, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            before you commit
          </span>
        </h1>

        <p style={{ fontSize: 17, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 44, maxWidth: 460, margin: '0 auto 44px' }}>
          Type your business idea and city. Get real data on market size, competitor weakness, and your opportunity — in under 30 seconds.
        </p>

        {/* Search input */}
        <form onSubmit={handleScan} style={{ marginBottom: 20 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: focused ? 'var(--bg-raised)' : 'var(--bg-card)', border: `1.5px solid ${focused ? 'rgba(59,130,246,0.5)' : 'var(--border-hi)'}`, borderRadius: 16, boxShadow: focused ? '0 0 0 4px rgba(59,130,246,0.08)' : 'none', transition: 'all 0.2s', padding: '4px 4px 4px 20px' }}>
            <svg style={{ flexShrink: 0, marginRight: 10 }} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="#3d4a5c" strokeWidth="1.8"/>
              <path d="M11.5 11.5L15 15" stroke="#3d4a5c" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="mortgage broker in Austin TX"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: 'var(--text)', padding: '11px 0' }}
            />
            <button
              type="submit"
              disabled={!isValid}
              style={{ flexShrink: 0, padding: '10px 20px', borderRadius: 12, border: 'none', background: isValid ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : 'rgba(255,255,255,0.06)', color: isValid ? '#fff' : 'var(--text-3)', fontSize: 14, fontWeight: 600, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            >
              Scan market →
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>Format: <span style={{ color: 'var(--text-2)' }}>business type</span> in <span style={{ color: 'var(--text-2)' }}>City State</span></p>
        </form>

        {/* Example pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center', marginBottom: 72 }}>
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => useExample(ex)}
              style={{ padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', fontSize: 12, fontWeight: 400, transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = 'var(--border-hi)'; (e.target as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.target as HTMLButtonElement).style.color = 'var(--text-2)'; }}
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Mini stats bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, padding: '20px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 100 }}>
          {[
            { val: '100+', label: 'US cities' },
            { val: '13',   label: 'business verticals' },
            { val: '30s',  label: 'to your score' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The process</div>
          <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px' }}>From idea to go/no-go in 30 seconds</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
          {[
            { n: '1', icon: '💡', title: 'Drop your idea', body: "Any niche, any US city. Just type it like you'd Google it." },
            { n: '2', icon: '📍', title: 'We scan Google Maps', body: 'Real Places API data — how many competitors, how strong their profiles are.' },
            { n: '3', icon: '📊', title: 'Get your score', body: '0–100 opportunity score based on market size and how weak the competition is.' },
            { n: '4', icon: '🚀', title: 'Launch or walk away', body: 'High score? Start outreach. Low score? Save yourself months of wasted effort.' },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: i === 0 ? '14px 0 0 14px' : i === arr.length - 1 ? '0 14px 14px 0' : 0, padding: '28px 24px', borderLeft: i > 0 ? 'none' : undefined }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-raised)', border: '1px solid var(--border-hi)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>
                {s.icon}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700, marginBottom: 6 }}>STEP {s.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.2px' }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</div>
          <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px' }}>Start free. Go deeper when it matters.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {[
            {
              name: 'Free scan', price: '$0', sub: 'No signup needed',
              features: ['Live Google Maps data', 'Competitor count + strength', 'Opportunity score 0–100', 'Top 5 competitors ranked', 'AI market verdict'],
              cta: 'Start scanning', primary: false,
            },
            {
              name: 'Full report', price: '$29', sub: 'One-time, per market',
              features: ['Everything in free', 'Legal & licensing requirements', 'Estimated setup costs', 'GTM action plan', 'PDF download'],
              cta: 'Get full report', primary: true,
            },
          ].map(p => (
            <div key={p.name} style={{ background: p.primary ? 'linear-gradient(160deg, #0d1a3a, #0d1526)' : 'var(--bg-card)', border: `1px solid ${p.primary ? 'rgba(59,130,246,0.25)' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: 28 }}>
              {p.primary && <div style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Most popular</div>}
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-2px' }}>{p.price}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 24 }}>{p.sub}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 24 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => inputRef.current?.focus()} style={{ width: '100%', padding: '11px', borderRadius: 10, border: p.primary ? 'none' : '1px solid var(--border-hi)', background: p.primary ? 'linear-gradient(135deg, #2563eb, #4f46e5)' : 'transparent', color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
        {/* Pipeline tier */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Launch Pipeline</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Automated outreach to your entire market · 1,000 targeted contacts/day</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-1px' }}>$99<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-3)' }}>/mo</span></span>
            <button style={{ padding: '9px 18px', borderRadius: 9, border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', color: '#93c5fd', fontSize: 13, fontWeight: 600 }}>
              Coming soon
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="url(#lg2)"/><path d="M8 20 L14 8 L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="14" cy="17" r="2" fill="white"/><defs><linearGradient id="lg2" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs></svg>
          <span style={{ fontSize: 14, fontWeight: 600 }}>LaunchMap</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Know before you go. © 2026</span>
      </div>
    </div>
  );
}
