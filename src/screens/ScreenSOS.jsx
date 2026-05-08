import { useState } from 'react';
import Icon from '../components/Icon';
import MapView from '../components/Map';

// Coordinate default: Milano centro
const DEFAULT_CENTER = [45.4642, 9.1900];
const DEFAULT_ZOOM   = 13;

export default function ScreenSOS({ onSos, openDetail }) {
  const [filter, setFilter] = useState('tutti');

  // In futuro: pins arriveranno dal backend (es. fetch('/api/sos/active'))
  const pins = [];
  const feed = [];

  const filteredPins = filter === 'tutti'
    ? pins
    : pins.filter(p => p.urgency === filter || p.type === filter);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Mappa <em>SOS</em> in tempo reale.<br/>Ogni pin è un animale che aspetta.</h1>
          <div className="sub">Le segnalazioni attive appaiono sulla mappa non appena vengono inviate.</div>
        </div>
        <div className="ph-actions">
          <button className="btn"><Icon name="filter" size={14}/> Filtri</button>
          <button className="btn btn-sos" onClick={onSos}><Icon name="plus" size={14}/> Nuova segnalazione</button>
        </div>
      </div>

      <div className="filter-bar">
        {['tutti','critica','alta','smarriti','salvati'].map(k => (
          <button key={k} className={"chip " + (filter === k ? 'active' : '')} onClick={() => setFilter(k)}>
            {k === 'tutti'   && <Icon name="paw" size={12}/>}
            {k === 'critica' && <span style={{ width:6, height:6, borderRadius:'50%', background:'#FF5C4D' }}></span>}
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
        <span className="filter-divider"></span>
        <button className="chip"><Icon name="paw" size={12}/> Specie</button>
        <button className="chip"><Icon name="clock" size={12}/> Ultima ora</button>
        <button className="chip"><Icon name="pin" size={12}/> 2 km</button>
      </div>

      <div className="sos-layout">
        <div className="map-wrap" style={{ position:'relative', borderRadius:16, overflow:'hidden' }}>
          <MapView
            pins={filteredPins}
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{ borderRadius:16 }}
          />
          <div className="map-overlay-tl">
            <div className="map-card">
              <span style={{ width:8, height:8, borderRadius:'50%', background: pins.length ? '#FF5C4D' : '#34C759' }}></span>
              <span>
                {pins.length
                  ? <><b style={{ color:'var(--c-sos)' }}>{pins.length}</b> SOS attivi</>
                  : 'Nessun SOS attivo'}
              </span>
            </div>
            <div className="map-card"><Icon name="compass" size={14}/> Milano · Brera</div>
          </div>
          <div className="map-overlay-tr">
            <div className="map-zoom">
              <button title="Zoom in"  onClick={() => {}}><Icon name="plus-thin" size={14}/></button>
              <button title="Zoom out" onClick={() => {}}><Icon name="minus"     size={14}/></button>
            </div>
          </div>
        </div>

        <aside>
          <div className="feed-head">
            <h3>Feed in <em>diretta</em></h3>
            <span className="live">LIVE</span>
          </div>

          {feed.length === 0 ? (
            <div style={{ padding:'32px 16px', textAlign:'center', color:'var(--c-ink-mute)' }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🟢</div>
              <div style={{ fontWeight:600, marginBottom:6 }}>Tutto tranquillo</div>
              <div style={{ fontSize:13 }}>Nessuna segnalazione attiva al momento.<br/>Sii il primo a segnalare se vedi un animale in difficoltà.</div>
              <button className="btn btn-sos" style={{ marginTop:16, width:'100%', justifyContent:'center' }} onClick={onSos}>
                <Icon name="plus" size={14}/> Segnala ora
              </button>
            </div>
          ) : (
            <>
              <div className="feed">
                {feed.map((f, i) => (
                  <div key={i} className="feed-item"
                       onClick={() => openDetail && openDetail({ type:'sos', id:f.id, data:f })}
                       style={{ cursor:'pointer' }}>
                    <div className={"thumb " + f.tone}>{f.emoji}</div>
                    <div className="body">
                      <div className="body-top">
                        <span className={"tag " + f.tag}>{f.tagLabel}</span>
                        {f.urgency && <span className="tag tag-mute">priorità {f.urgency}</span>}
                      </div>
                      <div style={{ fontWeight:600, fontSize:13.5, marginBottom:3, lineHeight:1.3 }}>{f.title}</div>
                      <div className="meta">{f.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn" style={{ marginTop:12, width:'100%', justifyContent:'center' }}>
                Vedi tutte le segnalazioni <Icon name="arrow-right" size={14}/>
              </button>
            </>
          )}
        </aside>
      </div>

      <div className="hero-band">
        <div>
          <h2>Ogni segnalazione è una vita.<br/><em>Sii il primo a vedere.</em></h2>
          <p>Attiva le notifiche per gli SOS nella tua zona. Ti avviseremo non appena un animale ha bisogno di aiuto vicino a te.</p>
        </div>
        <div className="actions">
          <button className="btn btn-primary">Attiva notifiche zona</button>
          <button className="btn">Come funziona</button>
        </div>
      </div>
    </>
  );
}
