import Icon from './Icon';
import Logo from './Logo';
import logoSrc from '../assets/LogoMuso.png';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',           icon: 'home'    },
  { id: 'sos',      label: 'SOS Mappa',      icon: 'sos'     },
  { id: 'adopt',    label: 'Adozioni',       icon: 'paw'     },
  { id: 'rifugi',   label: 'Rifugi & Aiuti', icon: 'shelter' },
  { id: 'sitter',   label: 'Pet Sitter',     icon: 'sitter'  },
  { id: 'shop',     label: 'Vetrine',        icon: 'shop'    },
];
const NAV_SECONDARY = [
  { id: 'msg',       label: 'Messaggi',         icon: 'message' },
  { id: 'donations', label: 'Le mie donazioni', icon: 'heart'   },
];

const SHELL_STYLE = `
  /* ── Mobile bottom nav ── */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: var(--c-surface, #fff);
    border-top: 1px solid var(--c-line, #eee);
    z-index: 900;
    padding: 6px 0 max(6px, env(safe-area-inset-bottom));
    gap: 0;
  }
  .mobile-nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: none;
    border: none;
    padding: 6px 4px;
    cursor: pointer;
    color: var(--c-ink-mute, #999);
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    transition: color .15s;
  }
  .mobile-nav-item.active {
    color: var(--c-accent, #ff5c4d);
  }
  .mobile-nav-sos {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    position: relative;
    top: -10px;
  }
  .mobile-nav-sos-circle {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: #FF5C4D;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(255,92,77,.45);
  }
  .mobile-nav-sos-label {
    color: var(--c-ink-mute, #999);
    font-size: 10px;
    font-weight: 600;
    margin-top: 2px;
  }
  .mobile-more-sheet {
    position: fixed;
    inset: 0;
    z-index: 950;
  }
  .mobile-more-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.35);
  }
  .mobile-more-panel {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: var(--c-surface, #fff);
    border-radius: 20px 20px 0 0;
    padding: 12px 20px max(24px, env(safe-area-inset-bottom));
  }
  .mobile-more-handle {
    width: 36px; height: 4px;
    background: var(--c-line, #ddd);
    border-radius: 999px;
    margin: 0 auto 18px;
  }
  .mobile-more-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .mobile-more-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: var(--c-bg, #f9f7f4);
    border: none;
    border-radius: 14px;
    padding: 16px 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: var(--c-ink, #1f1b2e);
  }
  .mobile-more-btn-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .topbar-mobile-logo {
    display: none;
  }
  @media (max-width: 768px) {
    .sidebar              { display: none !important; }
    .main                 { margin-left: 0 !important; }
    .mobile-nav           { display: flex !important; }
    .content              { padding-bottom: 90px !important; }
    .topbar               { padding-left: 16px !important; }
    .topbar-mobile-logo   { display: block !important; height: 30px; width: auto; object-fit: contain; margin-left: auto; }
  }
  @media (min-width: 769px) {
    .mobile-nav { display: none !important; }
  }

  /* ── Landscape mobile: nav compatta ── */
  @media (max-height: 500px) and (orientation: landscape) {
    .mobile-nav {
      display: flex !important;
      padding: 2px env(safe-area-inset-right, 0px) max(2px, env(safe-area-inset-bottom)) env(safe-area-inset-left, 0px);
      height: 52px;
    }
    .mobile-nav-item {
      flex-direction: row;
      gap: 5px;
      font-size: 11px;
      padding: 4px 6px;
    }
    .mobile-nav-item svg, .mobile-nav-item .icn {
      width: 16px !important; height: 16px !important;
    }
    .mobile-nav-sos {
      top: 0;
      flex-direction: row;
      gap: 6px;
    }
    .mobile-nav-sos-circle {
      width: 34px; height: 34px;
    }
    .mobile-nav-sos-label { display: none; }
    .content { padding-bottom: 60px !important; }
    .mobile-footer { margin-bottom: 56px; }
  }
`;

import { useState } from 'react';

