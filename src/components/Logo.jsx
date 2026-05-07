export default function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 14c0-3 2-5 4-5s3 1 3 3-1 3-3 3-4-1-4-1z" fill="#fff" opacity="0.95" />
          <path d="M19 14c0-3-2-5-4-5s-3 1-3 3 1 3 3 3 4-1 4-1z" fill="#fff" opacity="0.7" />
          <ellipse cx="12" cy="17" rx="2.5" ry="1.6" fill="#1F1B2E" />
        </svg>
      </div>
      <div className="brand-name">muso<em>.</em></div>
    </div>
  );
}
