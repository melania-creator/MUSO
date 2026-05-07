import { useState } from 'react';
import Icon from '../components/Icon';

const PINS = [
  { id: 1, x: 32, y: 28, type: 'sos',     label: 'Cane ferito',         icon: '🐕', who: 'P.zza Vetra' },
  { id: 2, x: 58, y: 38, type: 'sos',     label: 'Gatto bloccato',       icon: '🐈', who: 'Via Solferino 22' },
  { id: 3, x: 72, y: 60, type: 'warn',    label: 'Cucciolo smarrito',    icon: '🐶', who: 'Parco Sempione' },
  { id: 4, x: 22, y: 64, type: 'success', label: 'Salvato — gattino',    icon: '✓',  who: '12 min fa' },
  { id: 5, x: 46, y: 72, type: 'success', label: 'In cura',              icon: '✓',  who: 'ENPA Milano' },
  { id: 6, x: 80, y: 26, type: 'warn',    label: 'Cane senza collare',   icon: '🐕', who: 'Via Padova' },
  { id: 7, x: 50, y: 50, type: 'user',    label: 'Tu sei qui',           icon: '·',  who: 'Brera' },
];

const FEED = [
  { tone:'t-peach', emoji:'🐕', tag:'tag-sos',   tagLabel:'SOS',      urgency:'critica', title:'Cane di taglia media, ferito a una zampa', meta:'P.zza Vetra · 4 min fa · 2 testimoni' },
  { tone:'t-mint',  emoji:'🐈', tag:'tag-sos',   tagLabel:'SOS',      urgency:'alta',    title:'Gatto nero bloccato su un albero',         meta:'Via Solferino · 11 min fa · ENPA in arrivo' },
  { tone:'t-butter',emoji:'🐶', tag:'tag-butter',tagLabel:'Smarrito',               title:'Cucciolo, beagle, collare azzurro',         meta:'Parco Sempione · 27 min fa' },
  { tone:'t-sky',   emoji:'🐰', tag:'tag-mint',  tagLabel:'Salvato',                title:'Coniglietto consegnato al rifugio Lentate', meta:'Via Pacini · 1h fa · da Marta L.' },
  { tone:'t-rose',  emoji:'🐦', tag:'tag-butter',tagLabel:'Smarrito',               title:'Pappagallino verde, fischia "Vai!"',        meta:'C.so Buenos Aires · 2h fa' },
  { tone:'t-lav',   emoji:'🐢', tag:'tag-mint',  tagLabel:'Salvato',                title:'Tartaruga affidata a Lega del Cane',        meta:'Naviglio Grande · 3h fa' },
];

function MapStreets() {
  return (
    <svg className="map-streets" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g stroke="#1F1B2E" strokeOpacity="0.07" fill="none" strokeWidth="0.4">
        <path d="M0 30 L100 35" /><path d="M0 55 L100 50" /><path d="M0 78 L100 80" />
        <path d="M0 18 Q40 22 100 14" /><path d="M0 88 Q50 92 100 86" />
      </g>
      <g stroke="#1F1B2E" strokeOpacity="0.05" fill="none" strokeWidth="0.3">
        <path d="M22 0 L20 100" /><path d="M48 0 L52 100" /><path d="M78 0 L74 100" />
      </g>
      <g fill="#B8E5D2" opacity="0.5"><ellipse cx="36" cy="56" rx="9" ry="6" /><ellipse cx="76" cy="78" rx="6" ry="4" /></g>
      <g fill="#B8D8FF" opacity="0.55"><path d="M0 90 Q20 86 50 92 T100 96 L100 100 L0 100 Z" /></g>
    </svg>
  );
}