export function Sidebar({ active, setActive, onSos }) {
  return (
    <>
      <style>{SHELL_STYLE}</style>
      <aside className="sidebar">
        <Logo />
        <nav className="nav-group" aria-label="primary">
          <div className="nav-label">Naviga</div>
          {NAV_ITEMS.map(n => (
            <a key={n.id} href="#" className="nav-item"
               aria-current={active === n.id ? 'page' : undefined}
               onClick={(e) => { e.preventDefault(); setActive(n.id); }}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <nav className="nav-group" aria-label="secondary">
          <div className="nav-label">Tu</div>
          {NAV_SECONDARY.map(n => (
            <a key={n.id} href="#" className="nav-item"
               aria-current={active === n.id ? 'page' : undefined}
               onClick={(e) => { e.preventDefault(); setActive(n.id); }}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="sos-cta">
          <span className="sos-cta-label">Emergenza</span>
          <div className="sos-cta-title">Hai visto un<br/>animale in difficoltà?</div>
          <button className="sos-cta-btn" onClick={onSos}>
            <Icon name="plus" size={14} /> Segnala in 30s
          </button>
        </div>
      </aside>
    </>
  );
}

const MOBILE_NAV_ITEMS = [
  { id: 'home',   icon: 'home',    label: 'Home'   },
  { id: 'sos',    icon: 'map',     label: 'Mappa'  },
  { id: 'adopt',  icon: 'paw',     label: 'Adotta' },
];

const MORE_ITEMS = [
  { id: 'rifugi',  icon: 'shelter', label: 'Rifugi',   color: '#6DBF8A' },
  { id: 'sitter',  icon: 'sitter',  label: 'Sitter',   color: '#6BAED6' },
  { id: 'shop',    icon: 'shop',    label: 'Vetrine',  color: '#F5C842' },
  { id: 'msg',     icon: 'message', label: 'Messaggi', color: '#C9B8FF' },
  { id: 'join',    icon: 'shield',  label: 'Iscriviti',color: '#FFB59B' },
];

export function MobileNav({ active, setActive, onSos }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="mobile-nav" role="navigation" aria-label="Navigazione mobile">
        {MOBILE_NAV_ITEMS.map(n => (
          <button key={n.id} className={"mobile-nav-item " + (active === n.id ? 'active' : '')}
                  onClick={() => setActive(n.id)}>
            <Icon name={n.icon} size={20}/>
            <span>{n.label}</span>
          </button>
        ))}

        <button className="mobile-nav-sos" onClick={onSos} aria-label="Segnala SOS">
          <div className="mobile-nav-sos-circle">
            <Icon name="sos" size={22}/>
          </div>
          <span className="mobile-nav-sos-label">SOS</span>
        </button>

        <button className={"mobile-nav-item " + (moreOpen ? 'active' : '')}
                onClick={() => setMoreOpen(true)}>
          <Icon name="plus" size={20}/>
          <span>Altro</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="mobile-more-sheet">
          <div className="mobile-more-backdrop" onClick={() => setMoreOpen(false)}/>
          <div className="mobile-more-panel">
            <div className="mobile-more-handle"/>
            <div className="mobile-more-grid">
              {MORE_ITEMS.map(m => (
                <button key={m.id} className="mobile-more-btn"
                        onClick={() => { setActive(m.id); setMoreOpen(false); }}>
                  <div className="mobile-more-btn-icon"
                       style={{ background: m.color + '33', color: m.color }}>
                    <Icon name={m.icon} size={20}/>
                  </div>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CITIES = ['Roma','Milano','Napoli','Torino','Bologna','Firenze','Palermo','Bari','Catania','Venezia'];

function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?';
}

export function Topbar({ onSos, user, onProfile }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [city, setCity] = useState('Roma');
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <header className="topbar">
      <div className={"search " + (searchFocused ? 'search-focused' : '')}
           title="Ricerca in arrivo nella prossima versione">
        <Icon name="search" size={16} />
        <input
          placeholder="Cerca animali, rifugi, pet sitter, città…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          readOnly
          style={{ cursor: 'default' }}
        />
        {searchFocused && (
          <span style={{
            fontSize: 11, color: 'var(--c-ink-mute)',
            whiteSpace: 'nowrap', paddingRight: 8,
          }}>
            Presto disponibile
          </span>
        )}
      </div>
      <div style={{ position:'relative' }}>
        <button className="city-pick" onClick={() => setCityOpen(v => !v)}>
          <span className="dot"></span>
          {city} <Icon name="chevron-down" size={14} />
        </button>
        {cityOpen && (
          <>
            <div style={{ position:'fixed', inset:0, zIndex:99 }} onClick={() => setCityOpen(false)}/>
            <div style={{
              position:'absolute', top:'calc(100% + 8px)', left:0, zIndex:100,
              background:'var(--c-surface)', border:'1.5px solid var(--c-line)',
              borderRadius:14, padding:'6px 0', minWidth:160,
              boxShadow:'0 8px 24px rgba(0,0,0,.12)',
            }}>
              {CITIES.map(c => (
                <button key={c} onClick={() => { setCity(c); setCityOpen(false); }} style={{
                  display:'block', width:'100%', textAlign:'left',
                  padding:'9px 16px', background:'none', border:'none',
                  fontSize:14, fontWeight: c === city ? 600 : 400,
                  color: c === city ? '#D4318A' : 'var(--c-ink)',
                  cursor:'pointer',
                }}>
                  {c === city && '● '}{c}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="spacer"></div>
      <button className="btn btn-sos" onClick={onSos}>
        <Icon name="plus" size={14} /> Segnala SOS
      </button>
      <img src={logoSrc} alt="MUSO" className="topbar-mobile-logo" />
      <button className="icon-btn" aria-label="Notifiche">
        <Icon name="bell" size={16} />
      </button>
      <button className="avatar" aria-label="Profilo utente" onClick={onProfile}>
        {user ? getInitials(user.name) : <Icon name="sitter" size={16} />}
      </button>
    </header>
  );
}
