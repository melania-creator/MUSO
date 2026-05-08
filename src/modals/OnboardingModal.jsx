import { useState } from 'react';
import Icon from '../components/Icon';

const SLIDES = [
  {
    emoji: '🐾',
    color: '#FF5C4D',
    bg: 'linear-gradient(135deg, #FFE8E5, #FFF0EE)',
    title: 'Benvenuto in MUSO.',
    subtitle: 'La rete italiana che protegge gli animali.',
    desc: 'Segnala emergenze in 2 tap, trova adozioni vicino a te, supporta i rifugi. Tutto in un posto solo.',
  },
  {
    emoji: '🆘',
    color: '#FF5C4D',
    bg: 'linear-gradient(135deg, #FFB59B, #FF8A66)',
    title: 'SOS in 2 tap.',
    subtitle: 'Veloce come una notifica.',
    desc: 'Vedi un animale in difficoltà per strada? Scegli cosa hai visto, la posizione GPS viene rilevata in automatico. In meno di 30 secondi i volontari sono avvisati.',
    highlight: true,
  },
  {
    emoji: '🤝',
    color: '#6DBF8A',
    bg: 'linear-gradient(135deg, #C7E8D9, #A0D8BC)',
    title: 'Unisciti alla rete.',
    subtitle: 'Ogni ruolo fa la differenza.',
    desc: 'Adotta un animale, diventa volontario SOS, registra il tuo rifugio o apri una vetrina. La rete cresce con te.',
    roles: [
      { icon: '👤', label: 'Utente'      },
      { icon: '🌿', label: 'Pet Sitter'  },
      { icon: '🏠', label: 'Rifugio'     },
      { icon: '🏪', label: 'Vetrina'     },
    ],
  },
];

const ONBOARDING_STYLE = `
  .onb-wrap {
    position: fixed; inset: 0;
    z-index: 10000;
    display: flex; align-items: flex-end;
    background: rgba(0,0,0,.45);
  }
  @media (min-width: 600px) {
    .onb-wrap { align-items: center; justify-content: center; }
    .onb-panel { border-radius: 24px !important; max-width: 480px; width: 100%; margin: 0 auto; }
  }
  .onb-panel {
    background: #fff;
    border-radius: 24px 24px 0 0;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 -8px 40px rgba(0,0,0,.18);
  }
  .onb-hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    font-size: 72px;
    position: relative;
  }
  .onb-body {
    padding: 24px 28px 12px;
  }
  .onb-subtitle {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .onb-title {
    font-family: var(--font-display, serif);
    font-size: 32px;
    line-height: 1.1;
    margin: 0 0 10px;
  }
  .onb-desc {
    font-size: 15px;
    line-height: 1.55;
    color: var(--c-ink-soft, #555);
    margin: 0;
  }
  .onb-roles {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
  .onb-role-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    background: #F0FBF4;
    border: 1.5px solid #6DBF8A;
    font-size: 13px;
    font-weight: 500;
    color: #2A7A4A;
  }
  .onb-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 28px max(20px, env(safe-area-inset-bottom));
  }
  .onb-dots {
    display: flex; gap: 6px; align-items: center;
  }
  .onb-dot {
    width: 6px; height: 6px;
    border-radius: 999px;
    background: var(--c-line, #ddd);
    transition: all .2s;
  }
  .onb-dot.active {
    width: 20px;
    background: var(--c-accent, #FF5C4D);
  }
  .onb-skip {
    background: none; border: none;
    font-size: 13px; color: var(--c-ink-mute);
    cursor: pointer; padding: 0;
  }
  .onb-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    color: #fff;
    transition: opacity .15s;
  }
  .onb-btn:hover { opacity: .9; }
`;

export default function OnboardingModal({ onDone }) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  const next = () => {
    if (isLast) onDone();
    else setSlide(slide + 1);
  };

  return (
    <>
      <style>{ONBOARDING_STYLE}</style>
      <div className="onb-wrap">
        <div className="onb-panel">
          <div className="onb-hero" style={{ background: s.bg }}>
            <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.15))' }}>{s.emoji}</span>
          </div>

          <div className="onb-body">
            <div className="onb-subtitle" style={{ color: s.color }}>{s.subtitle}</div>
            <h2 className="onb-title">{s.title}</h2>
            <p className="onb-desc">{s.desc}</p>
            {s.roles && (
              <div className="onb-roles">
                {s.roles.map(r => (
                  <div key={r.label} className="onb-role-pill">
                    <span>{r.icon}</span> {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="onb-foot">
            <div className="onb-dots">
              {SLIDES.map((_, i) => (
                <div key={i} className={"onb-dot " + (i === slide ? 'active' : '')}/>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              {!isLast && (
                <button className="onb-skip" onClick={onDone}>Salta</button>
              )}
              <button className="onb-btn" style={{ background: s.color }} onClick={next}>
                {isLast ? 'Inizia' : 'Avanti'}
                <Icon name="arrow-right" size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
