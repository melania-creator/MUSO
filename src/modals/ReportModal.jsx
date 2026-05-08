import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const SPECIES = [
  { id:'cane',     emoji:'🐕', name:'Cane'     },
  { id:'gatto',    emoji:'🐈', name:'Gatto'    },
  { id:'uccello',  emoji:'🐦', name:'Uccello'  },
  { id:'coniglio', emoji:'🐰', name:'Coniglio' },
  { id:'rettile',  emoji:'🦎', name:'Rettile'  },
  { id:'altro',    emoji:'❓', name:'Altro'    },
];

const SITUATIONS = [
  { id:'ferito',      emoji:'🩹', name:'Ferito'      },
  { id:'bloccato',    emoji:'🪤', name:'Bloccato'    },
  { id:'smarrito',    emoji:'🧭', name:'Smarrito'    },
  { id:'abbandonato', emoji:'💔', name:'Abbandonato' },
  { id:'investito',   emoji:'🚗', name:'Investito'   },
  { id:'altro',       emoji:'⚠️', name:'Altro'       },
];

const MODAL_STYLE = `
  .sos-tile-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  }
  .sos-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 14px 8px;
    border-radius: 14px;
    border: 2px solid var(--c-line, #eee);
    background: var(--c-bg, #f9f7f4);
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: border-color .15s, background .15s;
  }
  .sos-tile.selected {
    border-color: #FF5C4D;
    background: #FFF0EE;
    color: #CC2200;
  }
  .sos-tile-emoji { font-size: 26px; line-height: 1; }
  .location-detected {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 14px;
    background: #F0FBF4;
    border: 1.5px solid #6DBF8A;
    margin: 16px 0;
  }
  .location-detected .loc-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #6DBF8A;
    display: flex; align-items: center; justify-content: center;
    color: #fff; flex-shrink: 0;
  }
  .location-detecting {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 14px;
    background: var(--c-bg, #f9f7f4);
    border: 1.5px solid var(--c-line, #eee);
    margin: 16px 0;
    color: var(--c-ink-mute);
    font-size: 13px;
  }
  .spin {
    animation: spin .8s linear infinite;
    display: inline-block;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function ReportModal({ open, onClose }) {
  const [step, setStep]           = useState(0);
  const [species, setSpecies]     = useState(null);
  const [situation, setSituation] = useState(null);
  const [urgency, setUrgency]     = useState('alta');
  const [note, setNote]           = useState('');
  const [location, setLocation]   = useState(null);
  const [locating, setLocating]   = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0); setSpecies(null); setSituation(null);
      setUrgency('alta'); setNote(''); setLocation(null);
    }
  }, [open]);

  // Geolocalizzazione automatica appena si apre il passo 1
  useEffect(() => {
    if (step !== 1 || location) return;
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      pos => {
        setLocation({
          lat: pos.coords.latitude.toFixed(5),
          lng: pos.coords.longitude.toFixed(5),
          label: 'Posizione rilevata',
        });
        setLocating(false);
      },
      () => {
        setLocation({ label: 'Posizione non disponibile — aggiungi un riferimento' });
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }, [step]);

  if (!open) return null;

  const canProceed = step === 0 ? (species && situation) : true;

  const handleSend = () => setStep(2);

  return (
    <>
      <style>{MODAL_STYLE}</style>
      <div className="modal-wrap" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>

          {/* Header */}
          <div className="modal-head">
            <div className="step-dots">
              {[0,1,2].map(i => (
                <span key={i} className={"dot " + (i < step ? 'done' : i === step ? 'active' : '')}/>
              ))}
            </div>
            <button className="modal-close" onClick={onClose}><Icon name="close" size={14}/></button>
          </div>

          {/* Body */}
          <div className="modal-body">

            {/* ── Step 0: Cosa hai visto ── */}
            {step === 0 && (
              <>
                <div className="modal-eyebrow">Passo 1 di 2</div>
                <h2 className="modal-title">Cosa hai visto?</h2>
                <p className="modal-desc">Due scelte rapide, poi invii — ci pensiamo noi.</p>

                <div style={{ marginTop:16 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--c-ink-mute)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.05em' }}>Che animale è?</div>
                  <div className="sos-tile-grid">
                    {SPECIES.map(s => (
                      <button key={s.id} className={"sos-tile " + (species === s.id ? 'selected' : '')}
                              onClick={() => setSpecies(s.id)}>
                        <span className="sos-tile-emoji">{s.emoji}</span>
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop:20 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'var(--c-ink-mute)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.05em' }}>Cosa sta succedendo?</div>
                  <div className="sos-tile-grid">
                    {SITUATIONS.map(s => (
                      <button key={s.id} className={"sos-tile " + (situation === s.id ? 'selected' : '')}
                              onClick={() => setSituation(s.id)}>
                        <span className="sos-tile-emoji">{s.emoji}</span>
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Step 1: Conferma e invia ── */}
            {step === 1 && (
              <>
                <div className="modal-eyebrow">Passo 2 di 2</div>
                <h2 className="modal-title">Conferma e invia.</h2>
                <p className="modal-desc">La posizione viene rilevata automaticamente. Aggiungi un dettaglio se vuoi — non è obbligatorio.</p>

                {locating ? (
                  <div className="location-detecting">
                    <span className="spin">⟳</span>
                    Rilevo la tua posizione GPS…
                  </div>
                ) : location ? (
                  <div className="location-detected">
                    <div className="loc-icon"><Icon name="pin" size={16}/></div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14 }}>{location.label}</div>
                      {location.lat && (
                        <div style={{ fontSize:12, color:'#3A8A5C', marginTop:2 }}>
                          {location.lat}°N, {location.lng}°E
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="field-row" style={{ marginTop:8 }}>
                  <div className="field">
                    <label>Urgenza</label>
                    <select value={urgency} onChange={e => setUrgency(e.target.value)}>
                      <option value="critica">Critica — pericolo immediato</option>
                      <option value="alta">Alta — necessita aiuto</option>
                      <option value="media">Media — situazione stabile</option>
                    </select>
                  </div>
                </div>

                <div className="field" style={{ marginTop:12 }}>
                  <label>Note (opzionale)</label>
                  <textarea
                    placeholder="Es: zampa ferita, si nasconde sotto un'auto…"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={3}
                  />
                </div>

                <div style={{ marginTop:14, padding:'12px 14px', borderRadius:12, background:'#FFF8ED', border:'1px solid #F5D9A0', fontSize:13, color:'#7A5500' }}>
                  <b>Riepilogo:</b> {SPECIES.find(s=>s.id===species)?.emoji} {SPECIES.find(s=>s.id===species)?.name} · {SITUATIONS.find(s=>s.id===situation)?.name} · priorità {urgency}
                </div>
              </>
            )}

            {/* ── Step 2: Inviato ── */}
            {step === 2 && (
              <div className="success-anim">
                <div className="ring"><Icon name="check" size={42}/></div>
                <h2 className="modal-title" style={{ textAlign:'center' }}>SOS inviato!</h2>
                <p className="modal-desc" style={{ textAlign:'center' }}>
                  Stiamo notificando volontari e rifugi nel raggio di 2 km.<br/>
                  Di solito qualcuno risponde entro <b>8 minuti</b>.
                </p>
                <div style={{ display:'flex', gap:8, marginTop:16, flexWrap:'wrap' }}>
                  <span className="tag tag-sos">SOS aperto</span>
                  <span className="tag tag-mute">priorità {urgency}</span>
                  {location?.lat && <span className="tag tag-mint">📍 GPS rilevato</span>}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-foot">
            {step < 2 ? (
              <>
                <button className="btn btn-ghost" onClick={step === 0 ? onClose : () => setStep(0)}>
                  {step === 0 ? 'Annulla' : <><Icon name="arrow-left" size={13}/> Indietro</>}
                </button>
                <button
                  className={"btn " + (step === 1 ? 'btn-sos' : 'btn-primary')}
                  disabled={!canProceed}
                  style={{ opacity: canProceed ? 1 : 0.4 }}
                  onClick={step === 0 ? () => setStep(1) : handleSend}>
                  {step === 0
                    ? <>Avanti <Icon name="arrow-right" size={14}/></>
                    : <>Invia SOS <Icon name="sos" size={14}/></>}
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost" onClick={onClose}>Chiudi</button>
                <button className="btn btn-primary" onClick={onClose}>Vai al feed live</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
