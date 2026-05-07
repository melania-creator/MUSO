import Icon from './Icon';
import Logo from './Logo';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',           icon: 'home' },
  { id: 'sos',      label: 'SOS Mappa',      icon: 'sos',     badge: '3' },
  { id: 'adopt',    label: 'Adozioni',        icon: 'paw' },
  { id: 'rifugi',   label: 'Rifugi & Aiuti',  icon: 'shelter' },
  { id: 'sitter',   label: 'Pet Sitter',      icon: 'sitter' },
  { id: 'shop',     label: 'Vetrine',         icon: 'shop' },
];
const NAV_SECONDARY = [
  { id: 'msg',       label: 'Messaggi',         icon: 'message', badge: '2', badgeNeutral: true },
  { id: 'donations', label: 'Le mie donazioni', icon: 'heart' },
];

export function Sidebar({ active, setActive, onSos }) {
  return (
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
            {n.badge && <span className="badge">{n.badge}</span>}
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
            {n.badge && <span className={"badge" + (n.badgeNeutral ? " neutral" : "")}>{n.badge}</span>}
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
  );
}

export function Topbar({ onSos }) {
  return (
    <header className="topbar">
      <div className="search">
        <Icon name="search" size={16} />
        <input placeholder="Cerca animali, rifugi, pet sitter, città…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="city-pick">
        <span className="dot"></span>
        Milano <Icon name="chevron-down" size={14} />
      </div>
      <div className="spacer"></div>
      <button className="btn btn-sos" onClick={onSos}>
        <Icon name="plus" size={14} /> Segnala SOS
      </button>
      <button className="icon-btn" aria-label="Notifications">
        <Icon name="bell" size={16} />
        <span className="pulse"></span>
      </button>
      <button className="avatar" aria-label="Profile">GM</button>
    </header>
  );
}
