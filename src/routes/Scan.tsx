import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const STEPS = [
  { icon: '📍', label: 'Searching Google Maps' },
  { icon: '🏢', label: 'Scoring competitor profiles' },
  { icon: '📊', label: 'Calculating opportunity score' },
  { icon: '🤖', label: 'Generating AI verdict' },
];

export default function Scan() {
  const { state } = useLocation() as { state: { idea: string; location: string } };
  const navigate  = useNavigate();
  const [step, setStep]   = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!state?.idea) { navigate('/'); return; }

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < STEPS.length) setStep(current);
    }, 1200);

    fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: state.idea, location: state.location }),
    })
      .then(r => r.json())
      .then(data => {
        clearInterval(interval);
        if (data.error) { setError(data.error); return; }
        navigate('/results', { state: { result: data } });
      })
      .catch(e => { clearInterval(interval); setError(e.message); });

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400, animation: 'fade-up 0.4s ease' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="url(#lgs)"/><path d="M8 20 L14 8 L20 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="14" cy="17" r="2" fill="white"/><defs><linearGradient id="lgs" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs></svg>
        </div>

        {/* Query summary */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>Scanning your market</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
            <span style={{ color: 'var(--text)' }}>{state?.idea}</span>
            <span style={{ color: 'var(--text-3)', margin: '0 8px' }}>in</span>
            <span style={{ color: 'var(--text)' }}>{state?.location}</span>
          </p>
        </div>

        {error ? (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, marginBottom: 6, color: '#fca5a5' }}>Scan failed</div>
            <div style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 16 }}>{error}</div>
            <button onClick={() => navigate('/')} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid var(--border-hi)', background: 'none', color: 'var(--text-2)', fontSize: 13 }}>← Go back</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STEPS.map((s, i) => {
              const done    = i < step;
              const active  = i === step;
              const pending = i > step;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderRadius: 12, background: active ? 'rgba(59,130,246,0.07)' : done ? 'transparent' : 'transparent', border: `1px solid ${active ? 'rgba(59,130,246,0.2)' : 'var(--border)'}`, opacity: pending ? 0.3 : 1, transition: 'all 0.3s' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: done ? 'rgba(34,197,94,0.12)' : active ? 'rgba(59,130,246,0.15)' : 'var(--bg-raised)', border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : active ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>
                    {done
                      ? <span style={{ color: 'var(--green)', fontSize: 13 }}>✓</span>
                      : active
                      ? <div style={{ width: 14, height: 14, border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      : <span style={{ fontSize: 12 }}>{s.icon}</span>
                    }
                  </div>
                  <span style={{ fontSize: 14, fontWeight: active ? 500 : 400, color: done ? 'var(--text-2)' : active ? 'var(--text)' : 'var(--text-3)' }}>{s.label}</span>
                  {active && <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                    {[0,1,2].map(d => <div key={d} style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6', animation: `pulse-dot 1.2s ${d * 0.2}s infinite` }} />)}
                  </div>}
                  {done && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>done</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
