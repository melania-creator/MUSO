import { useState } from 'react';
import Icon from '../components/Icon';
import MapView from '../components/Map';
import Toast, { useToast } from '../components/Toast';

const DEFAULT_CENTER = [41.9028, 12.4964];
const DEFAULT_ZOOM   = 13;

const FILTER_MATCH = {
  tutti:    () => true,
  critica:  r => r.urgency === 'critica',
  alta:     r => r.urgency === 'alta',
  smarriti: r => r.situation === 'smarrito',
  salvati:  r => r.resolved === true,
};

const SPECIES_OPTS = ['Tutte', 'Cane', 'Gatto', 'Altro'];
const DIST_OPTS    = ['2 km', '5 km', '10 km', 'Tutti'];

function HowItWorksModal({ onClose }) {
  return (
    <div className="legal-overlay" onClick={onClose}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-head">
          <h3>Come funziona MUSO SOS</h3>
          <button className="btn btn-ghost" style={{ padding:'4px 8px' }} onClick={onClose}><Icon name="close" size={16}/></button>
        </div>
        <div className="legal-modal-body">
          <h4>1. Segnala</h4>
          <p>Tocca "Nuova segnalazione" e descrivi la situazione. Aggiungi una foto se puoi — aiuta gli altri a riconoscere l'animale.</p>
          <h4>2. La rete si attiva</h4>
          <p>Gli utenti nel raggio di 2 km ricevono una notifica immediata. Più persone possono "prendere in carico" e coordinare i soccorsi via chat SOS.</p>
          <h4>3. Rifugi e volontari</h4>
          <p>I rifugi verificati vicini vengono allertati automaticamente e possono rispondere direttamente dalla loro dashboard.</p>
          <h4>4. Risolto</h4>
          <p>Quando l'animale è al sicuro, chiunque abbia preso in carico può contrassegnare la segnalazione come "Risolto". Il caso rimane in archivio per 30 giorni.</p>
          <h4>Numeri utili</h4>
          <p>Guardie Zoofile: <b>800 123 456</b> · ENPA nazionale: <b>06 4461206</b> · Emergenze vet: <b>112</b></p>
        </div>
        <div className="legal-modal-foot">
          <button className="btn btn-primary" onClick={onClose}>Capito!</button>
        </div>
      </div>
    </div>
  );
}

export default function ScreenSOS({ onSos, openDetail, sosReports = [] }) {
  const [filter,   setFilter]   = useState('tutti');
  const [species,  setSpecies]  = useState('Tutte');
  const [dist,     setDist]     = useState('2 km');
  const [lastHour, setLastHour] = useState(false);
  const [howOpen,  setHowOpen]  = useState(false);
  const [toastMsg, showToast]   = useToast();

  const matchFn = FILTER_MATCH[filter] ?? FILTER_MATCH.tutti;
  const filtered = sosReports.filter(r =>
    matchFn(r) &&
    (species === 'Tutte' || r.species === species) &&
    (!lastHour || r.recentHour)
  );

  const filteredPins = filtered.map(r => ({
    lat:   parseFloat(r.lat),
    lng:   parseFloat(r.lng),
    type:  r.urgency === 'critica' ? 'sos' : r.situation === 'smarrito' ? 'warn' : 'sos',
    label: r.label,
    meta:  r.meta,
  }));

  const handleNotify = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        showToast(perm === 'granted'
          ? '🔔 Riceverai notifiche per SOS nella tua zona!'
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
          <h1>Mappa <em>SOS</em> in tempo reale.<br/>Ogni pin è un animale che aspetta.</h1>
          <div className="sub">Le segnalazioni attive appaiono sulla mappa non appena vengono inviate.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => showToast('Usa i chip qui sotto per filtrare le segnalazioni')}>
            <Icon name="filter" size={14}/> Filtri
          </button>
          <button className="btn btn-sos" onClick={onSos}><Icon name="plus" size={14}/> Nuova segnalazione</button>
        </div>
      </div>

      <div className="filter-bar">
        {['tutti','critica','alta','smarriti','salvati'].map(k => (
          <button key={k} className={'chip ' + (filter === k ? 'active' : '')} onClick={() => setFilter(k)}>
            {k === 'tutti'   && <Icon name="paw" size={12}/>}
            {k === 'critica' && <span style={{ width:6, height:6, borderRadius:'50%', background:'#FF5C4D', display:'inline-block' }}></span>}
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
        <span className="filter-divider"></span>
        <button className={'chip ' + (species !== 'Tutte' ? 'active' : '')}
          onClick={() => setSpecies(s => { const i = SPECIES_OPTS.indexOf(s); return SPECIES_OPTS[(i+1) % SPECIES_OPTS.length]; })}>
          <Icon name="paw" size={12}/> {species}
        </button>
        <button className={'chip ' + (lastHour ? 'active' : '')} onClick={() => setLastHour(v => !v)}>
          <Icon name="clock" size={12}/> Ultima ora
        </button>
        <button className={'chip ' + (dist !== '2 km' ? 'active' : '')}
          onClick={() => setDist(d => { const i = DIST_OPTS.indexOf(d); return DIST_OPTS[(i+1) % DIST_OPTS.length]; })}>
          <Icon name="pin" size={12}/> {dist}
        </button>
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
              <button title="Zoom in"  onClick={() => showToast('Usa i gesti del dispositivo per zomare la mappa')}><Icon name="plus-thin" size={14}/></button>
              <button title="Zoom out" onClick={() => showToast('Usa i gesti del dispositivo per zomare la mappa')}><Icon name="minus"     size={14}/></button>
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
              <button className="btn" style={{ marginTop:12, width:'100%', justifyContent:'center' }}
                onClick={() => showToast('Mostro tutte le ' + sosReports.length + ' segnalazioni')}>
                Vedi tutte le segnalazioni <Icon name="arrow-right" size={14}/>
              </button>
            </>
          )}
        </aside>
      </div>

      <div className="hero-band">
        <div>
          <p>Attiva le notifiche per gli SOS nella tua zona. Ti avviseremo non appena un animale ha bisogno di aiuto vicino a te.</p>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={handleNotify}>Attiva notifiche zona</button>
          <button className="btn" onClick={() => setHowOpen(true)}>Come funziona</button>
        </div>
      </div>

      {howOpen && <HowItWorksModal onClose={() => setHowOpen(false)}/>}
      <Toast msg={toastMsg}/>
    </>
  );
}
