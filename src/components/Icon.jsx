export default function Icon({ name, size = 18 }) {
  const s = size;
  const wrap = (children) => (
    <svg className="icn" viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">{children}</svg>
  );
  switch (name) {
    case 'paw': return wrap(<>
      <path className="duo-fill" d="M5 16c0-2.5 2.5-4 5-4s7 1.5 7 4c0 2-2 3.2-4 3.5-1.5.2-3.5 0-5-1-1.5-1-3-1-3-2.5z" />
      <path d="M5 16c0-2.5 2.5-4 5-4s7 1.5 7 4c0 2-2 3.2-4 3.5-1.5.2-3.5 0-5-1-1.5-1-3-1-3-2.5z" />
      <circle cx="7.5" cy="8" r="1.6" /><circle cx="11.5" cy="6.2" r="1.6" />
      <circle cx="15.5" cy="7.5" r="1.6" /><circle cx="18.5" cy="11" r="1.4" />
    </>);
    case 'map': return wrap(<>
      <path className="duo-fill" d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
      <path d="M9 3v16M15 5v16" />
    </>);
    case 'heart': return wrap(<>
      <path className="duo-fill" d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </>);
    case 'home': return wrap(<>
      <path className="duo-fill" d="M4 11 12 4l8 7v9h-5v-6h-6v6H4v-9z" />
      <path d="M4 11 12 4l8 7v9h-5v-6h-6v6H4v-9z" />
    </>);
    case 'shop': return wrap(<>
      <path className="duo-fill" d="M4 8h16l-1 11H5L4 8z" />
      <path d="M4 8h16l-1 11H5L4 8z" /><path d="M9 8V6a3 3 0 1 1 6 0v2" />
    </>);
    case 'sitter': return wrap(<>
      <circle cx="12" cy="8" r="3.2" /><path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
    </>);
    case 'shelter': return wrap(<>
      <path className="duo-fill" d="M3 11 12 4l9 7v9H3v-9z" />
      <path d="M3 11 12 4l9 7v9H3v-9z" /><path d="M9 20v-5h6v5" />
    </>);
    case 'sos': return wrap(<>
      <path className="duo-fill" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5M12 16v.5" />
    </>);
    case 'search': return wrap(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.5-4.5" /></>);
    case 'bell': return wrap(<>
      <path className="duo-fill" d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2H4.5L6 17z" />
      <path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2H4.5L6 17z" /><path d="M10 21h4" />
    </>);
    case 'plus': return wrap(<path d="M12 5v14M5 12h14" />);
    case 'pin': return wrap(<>
      <path className="duo-fill" d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
      <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.6" />
    </>);
    case 'arrow-right': return wrap(<><path d="M5 12h14M13 6l6 6-6 6" /></>);
    case 'arrow-left': return wrap(<><path d="M19 12H5M11 18l-6-6 6-6" /></>);
    case 'arrow-up-right': return wrap(<><path d="M7 17 17 7M9 7h8v8" /></>);
    case 'check': return wrap(<path d="m5 13 4 4 10-10" />);
    case 'chevron-down': return wrap(<path d="m6 9 6 6 6-6" />);
    case 'plus-thin': return wrap(<path d="M12 6v12M6 12h12" />);
    case 'minus': return wrap(<path d="M6 12h12" />);
    case 'crosshair': return wrap(<><circle cx="12" cy="12" r="7" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></>);
    case 'filter': return wrap(<path d="M4 6h16M7 12h10M10 18h4" />);
    case 'gift': return wrap(<>
      <path className="duo-fill" d="M4 9h16v11H4z" />
      <path d="M4 9h16v11H4zM12 9V20M4 9l3-4a2 2 0 0 1 5 4 2 2 0 0 1 5-4l3 4" />
    </>);
    case 'food': return wrap(<>
      <circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" />
    </>);
    case 'clock': return wrap(<><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>);
    case 'star': return wrap(<path d="m12 4 2.5 5 5.5.8-4 4 1 5.5L12 16.8 7 19.3l1-5.5-4-4 5.5-.8L12 4z" />);
    case 'shield': return wrap(<>
      <path className="duo-fill" d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" />
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" />
    </>);
    case 'message': return wrap(<>
      <path className="duo-fill" d="M4 5h16v12H8l-4 4V5z" />
      <path d="M4 5h16v12H8l-4 4V5z" />
    </>);
    case 'close': return wrap(<path d="m6 6 12 12M18 6 6 18" />);
    case 'compass': return wrap(<><circle cx="12" cy="12" r="9" /><path d="m9 15 2-5 5-2-2 5-5 2z" /></>);
    case 'camera': return wrap(<>
      <path className="duo-fill" d="M4 8h4l2-2h4l2 2h4v11H4V8z" />
      <path d="M4 8h4l2-2h4l2 2h4v11H4V8z" /><circle cx="12" cy="13" r="3.5" />
    </>);
    case 'donate': return wrap(<>
      <path d="M4 12h16M8 12V7a4 4 0 0 1 8 0v5" /><circle cx="12" cy="16" r="2" />
    </>);
    case 'edit': return wrap(<>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>);
    case 'trash': return wrap(<>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </>);
    case 'trophy': return wrap(<>
      <path className="duo-fill" d="M8 21h8M12 17v4M7 4H5a2 2 0 0 0-2 2v2c0 3 2 5 4 6" />
      <path d="M17 4h2a2 2 0 0 1 2 2v2c0 3-2 5-4 6M5 4h14v8a7 7 0 0 1-14 0V4z" />
    </>);
    default: return null;
  }
}
