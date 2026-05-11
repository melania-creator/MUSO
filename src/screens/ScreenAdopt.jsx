import { useState } from 'react';
import Icon from '../components/Icon';
import Toast, { useToast } from '../components/Toast';

const SIZES  = ['Tutte', 'Piccola', 'Media', 'Grande'];
const AGES   = ['Qualsiasi', 'Cucciolo', 'Adulto', 'Anziano'];

export default function ScreenAdopt({ openDetail }) {
  const [species,   setSpecies]   = useState('Tutti');
  const [size,      setSize]      = useState('Tutte');
  const [age,       setAge]       = useState('Qualsiasi');
  const [urgent,    setUrgent]    = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [toastMsg,  showToast]    = useToast();

  const pets = [];
  const visible = pets.filter(p =>
    (species === 'Tutti'    || p.species === species) &&
    (size    === 'Tutte'    || p.size    === size) &&
    (age     === 'Qualsiasi'|| p.age     === age) &&
    (!urgent || p.urgent)
  );

  const handleNotify = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        showToast(perm === 'granted'
          ? '🔔 Ti avviseremo non appena arrivano nuovi animali!'
          : '🔕 Abilita le notifiche nelle impostazioni del browser.');
      });
    } else {
      showToast('🔔 Notifiche non supportate su questo dispositivo.');
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Adotta. <em>Cambia una vita.</em><br/>Anche la tua.</h1>
          <div className="sub">Gli animali dei rifugi verificati appariranno qui non appena si registrano.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => setShowPanel(v => !v)}>
            <Icon name="filter" size={14}/> Filtri avanzati {showPanel ? '▲' : '▼'}
          </button>
          <button className="btn btn-primary" onClick={() => { setFavorites(v => !v); showToast(favorites ? 'Mostro tutti gli animali' : '❤️ Mostro solo i tuoi preferiti'); }}>
            <Icon name="heart" size={14}/> {favorites ? 'Tutti gli animali' : 'I tuoi preferiti'}
          </button>
        </div>
      </div>

      {showPanel && (
        <div className="card" style={{ padding:16, marginBottom:4 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:6, color:'var(--c-ink-soft)' }}>TAGLIA</div>
              <div style={{ display:'flex', gap:6 }}>
                {SIZES.map(s => (
                  <button key={s} className={'chip ' + (size === s ? 'active' : '')} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:6, color:'var(--c-ink-soft)' }}>ETÀ</div>
              <div style={{ display:'flex', gap:6 }}>
                {AGES.map(a => (
                  <button key={a} className={'chip ' + (age === a ? 'active' : '')} onClick={() => setAge(a)}>{a}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="filter-bar">
        {['Tutti','Cane','Gatto','Conigli','Altri'].map(s => (
          <button key={s} className={'chip ' + (species === s ? 'active' : '')} onClick={() => setSpecies(s)}>{s}</button>
        ))}
        <span className="filter-divider"></span>
        <button className={'chip ' + (size !== 'Tutte' ? 'active' : '')} onClick={() => setSize(s => { const i = SIZES.indexOf(s); return SIZES[(i+1) % SIZES.length]; })}>
          Taglia: {size}
        </button>
        <button className={'chip ' + (age !== 'Qualsiasi' ? 'active' : '')} onClick={() => setAge(a => { const i = AGES.indexOf(a); return AGES[(i+1) % AGES.length]; })}>
          Età: {age}
        </button>
        <button className="chip" onClick={() => showToast('📍 Mostrando animali da tutta Italia')}>
          <Icon name="pin" size={12}/> Tutta Italia
        </button>
        <span className="filter-divider"></span>
        <button className={'chip ' + (urgent ? 'active' : '')} onClick={() => setUrgent(v => !v)}>
          <Icon name="check" size={12}/> Solo urgenti
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state" style={{ marginTop:40 }}>
          <div className="es-emoji">🐾</div>
          <h3>Nessun animale disponibile al momento</h3>
          <p>I rifugi partner stanno completando la registrazione.<br/>Torna presto — questa pagina si riempirà di storie che aspettano una casa.</p>
          <button className="btn btn-primary" onClick={handleNotify}>
            <Icon name="bell" size={14}/> Avvisami quando arrivano nuovi animali
          </button>
        </div>
      ) : (
        <div className="grid-4">
          {visible.map((p, i) => (
            <div key={i} className="pet-card"
                 onClick={() => openDetail && openDetail({ type:'adopt', id:p.name, data:p })}>
              <div className={"pet-photo " + p.bg}>
                <div className="face">{p.emoji}</div>
                <div className="ph-tags">
                  {p.tags?.[0] && <span className="tag tag-mint">{p.tags[0]}</span>}
                  <button className="heart" onClick={e => e.stopPropagation()}><Icon name="heart" size={14}/></button>
                </div>
              </div>
              <div className="pet-body">
                <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
                  <span className="pet-name">{p.name}</span>
                  <span style={{ fontSize:12, color:'var(--c-ink-mute)' }}>{p.gender}</span>
                </div>
                <div className="pet-meta">
                  <span>{p.breed}</span><span className="dot"></span>
                  <span>{p.age}</span><span className="dot"></span>
                  <span>{p.size}</span>
                </div>
                <div className="pet-shelter"><Icon name="shelter" size={12}/> da <b>{p.shelter}</b> · {p.city}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Toast msg={toastMsg}/>
    </>
  );
}
