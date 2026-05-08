import logoSrc from '../assets/Logo_MUSO.png';

export default function Logo() {
  return (
    <div className="brand">
      <img
        src={logoSrc}
        alt="MUSO"
        style={{ height: 40, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  );
}
