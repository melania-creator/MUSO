import { useState } from 'react';
import Icon from '../components/Icon';
import MapView from '../components/Map';

// Coordinate default: Roma centro
const DEFAULT_CENTER = [41.9028, 12.4964];
const DEFAULT_ZOOM   = 13;

// Mappa filtro UI → campo del report
const FILTER_MATCH = {
  tutti:    () => true,
  critica:  r => r.urgency === 'critica',
  alta:     r => r.urgency === 'alta',
  smarriti: r => r.situation === 'smarrito',
  salvati:  r => r.resolved === true,
};

export default function ScreenSOS({ onSos, openDetail, sosReports = [] }) {
  const [filter, setFilter] = useState('tutti');

  const matchFn = FILTER_MATCH[filter] ?? FILTER_MATCH.tutti;
  const filtered = sosReports.filter(matchFn);

  const filteredPins = filtered.map(r => ({
    lat:   parseFloat(r.lat),
    lng:   parseFloat(r.lng),
    type:  r.urgency === 'critica' ? 'sos' : r.situation === 'smarrito' ? 'warn' : 'sos',
    label: r.label,
    meta:  r.meta,
  }));

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
              <span style={{ width:8, height:8, borderRadius:'50%', background: sosReports.length ? '#FF5C4D' : '#34C759' }}></span>
              <span>
                {sosReports.length
                  ? <><b style={{ color:'var(--c-sos)' }}>{sosReports.length}</b> SOS attivi</>
                  : 'Nessun SOS attivo'}
              </span>
            </div>
            <div className="map-card"><Icon name="compass" size={14}/> Roma · Centro</div>
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

          {filtered.length === 0 ? (
            <div style={{ padding:'32px 16px', textAlign:'center', color:'var(--c-ink-mute)' }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🟢</div>
              <div style={{ fontWeight:600, marginBottom:6 }}>
                {sosReports.length === 0 ? 'Tutto tranquillo' : 'Nessun risultato per questo filtro'}
              </div>
              <div style={{ fontSize:13 }}>
                {sosReports.length === 0
                  ? 'Nessuna segnalazione attiva al momento. Sii il primo a segnalare.'
                  : `Hai ${sosReports.length} SOS, ma nessuno corrisponde al filtro selezionato.`}
              </div>
              <button className="btn btn-sos" style={{ marginTop:16, width:'100%', justifyContent:'center' }} onClick={onSos}>
                <Icon name="plus" size={14}/> Segnala ora
              </button>
            </div>
          ) : (
            <>
              <div className="feed">
                {filtered.map((r) => (
                  <div key={r.id} className="feed-item"
                       onClick={() => openDetail && openDetail({ type:'sos', id:r.id, data:r })}
                       style={{ cursor:'pointer' }}>
                    <div className="thumb t-sos" style={{ fontSize:22 }}>🐾</div>
                    <div className="body">
                      <div className="body-top">
                        <span className="tag tag-sos">{r.urgency}</span>
                        <span className="tag tag-mute">{r.situation}</span>
                      </div>
                      <div style={{ fontWeight:600, fontSize:13.5, marginBottom:3, lineHeight:1.3 }}>{r.label}</div>
                      <div className="meta">{r.time} · {r.lat ? `${r.lat}°N` : 'posizione non disponibile'}</div>
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
