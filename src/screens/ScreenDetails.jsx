import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, CheckTile, Toggle } from '../components/FormComponents';
import { SERVICE_OPTS } from '../constants';
import SOSChat from '../components/SOSChat';
import ShareSheet from '../components/ShareSheet';

function DetailHeader({ onBack, eyebrow, title, subtitle, tags, actions }) {
  return (
    <div className="detail-head">
      <button className="btn btn-ghost" onClick={onBack}><Icon name="arrow-left" size={14}/> Indietro</button>
      <div className="dh-eyebrow">{eyebrow}</div>
      <h1 className="dh-title">{title}</h1>
      {subtitle && <div className="dh-sub">{subtitle}</div>}
      {tags && <div className="dh-tags">{tags}</div>}
      {actions && <div className="dh-actions">{actions}</div>}
    </div>
  );
}

export function DetailSOS({ data, onBack }) {
  const [taken, setTaken] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const timeline = [
    { dot:'sos',  time:'14:32', title:'Segnalazione aperta', desc:'Marco P. ha aperto un SOS critico in P.zza Vetra.' },
    { dot:'mint', time:'14:33', title:'Allerta inviata', desc:'47 utenti nel raggio di 2 km hanno ricevuto la notifica.' },
    { dot:'mint', time:'14:34', title:'Primo testimone', desc:"Giulia M. ha confermato la presenza dell'animale." },
    { dot:'lav',  time:'14:35', title:'ENPA Milano ha preso in carico', desc:'Veicolo in arrivo, ETA 8 minuti.' },
  ];

  return (
    <>
      <DetailHeader onBack={onBack} eyebrow="SOS · 4 min fa · 0.6 km da te"
        title={<>Cane ferito, <em>P.zza Vetra</em></>}
        subtitle="Pastore tedesco, taglia media, zampa anteriore zoppicante. Non aggressivo ma diffidente."
        tags={<><span className="tag tag-sos">Critica</span><span className="tag tag-mute">Cane</span><span className="tag tag-mute">Ferito</span><span className="tag tag-mute">2 testimoni</span></>}
        actions={<>
          <button className={"btn " + (taken ? '' : 'btn-primary')} onClick={() => setTaken(!taken)}>
            {taken ? <><Icon name="check" size={14}/> Hai preso in carico</> : <><Icon name="paw" size={14}/> Prendo in carico</>}
          </button>
          <button className="btn" onClick={() => setChatOpen(!chatOpen)}><Icon name="bell" size={14}/> {chatOpen ? 'Chiudi chat' : 'Chat SOS'}</button>
          <button className="btn" onClick={() => setShareOpen(true)}>📣 Condividi</button>
          <button className="btn btn-ghost"><Icon name="pin" size={14}/> Apri in mappa</button>
        </>}
      />
      <div className="detail-grid">
        <div className="detail-main">
          <div className="card sos-map-card">
            <div className="sos-map-mini">
              <div className="sos-pin sos-pin-main"></div>
              <div className="sos-pin-pulse"></div>
              <div className="map-label">P.zza Vetra · Milano</div>
            </div>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="card-h">Foto e dettagli</div>
            <div className="sos-photos">
              <div className="sos-photo bg-grad-1">📷</div>
              <div className="sos-photo bg-grad-2">📷</div>
              <div className="sos-photo bg-grad-3">📷</div>
            </div>
            <dl className="kv-list">
              <div><dt>Specie</dt><dd>Cane (Pastore tedesco)</dd></div>
              <div><dt>Taglia</dt><dd>Media · ~28 kg</dd></div>
              <div><dt>Condizione</dt><dd>Zoppicante zampa ant. dx, vigile</dd></div>
              <div><dt>Posizione GPS</dt><dd>45.4622°N, 9.1796°E</dd></div>
            </dl>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="card-h">Cronologia</div>
            <div className="timeline">
              {timeline.map((t, i) => (
                <div key={i} className="tl-item">
                  <span className={"tl-dot tl-" + t.dot}></span>
                  <div className="tl-body">
                    <div className="tl-meta"><b>{t.time}</b> · {t.title}</div>
                    <div className="tl-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="detail-aside">
          <div className="card resp-card">
            <div className="card-h">Stanno rispondendo</div>
            <div className="resp-list">
              <div className="resp-row"><div className="av av-mint">EM</div><div style={{flex:1}}><b>ENPA Milano</b><div className="meta">In arrivo · ETA 8'</div></div><span className="tag tag-mint">Verificato</span></div>
              <div className="resp-row"><div className="av av-peach">GM</div><div style={{flex:1}}><b>Giulia M.</b><div className="meta">Sul posto · 12 SOS</div></div><span className="tag tag-mute">Volontaria</span></div>
            </div>
          </div>
          {chatOpen && (
            <div style={{ marginBottom: 16 }}>
              <SOSChat sosId="001" userName="Tu" />
            </div>
          )}
          <div className="card" style={{padding:18}}>
            <div className="card-h">Cosa puoi fare</div>
            <ul className="bullets">
              <li><Icon name="check" size={14}/> Restare a vista finché qualcuno non arriva</li>
              <li><Icon name="check" size={14}/> Non avvicinarti se mostra paura</li>
              <li><Icon name="check" size={14}/> Chiamare il numero unico: <b>800.123.456</b></li>
            </ul>
          </div>
        </aside>
      </div>
      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="SOS animale in difficoltà"
        defaultText="🐾 SOS! C'è un cane ferito in P.zza Vetra a Roma — serve aiuto urgente. Segnalato su MUSO, la rete di persone che salva gli animali."
      />
    </>
  );
}

function Compat({ label, level }) {
  return (
    <div className="compat-row">
      <span className="compat-label">{label}</span>
      <div className="compat-dots">{[1,2,3].map(n => <span key={n} className={"cdot " + (n <= level ? 'on' : '')}></span>)}</div>
      <span className="compat-val">{['—','basso','medio','alto'][level]}</span>
    </div>
  );
}

function ApplyForm({ pet, step, setStep, match, setMatch, onBack }) {
  const steps = ['Casa', 'Esperienza', 'Famiglia', 'Conferma'];
  return (
    <>
      <DetailHeader onBack={onBack} eyebrow={"Candidatura per " + pet.name}
        title={<>Aiutaci a capire se siete <em>fatti l'uno per l'altra</em>.</>}
        subtitle="Le risposte vanno solo al rifugio, non sono pubbliche."
      />
      <div className="apply-progress">
        {steps.map((s, i) => (
          <div key={i} className={"ap-step " + (i+1 < step ? 'done' : i+1 === step ? 'active' : '')}>
            <span className="ap-num">{i+1 < step ? <Icon name="check" size={12}/> : i+1}</span><span>{s}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:28,maxWidth:760,margin:'0 auto',width:'100%'}}>
        {step === 1 && (
          <>
            <div className="fs-title" style={{marginBottom:6}}>Dove vivi?</div>
            <div className="check-grid">
              {[{v:'apartment',i:'🏢',l:'Appartamento',d:'Senza spazio esterno'},{v:'apt-balcony',i:'🪴',l:'App. con balcone',d:'Spazio esterno limitato'},{v:'house-garden',i:'🌳',l:'Casa con giardino',d:'Spazio recintato'},{v:'country',i:'🏡',l:'Campagna / aperta',d:'Spazi ampi'}].map(o => (
                <CheckTile key={o.v} icon={o.i} label={o.l} desc={o.d} checked={match.home === o.v} onChange={() => setMatch({...match, home:o.v})} />
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="fs-title" style={{marginBottom:6}}>Hai esperienza?</div>
            <div className="check-grid">
              {[{v:'first',l:'Primo animale',d:'Nessuna esperienza'},{v:'pet',l:'Ho già avuto pet',d:'Cane o gatto in passato'},{v:'expert',l:'Esperto/a',d:'Ho convissuto con cani simili'},{v:'pro',l:'Professionista',d:'Educatore, vet, sitter'}].map(o => (
                <CheckTile key={o.v} icon="✓" label={o.l} desc={o.d} checked={match.exp === o.v} onChange={() => setMatch({...match, exp:o.v})} />
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="fs-title" style={{marginBottom:6}}>Chi vive con te?</div>
            <div className="toggle-row">
              <div><div className="tr-label">Bambini sotto i 12 anni</div></div>
              <Toggle value={match.kids === 'yes'} onChange={v => setMatch({...match, kids:v?'yes':'no'})}/>
            </div>
            <div className="toggle-row">
              <div><div className="tr-label">Altri animali</div></div>
              <Toggle value={match.other === 'yes'} onChange={v => setMatch({...match, other:v?'yes':'no'})}/>
            </div>
            <Field label="Perché vorresti adottare proprio lui/lei?" hint="2-3 righe vanno benissimo.">
              <textarea value={match.why} onChange={e => setMatch({...match, why:e.target.value})} placeholder="Quello che mi colpisce è…" />
            </Field>
          </>
        )}
        {step === 4 && (
          <>
            <div className="fs-title" style={{marginBottom:6}}>Riepilogo</div>
            <dl className="kv-list">
              <div><dt>Animale</dt><dd>{pet.name} · {pet.age}</dd></div>
              <div><dt>Rifugio</dt><dd>{pet.shelter}</dd></div>
              <div><dt>Casa</dt><dd>{{apartment:'Appartamento','apt-balcony':'App. con balcone','house-garden':'Casa con giardino',country:'Campagna'}[match.home] || '—'}</dd></div>
              <div><dt>Esperienza</dt><dd>{{first:'Primo animale',pet:'Esperienza pregressa',expert:'Esperto/a',pro:'Professionista'}[match.exp] || '—'}</dd></div>
              <div><dt>Bambini</dt><dd>{match.kids === 'yes' ? 'Sì' : 'No'}</dd></div>
            </dl>
            <label className="check-row" style={{marginTop:12}}>
              <input type="checkbox" defaultChecked />
              <span>Accetto il protocollo adozioni e una visita pre-adozione presso il rifugio.</span>
            </label>
          </>
        )}
        <div className="form-foot" style={{position:'static',boxShadow:'none',marginTop:18,padding:'18px 0 0'}}>
          <button className="btn btn-ghost" onClick={() => step === 1 ? onBack() : setStep(step - 1)}>
            <Icon name="arrow-left" size={14}/> {step === 1 ? 'Annulla' : 'Indietro'}
          </button>
          <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
            {step < 4 ? 'Avanti' : 'Invia candidatura'} <Icon name="arrow-right" size={14}/>
          </button>
        </div>
      </div>
    </>
  );
}

export function DetailAdopt({ data, onBack }) {
  const [step, setStep] = useState(0);
  const [match, setMatch] = useState({ home:'', exp:'', kids:'no', other:'no', why:'' });

  if (step >= 1 && step <= 4) return <ApplyForm pet={data} step={step} setStep={setStep} match={match} setMatch={setMatch} onBack={() => setStep(0)} />;

  if (step === 5) return (
    <div className="content" style={{minHeight:'70vh',justifyContent:'center'}}>
      <div className="success-anim" style={{margin:'auto',maxWidth:520}}>
        <div className="ring"><Icon name="check" size={42}/></div>
        <h2 className="modal-title" style={{textAlign:'center'}}>Candidatura inviata.</h2>
        <p className="modal-desc" style={{textAlign:'center'}}><b>{data.shelter}</b> riceverà la tua candidatura per <b>{data.name}</b>. Ti rispondono entro 48h.</p>
        <div style={{display:'flex',gap:8,marginTop:20,justifyContent:'center'}}>
          <button className="btn btn-primary" onClick={onBack}>Torna alle adozioni <Icon name="arrow-right" size={14}/></button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DetailHeader onBack={onBack} eyebrow={"Adozione · " + data.shelter}
        title={<>Conosci <em>{data.name}</em>.</>} subtitle={data.age + ' · ' + data.shelter}
        tags={<><span className="tag tag-mint">{data.tag}</span><span className="tag tag-mute">Vaccinato</span><span className="tag tag-mute">Microchip</span></>}
        actions={<>
          <button className="btn btn-primary" onClick={() => setStep(1)}><Icon name="paw" size={14}/> Candidati per adottare</button>
          <button className="btn"><Icon name="heart" size={14}/> Salva</button>
          <button className="btn btn-ghost"><Icon name="bell" size={14}/> Chiedi info al rifugio</button>
        </>}
      />
      <div className="detail-grid">
        <div className="detail-main">
          <div className={"adopt-hero " + data.bg}><div className="adopt-hero-face">{data.emoji}</div></div>
          <div className="adopt-thumbs">
            <div className={"thumb-sm " + data.bg}>{data.emoji}</div>
            <div className="thumb-sm bg-grad-2">📷</div>
            <div className="thumb-sm bg-grad-3">📷</div>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="card-h">Storia</div>
            <p className="prose">{data.name} è arrivat{data.age.includes('F') ? 'a' : 'o'} al rifugio sei mesi fa. Oggi è un compagno affettuoso, che ama le passeggiate lunghe e il divano la sera.</p>
          </div>
          <div className="card" style={{padding:24}}>
            <div className="card-h">Compatibilità</div>
            <div className="compat-grid">
              <Compat label="Bambini" level={3}/><Compat label="Altri cani" level={2}/>
              <Compat label="Appartamento" level={2}/><Compat label="Solitudine" level={1}/>
            </div>
          </div>
        </div>
        <aside className="detail-aside">
          <div className="card" style={{padding:18}}>
            <div className="card-h">Identità</div>
            <dl className="kv-list">
              <div><dt>Nome</dt><dd>{data.name}</dd></div>
              <div><dt>Età</dt><dd>{data.age.split(' · ')[0]}</dd></div>
              <div><dt>Sesso</dt><dd>{data.age.includes('F') ? 'Femmina' : 'Maschio'}</dd></div>
              <div><dt>Microchip</dt><dd>380260000123456</dd></div>
              <div><dt>Vaccini</dt><dd>Aggiornati</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

export function BookingFlow({ sitter, step, setStep, book, setBook, onBack }) {
  const steps = ['Servizio', 'Date', 'Animale', 'Pagamento'];
  const total = step >= 2 && book.from && book.to
    ? Math.max(1, Math.ceil((new Date(book.to) - new Date(book.from)) / 86400000)) * sitter.rate
    : sitter.rate;

  if (step === 5) return (
    <div className="content" style={{minHeight:'70vh',justifyContent:'center'}}>
      <div className="success-anim" style={{margin:'auto',maxWidth:520}}>
        <div className="ring"><Icon name="check" size={42}/></div>
        <h2 className="modal-title" style={{textAlign:'center'}}>Prenotazione confermata.</h2>
        <p className="modal-desc" style={{textAlign:'center'}}><b>{sitter.name}</b> riceve subito la tua richiesta. Il pagamento di <b>€{total}</b> è trattenuto e versato a fine servizio.</p>
        <div style={{display:'flex',gap:8,marginTop:20,justifyContent:'center'}}>
          <button className="btn btn-primary" onClick={onBack}>OK <Icon name="check" size={14}/></button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DetailHeader onBack={onBack} eyebrow={"Prenotazione con " + sitter.name}
        title={<>Prenota in <em>4 passi</em>.</>}
        subtitle="Pagamento trattenuto fino a fine servizio. Cancellazione gratuita 48h prima."
      />
      <div className="apply-progress">
        {steps.map((s, i) => (
          <div key={i} className={"ap-step " + (i+1 < step ? 'done' : i+1 === step ? 'active' : '')}>
            <span className="ap-num">{i+1 < step ? <Icon name="check" size={12}/> : i+1}</span><span>{s}</span>
          </div>
        ))}
      </div>
      <div className="detail-grid">
        <div className="detail-main">
          <div className="card" style={{padding:28}}>
            {step === 1 && (
              <>
                <div className="fs-title" style={{marginBottom:18}}>Che servizio ti serve?</div>
                <div className="check-grid">
                  {[{v:'walking',i:'🚶',l:'Dog walking',d:'Passeggiata 60 min · €14'},{v:'day',i:'🌞',l:'Day care',d:'Giornata intera · €22'},{v:'night',i:'🌙',l:'Pernottamento',d:'Notte intera · €' + sitter.rate},{v:'cat',i:'🐈',l:'Cat sitting',d:'Visita a domicilio · €12'}].map(o => (
                    <CheckTile key={o.v} icon={o.i} label={o.l} desc={o.d} checked={book.service === o.v} onChange={() => setBook({...book, service:o.v})}/>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="fs-title" style={{marginBottom:18}}>Quando?</div>
                <div className="field-grid">
                  <Field label="Dal" required><input type="date" value={book.from} onChange={e => setBook({...book, from:e.target.value})}/></Field>
                  <Field label="Al" required><input type="date" value={book.to} onChange={e => setBook({...book, to:e.target.value})}/></Field>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="fs-title" style={{marginBottom:18}}>Quale animale?</div>
                <div className="check-grid">
                  <CheckTile icon="🐕" label="Brando" desc="Labrador · 28 kg · 5 anni" checked={book.pet==='cane'} onChange={() => setBook({...book, pet:'cane'})}/>
                  <CheckTile icon="🐈" label="Mia" desc="Europeo · 4 kg · 3 anni" checked={book.pet==='gatto'} onChange={() => setBook({...book, pet:'gatto'})}/>
                </div>
                <Field label="Note per il sitter (opzionale)">
                  <textarea placeholder="Allergie, abitudini, paure, contatto vet..." />
                </Field>
              </>
            )}
            {step === 4 && (
              <>
                <div className="fs-title" style={{marginBottom:18}}>Pagamento</div>
                <div className="card" style={{padding:18,background:'var(--c-bg)',border:'1.5px dashed var(--c-line-strong)'}}>
                  <label className="pay-row"><input type="radio" name="pay" defaultChecked/> 💳 Carta •••• 4242</label>
                  <label className="pay-row"><input type="radio" name="pay"/> 🅿️ PayPal</label>
                  <label className="pay-row"><input type="radio" name="pay"/> 🍎 Apple Pay</label>
                </div>
                <div style={{fontSize:12,color:'var(--c-ink-mute)',marginTop:14}}>Il pagamento viene trattenuto in escrow MUSO e versato al sitter a fine servizio.</div>
              </>
            )}
            <div className="form-foot" style={{position:'static',boxShadow:'none',marginTop:18,padding:'18px 0 0'}}>
              <button className="btn btn-ghost" onClick={() => step === 1 ? onBack() : setStep(step - 1)}>
                <Icon name="arrow-left" size={14}/> {step === 1 ? 'Annulla' : 'Indietro'}
              </button>
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                {step < 4 ? 'Avanti' : 'Conferma e paga'} <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </div>
        </div>
        <aside className="detail-aside">
          <div className="card sticky-book">
            <div className="card-h">Riepilogo</div>
            <div className="recap">
              <div><span>Sitter</span><b>{sitter.name}</b></div>
              <div><span>Servizio</span><b>{{walking:'Walking',day:'Day care',night:'Pernottamento',cat:'Cat sitting'}[book.service]}</b></div>
              {book.from && <div><span>Periodo</span><b>{book.from} → {book.to || '?'}</b></div>}
              <div className="recap-sep"></div>
              <div><span>Tariffa</span><b>€{sitter.rate}</b></div>
              <div><span>Servizio MUSO</span><b>€2</b></div>
              <div className="recap-total"><span>Totale</span><b className="serif">€{total + 2}</b></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
