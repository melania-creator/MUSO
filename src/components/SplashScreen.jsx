import { useEffect, useState } from 'react';
import LogoMuso from '../assets/logoTEST.png';

const STYLE = `
  .splash {
    position: fixed; inset: 0;
    z-index: 99999;
    background: #F2A0C4;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .5s ease;
  }
  .splash.fade-out { opacity: 0; pointer-events: none; }
  .splash-logo {
    width: 180px; height: 180px;
    object-fit: contain;
    animation: splash-pop .5s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes splash-pop {
    from { opacity: 0; transform: scale(.75); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2600);
    const t2 = setTimeout(() => onDone(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <div className={'splash' + (fading ? ' fade-out' : '')}>
        <img className="splash-logo" src={LogoMuso} alt="MUSO" />
      </div>
    </>
  );
}
