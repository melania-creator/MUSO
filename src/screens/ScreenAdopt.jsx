import { useState } from 'react';
import Icon from '../components/Icon';

export default function ScreenAdopt({ openDetail }) {
  const [filter, setFilter] = useState('Tutti');

  // In futuro: pets arriveranno dal backend (es. fetch('/api/animals?status=available'))
  const pets = [];
  const visible = filter === 'Tutti' ? pets : pets.filter(p => p.species === filter);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Adotta. <em>Cambia una vita.</em><br/>Anche la tua.</h1>
          <div className="sub">Gli animali dei rifugi verificati appariranno qui non appena si registrano.</div>
        </div>
        <div className="ph-actions">
          <button className="btn"><Icon name="filter" size={14}/> Filtri avanzati</button>
          <button className="btn btn-primary"><Icon name="heart" size={14}/> I tuoi preferiti</button>
        </div>
      </div>

      <div className="filter-bar">
        {['Tutti','Cane','Gatto','Conigli','Altri'].map(s => (
          <button key={s} className={"chip " + (filter === s ? 'active' : '')} onClick={() => setFilter(s)}>{s}</button>
        ))}
        <span className="filter-divider"></span>
        <button className="chip">Taglia: tutte</button>
        <button className="chip">Età: qualsiasi</button>
        <button className="chip"><Icon name="pin" size={12}/> Tutta Italia</button>
        <span className="filter-divider"></span>
        <button className="chip"><Icon name="check" size={12}/> Solo urgenti</button>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state" style={{ marginTop:40 }}>
          <div className="es-emoji">🐾</div>
          <h3>Nessun animale disponibile al momento</h3>
          <p>I rifugi partner stanno completando la registrazione.<br/>Torna presto — questa pagina si riempirà di storie che aspettano una casa.</p>
          <button className="btn btn-primary" onClick={() => {}}>
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
    </>
  );
}
