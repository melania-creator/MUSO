import { useState } from 'react';
import Icon from '../components/Icon';
import { SITTERS, SITTER_BADGES, SERVICE_OPTS, SIZE_OPTS } from '../constants';

const SKILL_OPTS = [
  'Pet first aid','Somministrazione farmaci orali','Iniezioni insulina','Veterinaria',
  'Gestione cuccioli','Pet anziani','Cat behaviour','Patologie croniche','Dieta speciale'
];

export default function ScreenSitter({ goJoin, openDetail }) {
  const [services, setServices] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [maxRate, setMaxRate] = useState(30);
  const [minRating, setMinRating] = useState(0);
  const [verified, setVerified] = useState(false);
  const [hasGarden, setHasGarden] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visible = SITTERS.filter(s => {
    if (services.length && !services.some(x => s.services.includes(x))) return false;
    if (sizes.length    && !sizes.some(x => s.sizes.includes(x)))       return false;
    if (skills.length   && !skills.every(x => s.skills.some(sk => sk.toLowerCase().includes(x.toLowerCase())))) return false;
    if (s.rate > maxRate) return false;
    if (s.rating < minRating) return false;
    if (verified && !s.badges.includes('verified')) return false;
    if (hasGarden && !s.hasGarden) return false;
    return true;
  });

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const reset = () => { setServices([]); setSizes([]); setSkills([]); setMaxRate(30); setMinRating(0); setVerified(false); setHasGarden(false); };
  const active = services.length + sizes.length + skills.length + (verified?1:0) + (hasGarden?1:0) + (maxRate<30?1:0) + (minRating>0?1:0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Pet sitter <em>verificati,</em><br/>scelti su misura per il tuo animale.</h1>
          <div className="sub">Tutti i profili validati manualmente: documenti, certificati e referenze.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => goJoin && goJoin('sitter')}>Diventa sitter <Icon name="arrow-up-right" size={14}/></button>
          <button className="btn btn-primary"><Icon name="filter" size={14}/> Filtri ({active})</button>
        </div>
      </div>

      <div className="sitter-layout">
        <aside className="sitter-filters">
          <div className="card" style={{padding:18}}>
            <div className="filt-head">
              <div className="card-h" style={{margin:0}}>Filtra</div>
              {active > 0 && <button className="link" onClick={reset}>Azzera ({active})</button>}
            </div>
            <div className="filt-block">
              <div className="filt-label">Servizio</div>
              <div className="filt-stack">
                {SERVICE_OPTS.map(o => (
                  <label key={o.v} className="filt-row">
                    <input type="checkbox" checked={services.includes(o.v)} onChange={() => toggle(services, setServices, o.v)}/>
                    <span>{o.i} {o.l}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="filt-block">
              <div className="filt-label">Taglia animale</div>
              <div className="chip-row">
                {SIZE_OPTS.map(o => (
                  <button key={o.v} className={"chip " + (sizes.includes(o.v) ? 'active' : '')} onClick={() => toggle(sizes, setSizes, o.v)}>{o.l}</button>
                ))}
              </div>
            </div>
            <div className="filt-block">
              <div className="filt-label">Tariffa max <b>€{maxRate}</b>/notte</div>
              <input type="range" min="10" max="30" step="1" value={maxRate} onChange={e => setMaxRate(+e.target.value)} className="slider"/>
              <div className="slider-ticks"><span>€10</span><span>€30</span></div>
            </div>
            <div className="filt-block">
              <div className="filt-label">Rating minimo</div>
              <div className="chip-row">
                {[0, 4.0, 4.5, 4.8].map(r => (
                  <button key={r} className={"chip " + (minRating === r ? 'active' : '')} onClick={() => setMinRating(r)}>
                    {r === 0 ? 'Tutti' : <><Icon name="star" size={11}/> {r}+</>}
                  </button>
                ))}
              </div>
            </div>
            <div className="filt-block">
              <div className="filt-label">Competenze veterinarie</div>
              <div className="filt-stack" style={{maxHeight: showAll ? 'none' : 168, overflow:'hidden'}}>
                {SKILL_OPTS.map(s => (
                  <label key={s} className="filt-row">
                    <input type="checkbox" checked={skills.includes(s)} onChange={() => toggle(skills, setSkills, s)}/>
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              <button className="link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Mostra meno' : 'Mostra tutte (9)'}</button>
            </div>
            <div className="filt-block">
              <label className="filt-row">
                <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)}/>
                <span>🛡️ Solo verificati MUSO</span>
              </label>
              <label className="filt-row">
                <input type="checkbox" checked={hasGarden} onChange={e => setHasGarden(e.target.checked)}/>
                <span>🌳 Con giardino</span>
              </label>
            </div>
          </div>
        </aside>

        <div className="sitter-results">
          <div className="results-head">
            <div><b>{visible.length}</b> sitter disponibili</div>
            <select className="sort">
              <option>Più rilevanti</option>
              <option>Prezzo crescente</option>
              <option>Rating</option>
              <option>Risposta più veloce</option>
            </select>
          </div>
          <div className="grid-2">
            {visible.map((s, i) => (
              <div key={i} className="sitter-card-rich" onClick={() => openDetail && openDetail({type:'sitter', id:s.name, data:s})}>
                <div className="src-top">
                  <div className={"sitter-av " + s.tone} style={{width:64,height:64,fontSize:30,borderRadius:16}}>{s.av}</div>
                  <div className="src-head">
                    <div className="src-name-row">
                      <h5>{s.name}</h5>
                      <div className="sitter-rating"><Icon name="star" size={12}/> {s.rating}</div>
                    </div>
                    <div className="meta"><Icon name="pin" size={11}/> {s.city} · {s.zone}</div>
                    <div className="src-stats">
                      <span><b>{s.jobs}</b> servizi</span>
                      <span className="dot"></span>
                      <span>Risp. {s.response}</span>
                      <span className="dot"></span>
                      <span>{s.exp} anni esp.</span>
                    </div>
                  </div>
                </div>
                <div className="src-badges">
                  {s.badges.slice(0, 4).map(b => {
                    const bd = SITTER_BADGES[b]; if (!bd) return null;
                    return <span key={b} className={"badge-pill " + bd.cls} title={bd.l}>{bd.i} {bd.l}</span>;
                  })}
                </div>
                <p className="src-bio">{s.bio}</p>
                <div className="src-services">
                  {s.services.map(sv => {
                    const o = SERVICE_OPTS.find(x => x.v === sv);
                    return <span key={sv} className="src-svc">{o.i} {o.l}</span>;
                  })}
                </div>
                {s.cert.length > 0 && (
                  <div className="src-cert"><Icon name="shield" size={12}/> <span>{s.cert.join(' · ')}</span></div>
                )}
                <div className="src-foot">
                  <div className="src-skills-mini">
                    {s.skills.slice(0,2).map(k => <span key={k} className="tag tag-mute">{k}</span>)}
                    {s.skills.length > 2 && <span className="tag tag-mute">+{s.skills.length - 2}</span>}
                  </div>
                  <div>
                    <span style={{fontFamily:'var(--font-display)',fontSize:22}}>€{s.rate}</span>
                    <small style={{color:'var(--c-ink-mute)',fontSize:11}}> / notte</small>
                  </div>
                </div>
                <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:12}}
                        onClick={(e) => { e.stopPropagation(); openDetail && openDetail({type:'sitter', id:s.name, data:s}); }}>
                  Vedi profilo & prenota <Icon name="arrow-right" size={14}/>
                </button>
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <div className="es-emoji">🐾</div>
              <h3>Nessun sitter con questi filtri</h3>
              <p>Prova ad allargare i criteri o rimuovere qualche filtro.</p>
              <button className="btn btn-primary" onClick={reset}>Azzera filtri</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