export default function ScreenSOS({ onSos }) {
  const [filter, setFilter] = useState('tutti');
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tre <em>SOS</em> attivi a 2 km da te.<br/>Dai una mano in 30&nbsp;secondi.</h1>
          <div className="sub">Mappa live delle segnalazioni in tempo reale. Ogni pin è un animale che aspetta.</div>
        </div>
        <div className="ph-actions">
          <button className="btn"><Icon name="filter" size={14}/> Filtri</button>
          <button className="btn btn-sos" onClick={onSos}><Icon name="plus" size={14}/> Nuova segnalazione</button>
        </div>
      </div>

      <div className="filter-bar">
        {['tutti','critica','alta','smarriti','salvati'].map(k => (
          <button key={k} className={"chip " + (filter === k ? 'active' : '')} onClick={() => setFilter(k)}>
            {k === 'tutti' && <Icon name="paw" size={12} />}
            {k === 'critica' && <span style={{width:6,height:6,borderRadius:'50%',background:'#FF5C4D'}}></span>}
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
        <span className="filter-divider"></span>
        <button className="chip"><Icon name="paw" size={12} /> Specie</button>
        <button className="chip"><Icon name="clock" size={12} /> Ultima ora</button>
        <button className="chip"><Icon name="pin" size={12} /> 2 km</button>
      </div>

      <div className="sos-layout">
        <div className="map-wrap">
          <div className="map-bg"></div>
          <MapStreets />
          {PINS.map(p => (
            <div key={p.id} className={"map-pin " + p.type} style={{ left: p.x + '%', top: p.y + '%' }}>
              <div className="pin-body"><span className="pin-dot">{p.icon}</span><span>{p.label}</span></div>
            </div>
          ))}
          <div className="map-overlay-tl">
            <div className="map-card">
              <span style={{width:8,height:8,borderRadius:'50%',background:'#FF5C4D'}}></span>
              <span><b style={{color:'var(--c-sos)'}}>3</b> SOS attivi · <b>2</b> in zona</span>
            </div>
            <div className="map-card"><Icon name="compass" size={14} /> Milano · Brera</div>
          </div>
          <div className="map-overlay-tr">
            <div className="map-zoom">
              <button><Icon name="plus-thin" size={14} /></button>
              <button><Icon name="minus" size={14} /></button>
            </div>
            <div className="map-zoom" style={{marginTop:6}}>
              <button><Icon name="crosshair" size={14} /></button>
            </div>
          </div>
          <div className="map-stat-strip">
            <div className="map-stat"><span className="v">142</span><span className="l">salvati questo mese</span></div>
            <div className="map-stat"><span className="v">8 min</span><span className="l">tempo medio risposta</span></div>
            <div className="map-stat"><span className="v">2.4k</span><span className="l">soccorritori attivi</span></div>
          </div>
        </div>
        <aside>
          <div className="feed-head"><h3>Feed in <em>diretta</em></h3><span className="live">LIVE</span></div>
          <div className="feed">
            {FEED.map((f, i) => (
              <div key={i} className="feed-item">
                <div className={"thumb " + f.tone}>{f.emoji}</div>
                <div className="body">
                  <div className="body-top">
                    <span className={"tag " + f.tag}>{f.tagLabel}</span>
                    {f.urgency && <span className="tag tag-mute">priorità {f.urgency}</span>}
                  </div>
                  <div style={{fontWeight:600,fontSize:13.5,marginBottom:3,lineHeight:1.3}}>{f.title}</div>
                  <div className="meta">{f.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" style={{marginTop:12,width:'100%',justifyContent:'center'}}>
            Vedi tutte le segnalazioni <Icon name="arrow-right" size={14}/>
          </button>
        </aside>
      </div>

      <div className="hero-band">
        <div>
          <h2>Ogni segnalazione è una vita.<br/><em>Sii il primo a vedere.</em></h2>
          <p>Attiva le notifiche per gli SOS nella tua zona. Ti avviseremo entro 30 secondi quando un animale ha bisogno di aiuto vicino a te.</p>
          <div className="num-strip">
            <div className="num-stat"><div className="v">8.2k</div><div className="l">animali salvati</div></div>
            <div className="num-stat"><div className="v">312</div><div className="l">rifugi connessi</div></div>
            <div className="num-stat"><div className="v">94%</div><div className="l">SOS risolti</div></div>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary">Attiva notifiche zona</button>
          <button className="btn">Come funziona</button>
        </div>
      </div>
    </>
  );
}
