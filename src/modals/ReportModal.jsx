import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const SPECIES = [
  { id:'cane',    emoji:'🐕', name:'Cane',      desc:'Di qualsiasi taglia' },
  { id:'gatto',   emoji:'🐈', name:'Gatto',     desc:'Domestico o randagio' },
  { id:'uccello', emoji:'🐦', name:'Uccello',   desc:'Caduto dal nido o ferito' },
  { id:'coniglio',emoji:'🐰', name:'Coniglio',  desc:'O altro piccolo mammifero' },
  { id:'rettile', emoji:'🦎', name:'Rettile',   desc:'Tartaruga, lucertola…' },
  { id:'altro',   emoji:'❓', name:'Altro',     desc:'Non riesco a riconoscerlo' },
];

const SITUATIONS = [
  { id:'ferito',     emoji:'🩹', name:'Ferito',      desc:'Visibilmente in difficoltà' },
  { id:'bloccato',   emoji:'🪤', name:'Bloccato',    desc:'In luogo pericoloso' },
  { id:'smarrito',   emoji:'🧭', name:'Smarrito',    desc:'Sembra perso, ha collare' },
  { id:'abbandonato',emoji:'💔', name:'Abbandonato', desc:'Da solo da molto tempo' },
  { id:'investito',  emoji:'🚗', name:'Investito',   desc:'Incidente stradale' },
  { id:'altro',      emoji:'⚠️', name:'Altro',       desc:'Altra emergenza' },
];

export default function ReportModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ species:null, situation:null, note:'', urgency:'alta' });

  useEffect(() => {
    if (open) { setStep(0); setData({ species:null, situation:null, note:'', urgency:'alta' }); }
  }, [open]);

  if (!open) return null;

  const steps = ['Cosa', 'Dove', 'Dettagli', 'Inviato'];

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="step-dots">
            {steps.map((_, i) => (
              <span key={i} className={"dot " + (i < step ? 'done' : i === step ? 'active' : '')}></span>
            ))}
          </div>
          <button className="modal-close" onClick={onClose}><Icon name="close" size={14}/></button>
        </div>

        <div className="modal-body">
          {step === 0 && (
            <>
              <div className="modal-eyebrow">Passo 1 · Che animale è?</div>
              <h2 className="modal-title">Dimmi cosa hai visto.</h2>
              <p className="modal-desc">Anche un'idea approssimativa va bene — i volontari capiranno dai dettagli successivi.</p>
              <div className="tile-grid">
                {SPECIES.map(s => (
                  <button key={s.id} className={"tile " + (data.species === s.id ? 'selected' : '')}
                          onClick={() => setData({...data, species: s.id})}>
                    <span className="tile-emoji">{s.emoji}</span>
                    <span className="tile-name">{s.name}</span>
                    <span className="tile-desc">{s.desc}</span>
                  </button>
                ))}
              </div>
              <div style={{marginTop:18}}>
                <div className="modal-eyebrow" style={{color:'var(--c-ink-soft)'}}>Cosa sta succedendo?</div>
                <div className="tile-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginTop:8}}>
                  {SITUATIONS.map(s => (
                    <button key={s.id} className={"tile " + (data.situation === s.id ? 'selected' : '')}
                            onClick={() => setData({...data, situation: s.id})}>
                      <span className="tile-emoji" style={{fontSize:22}}>{s.emoji}</span>
                      <span className="tile-name">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="modal-eyebrow">Passo 2 · Dove si trova?</div>
              <h2 className="modal-title">La posizione è già rilevata.</h2>
              <p className="modal-desc">Abbiamo geolocalizzato il punto. Puoi spostarlo o aggiungere riferimenti utili.</p>
              <div className="location-card mt-4">
                <div className="pin"><Icon name="pin" size={16}/></div>
                <div className="info">
                  <b>Piazza Vetra, 6 — Milano</b>
                  <span>45.4592°N, 9.1819°E · Precisione ±8m</span>
                </div>
                <a href="#" className="change" onClick={e => e.preventDefault()}>Sposta sulla mappa</a>
              </div>
              <div className="field">
                <label>Riferimento (opzionale)</label>
                <input placeholder="Es: vicino al chiosco, sotto la panchina blu…" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Urgenza</label>
                  <select value={data.urgency} onChange={e => setData({...data, urgency: e.target.value})}>
                    <option value="critica">Critica — pericolo immediato</option>
                    <option value="alta">Alta — necessita aiuto</option>
                    <option value="media">Media — situazione stabile</option>
                  </select>
                </div>
                <div className="field">
                  <label>L'animale è ancora lì?</label>
                  <select>
                    <option>Sì, sto guardando ora</option>
                    <option>Sì, ma me ne sto allontanando</option>
                    <option>Non lo so</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="modal-eyebrow">Passo 3 · Aggiungi una foto</div>
              <h2 className="modal-title">Una foto vale mille parole.</h2>
              <p className="modal-desc">Non serve sia perfetta — aiuta i volontari a riconoscere l'animale.</p>
              <div className="photo-drop mt-4">
                <div className="pic-row">
                  <div className="pic bg-grad-1">📷</div>
                  <div className="pic bg-grad-2" style={{opacity:.5}}>+</div>
                  <div className="pic bg-grad-3" style={{opacity:.5}}>+</div>
                </div>
                <p>Trascina qui le foto o</p>
                <button className="btn"><Icon name="camera" size={14}/> Scatta foto</button>
                <small>Max 5 foto · JPG, PNG · 10 MB ciascuna</small>
              </div>
              <div className="field mt-4">
                <label>Note per i soccorritori (opzionale)</label>
                <textarea placeholder="Es: l'animale è impaurito, si nasconde dietro un cassonetto."
                          value={data.note}
                          onChange={e => setData({...data, note: e.target.value})}></textarea>
              </div>
              <div className="field">
                <label>Posso restare in zona finché qualcuno arriva?</label>
                <div style={{display:'flex',gap:8}}>
                  <button className="chip active">Sì, fino a 30 min</button>
                  <button className="chip">Sì, oltre</button>
                  <button className="chip">No</button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="success-anim">
              <div className="ring"><Icon name="check" size={42}/></div>
              <h2 className="modal-title" style={{textAlign:'center'}}>Segnalazione inviata!</h2>
              <p className="modal-desc" style={{textAlign:'center'}}>
                Stiamo notificando <b>14 volontari</b> e <b>3 rifugi</b> entro 2 km.
                Ti aggiorniamo non appena qualcuno prende in carico — di solito entro 8 minuti.
              </p>
              <div style={{display:'flex',gap:8,marginTop:20}}>
                <span className="tag tag-mint">SOS-2847</span>
                <span className="tag tag-mute">priorità {data.urgency}</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>{step === 3 ? 'Chiudi' : 'Annulla'}</button>
          {step < 3 && (
            <div style={{display:'flex',gap:8}}>
              {step > 0 && <button className="btn" onClick={() => setStep(step - 1)}>Indietro</button>}
              <button className={"btn " + (step === 2 ? 'btn-sos' : 'btn-primary')}
                      onClick={() => setStep(step + 1)}
                      disabled={step === 0 && !data.species}
                      style={{opacity: (step === 0 && !data.species) ? 0.4 : 1}}>
                {step === 2 ? <>Invia SOS <Icon name="arrow-right" size={14}/></> : <>Continua <Icon name="arrow-right" size={14}/></>}
              </button>
            </div>
          )}
          {step === 3 && (
            <button className="btn btn-primary" onClick={onClose}>Vai al feed live</button>
          )}
        </div>
      </div>
    </div>
  );
}
