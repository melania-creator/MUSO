import logoSrc from '../assets/logoTEST2.png';

export default function Logo() {
  return (
    <div className="brand">
      <img
        src={logoSrc}
        alt="MUSO"
        style={{ height: 40, width: 'auto', objectFit: 'contain' }}
      />
      <span className="brand-name">MUSO</span>
    </div>
  );
}
