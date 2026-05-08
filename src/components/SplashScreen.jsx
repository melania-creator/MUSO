import { useEffect, useState } from 'react';
import LogoMuso from '../assets/LogoMuso.png';

const STYLE = `
  .splash {
    position: fixed; inset: 0;
    z-index: 99999;
    background: #D4318A;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: opacity .5s ease;
  }
  .splash.fade-out { opacity: 0; pointer-events: none; }
  .splash-logo {
    width: 120px; height: 120px;
    border-radius: 28px;
    object-fit: contain;
    background: #fff;
    padding: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    animation: splash-pop .45s cubic-bezier(.34,1.56,.64,1) both;
  }
  .splash-name {
    font-family: var(--font-display, serif);
    font-size: 42px;
    color: #fff;
    letter-spacing: -.5px;
    animation: splash-pop .45s cubic-bezier(.34,1.56,.64,1) .1s both;
  }
  .splash-tagline {
    font-size: 14px;
    color: rgba(255,255,255,.75);
    font-weight: 500;
    animation: splash-pop .45s cubic-bezier(.34,1.56,.64,1) .2s both;
  }
  @keyframes splash-pop {
    from { opacity: 0; transform: scale(.8); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1400);
    const t2 = setTimeout(() => onDone(), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <div className={'splash' + (fading ? ' fade-out' : '')}>
        <img className="splash-logo" src={LogoMuso} alt="MUSO" />
        <div className="splash-name">MUSO</div>
        <div className="splash-tagline">La rete che salva gli animali</div>
      </div>
    </>
  );
}
