import { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import { FormSection, Field, CheckTile, Toggle } from '../components/FormComponents';

const ROLES = [
  { id:'user',   label:'Utente',     emoji:'👤', desc:'Adotto, dono, segnalo SOS' },
  { id:'sitter', label:'Pet Sitter', emoji:'🌿', desc:'Offro servizi di cura' },
  { id:'shop',   label:'Vetrina',    emoji:'🏬', desc:'Pet shop, brand, veterinari' },
];

const SHOP_TYPES = [
  { id:'pet-shop',  icon:'🛒', label:'Pet shop',     desc:'Negozio fisico o catena' },
  { id:'groom',     icon:'✂️', label:'Toelettatura', desc:'Salone per animali' },
  { id:'vet',       icon:'🩺', label:'Veterinario',  desc:'Ambulatorio, clinica' },
  { id:'ecommerce', icon:'📦', label:'E-commerce',   desc:'Vendita online' },
  { id:'brand',     icon:'⭐', label:'Brand',        desc:'Produttore, marchio' },
  { id:'training',  icon:'🎾', label:'Educazione',   desc:'Cinofila, dog school' },
];

const PLANS = [
  { id:'free',    name:'Free',    price:'€0',  when:'sempre',   feats:['Vetrina base con logo','1 promozione attiva','Profilo verificato'] },
  { id:'pro',     name:'Pro',     price:'€29', when:'al mese',  popular:true, feats:['Vetrina espansa + galleria','Promo illimitate','In evidenza nelle ricerche zonali','Statistiche di base'] },
  { id:'premium', name:'Premium', price:'€89', when:'al mese',  feats:['Tutto del Pro','Posizione top in homepage','Banner brand su mappa SOS','Dashboard analytics','Account manager dedicato'] },
];

function FormUser() {
  const [pets, setPets] = useState({ cane: true, gatto: false, altro: false, nessuno: false });
  const [volunteer, setVolunteer] = useState(true);
  const [notif, setNotif] = useState(true);
  return (
    <>
      <FormSection num="1" title="Chi sei" desc="Bastano due dati per iniziare.">
        <div className="field-grid">
          <Field label="Nome" required><input placeholder="Giulia" /></Field>
          <Field label="Cognome" required><input placeholder="Marini" /></Field>
          <Field label="Email" required span="2"><input type="email" placeholder="giulia@esempio.it" /></Field>
          <Field label="Password" required hint="Almeno 8 caratteri"><input type="password" placeholder="••••••••" /></Field>
          <Field label="Città" required><input placeholder="Milano" /></Field>
        </div>
      </FormSection>
      <FormSection num="2" title="I tuoi animali" desc="Personalizziamo i contenuti che vedrai.">
        <div className="check-grid">
          <CheckTile icon="🐕" label="Cane"   checked={pets.cane}    onChange={v => setPets({...pets, cane:v, nessuno:false})} />
          <CheckTile icon="🐈" label="Gatto"  checked={pets.gatto}   onChange={v => setPets({...pets, gatto:v, nessuno:false})} />
          <CheckTile icon="🐰" label="Altro"  desc="Conigli, uccelli, rettili…" checked={pets.altro} onChange={v => setPets({...pets, altro:v, nessuno:false})} />
          <CheckTile icon="✨" label="Nessuno" desc="Voglio solo aiutare" checked={pets.nessuno} onChange={v => setPets({cane:false,gatto:false,altro:false,nessuno:v})} />
        </div>
      </FormSection>
      <FormSection num="3" title="Come vuoi contribuire" desc="Puoi cambiare in qualsiasi momento.">
        <div className="toggle-row">
          <div><div className="tr-label">Voglio diventare volontario SOS</div><div className="tr-desc">Ricevi notifiche per le emergenze entro 2 km da te.</div></div>
          <Toggle value={volunteer} onChange={setVolunteer} />
        </div>
        <div className="toggle-row">
          <div><div className="tr-label">Notifiche push per nuovi animali in adozione</div><div className="tr-desc">Una mail al giorno con i match per le tue preferenze.</div></div>
          <Toggle value={notif} onChange={setNotif} />
        </div>
      </FormSection>
      <FormSection num="4" title="Tutto a posto" desc="Ultimi consensi e via.">
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Accetto i <a href="#" onClick={e=>e.preventDefault()}>Termini di servizio</a> e l'<a href="#" onClick={e=>e.preventDefault()}>Informativa privacy</a>.</span></label>
        <label className="check-row"><input type="checkbox" /><span>Ricevi la newsletter MUSO (storie di adozioni, novità, una a settimana).</span></label>
      </FormSection>
    </>
  );
}

function FormSitter() {
  const [services, setServices] = useState({ walking:true, day:true, night:false, cat:false });
  const [pets, setPets] = useState({ small:true, medium:true, large:false });
  return (
    <>
      <FormSection num="1" title="Profilo personale" desc="Quello che vedranno i futuri clienti.">
        <div className="field-grid">
          <Field label="Nome" required><input placeholder="Marta" /></Field>
          <Field label="Cognome" required><input placeholder="Lombardi" /></Field>
          <Field label="Email" required><input type="email" placeholder="marta@esempio.it" /></Field>
          <Field label="Telefono" required><input placeholder="+39 333 1234567" /></Field>
          <Field label="Città" required><input placeholder="Milano" /></Field>
          <Field label="Quartiere / zona" required><input placeholder="Isola, Garibaldi, Corso Como" /></Field>
        </div>
      </FormSection>
      <FormSection num="2" title="Servizi che offri">
        <div className="check-grid">
          <CheckTile icon="🚶" label="Dog walking"   desc="Passeggiate giornaliere"    checked={services.walking} onChange={v => setServices({...services, walking:v})} />
          <CheckTile icon="🌞" label="Day care"      desc="Tieni l'animale di giorno" checked={services.day}     onChange={v => setServices({...services, day:v})} />
          <CheckTile icon="🌙" label="Pernottamento" desc="A casa tua"                 checked={services.night}   onChange={v => setServices({...services, night:v})} />
          <CheckTile icon="🐈" label="Cat sitter"    desc="Visite a domicilio"         checked={services.cat}     onChange={v => setServices({...services, cat:v})} />
        </div>
        <div className="field-grid mt-3">
          <Field label="Tariffa passeggiata (60 min)"><div className="input-eur"><input placeholder="14" /><span>€</span></div></Field>
          <Field label="Tariffa day care (giornata)"><div className="input-eur"><input placeholder="22" /><span>€</span></div></Field>
          <Field label="Tariffa pernottamento (notte)"><div className="input-eur"><input placeholder="32" /><span>€</span></div></Field>
          <Field label="Disponibilità"><select><option>Tutti i giorni</option><option>Solo feriali</option><option>Solo weekend</option></select></Field>
        </div>
      </FormSection>
      <FormSection num="3" title="Esperienza e taglie">
        <Field label="Bio (max 240 caratteri)" hint="Raccontati: cosa ti rende un buon sitter?">
          <textarea placeholder="Educatrice cinofila, ho 2 cani e una casa con giardino. Specializzata in cuccioli e cani anziani."></textarea>
        </Field>
        <div className="field-grid">
          <Field label="Anni di esperienza" required><select><option>Meno di 1 anno</option><option>1–3 anni</option><option>3–5 anni</option><option>Più di 5 anni</option></select></Field>
          <Field label="Quanti animali contemporaneamente?"><select><option>Solo 1</option><option>Fino a 2</option><option>Fino a 3</option></select></Field>
        </div>
        <div style={{marginTop:6}}>
          <div className="field-label">Taglie con cui lavori</div>
          <div className="check-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
            <CheckTile icon="🐶" label="Piccola" desc="< 10 kg"  checked={pets.small}  onChange={v => setPets({...pets, small:v})} />
            <CheckTile icon="🐕" label="Media"   desc="10–25 kg" checked={pets.medium} onChange={v => setPets({...pets, medium:v})} />
            <CheckTile icon="🐕‍🦺" label="Grande" desc="> 25 kg"  checked={pets.large}  onChange={v => setPets({...pets, large:v})} />
          </div>
        </div>
      </FormSection>
      <FormSection num="4" title="Verifica" desc="Visibile solo al team MUSO.">
        <div className="upload-row"><Icon name="shield" size={16}/> <span><b>Documento d'identità</b></span><button type="button" className="btn" style={{marginLeft:'auto'}}><Icon name="camera" size={14}/> Carica</button></div>
        <div className="upload-row"><Icon name="shield" size={16}/> <span><b>Certificazioni</b> — opzionale</span><button type="button" className="btn" style={{marginLeft:'auto'}}><Icon name="camera" size={14}/> Carica</button></div>
        <label className="check-row mt-3"><input type="checkbox" defaultChecked /><span>Accetto i <a href="#" onClick={e=>e.preventDefault()}>Termini per i sitter</a> e il <a href="#" onClick={e=>e.preventDefault()}>Codice etico MUSO</a>.</span></label>
      </FormSection>
    </>
  );
}

function FormShop() {
  const [type, setType] = useState('pet-shop');
  const [plan, setPlan] = useState('pro');
  const [feats, setFeats] = useState({ delivery:true, instore:true, loyalty:false, grooming:false });
  return (
    <>
      <FormSection num="1" title="Tipo di vetrina">
        <div className="check-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
          {SHOP_TYPES.map(s => (
            <CheckTile key={s.id} icon={s.icon} label={s.label} desc={s.desc} checked={type === s.id} onChange={() => setType(s.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection num="2" title="Dati azienda">
        <div className="field-grid">
          <Field label="Ragione sociale" required span="2"><input placeholder="Arcaplanet S.p.A." /></Field>
          <Field label="Partita IVA" required><input placeholder="IT 01234567890" /></Field>
          <Field label="Email aziendale" required><input type="email" placeholder="vetrina@brand.it" /></Field>
          <Field label="Telefono" required><input placeholder="+39 02 1234567" /></Field>
          <Field label="Sede legale" required span="2"><input placeholder="Via Solferino 22, 20121 Milano (MI)" /></Field>
          <Field label="Referente" required><input placeholder="Anna Bianchi" /></Field>
          <Field label="Ruolo"><input placeholder="Marketing Manager" /></Field>
        </div>
      </FormSection>
      <FormSection num="3" title="La tua vetrina">
        <div className="field-grid mt-3">
          <Field label="Nome pubblico" required span="2"><input placeholder="Es: Arcaplanet — Buenos Aires" /></Field>
          <Field label="Sito web" span="2"><input placeholder="https://" /></Field>
          <Field label="Descrizione" hint="Max 280 caratteri" span="2"><textarea placeholder="Catena di pet shop con consegne in 2h…"></textarea></Field>
        </div>
        <div style={{marginTop:6}}>
          <div className="field-label">Servizi offerti</div>
          <div className="check-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
            <CheckTile icon="🚚" label="Consegna"         desc="A domicilio, 24-48h" checked={feats.delivery} onChange={v=>setFeats({...feats,delivery:v})} />
            <CheckTile icon="🏪" label="Ritiro in negozio" desc="Click & collect"    checked={feats.instore}  onChange={v=>setFeats({...feats,instore:v})} />
            <CheckTile icon="🎟️" label="Carta fedeltà"   desc="Punti, sconti"       checked={feats.loyalty}  onChange={v=>setFeats({...feats,loyalty:v})} />
            <CheckTile icon="✂️" label="Toelettatura"     desc="In sede"             checked={feats.grooming} onChange={v=>setFeats({...feats,grooming:v})} />
          </div>
        </div>
      </FormSection>
      <FormSection num="4" title="Scegli il piano" desc="Prova Pro gratis 30 giorni.">
        <div className="plans-grid">
          {PLANS.map(p => (
            <button type="button" key={p.id}
                    className={"plan-card " + (plan === p.id ? 'selected' : '') + (p.popular ? ' popular' : '')}
                    onClick={() => setPlan(p.id)}>
              {p.popular && <span className="plan-badge">Più scelto</span>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price"><span className="serif">{p.price}</span><span className="plan-when">{p.when}</span></div>
              <ul>{p.feats.map((f, i) => <li key={i}><Icon name="check" size={12}/> {f}</li>)}</ul>
              <div className="plan-radio"><span className={plan === p.id ? 'on' : ''}></span>{plan === p.id ? 'Selezionato' : 'Seleziona'}</div>
            </button>
          ))}
        </div>
      </FormSection>
      <FormSection num="5" title="Conferma">
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Confermo che i dati inseriti corrispondono a quelli aziendali.</span></label>
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Accetto le <a href="#" onClick={e=>e.preventDefault()}>Condizioni partner</a> e il <a href="#" onClick={e=>e.preventDefault()}>Codice etico MUSO</a>.</span></label>
      </FormSection>
    </>
  );
}

function PreviewUser() {
  return (
    <div className="preview-stack">
      <div className="preview-eyebrow">Il tuo profilo</div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{height:60,background:'var(--grad-hero)'}}></div>
        <div style={{padding:'0 18px 18px',marginTop:-22}}>
          <div className="avatar" style={{width:48,height:48,fontSize:16,border:'3px solid white'}}>GM</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:22,marginTop:8}}>Giulia Marini</div>
          <div style={{fontSize:12,color:'var(--c-ink-mute)',marginBottom:8}}>Milano · 0 SOS · 0 donazioni</div>
          <span className="tag tag-mint">Volontario SOS</span>
        </div>
      </div>
      <div className="benefits">
        <div className="ben"><span className="bdot bg-grad-2">🐾</span><div><b>Adozioni personalizzate</b><p>Match con i rifugi delle tue zone preferite.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-1">🚨</span><div><b>SOS in tempo reale</b><p>Notifiche entro 2 km, sempre.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-3">💝</span><div><b>Dona in 2 click</b><p>Storico donazioni e ricevuta fiscale.</p></div></div>
      </div>
    </div>
  );
}

function PreviewSitter() {
  return (
    <div className="preview-stack">
      <div className="preview-eyebrow">Anteprima profilo sitter</div>
      <div className="sitter-card" style={{cursor:'default'}}>
        <div className="sitter-top">
          <div className="sitter-av bg-grad-2">🌿</div>
          <div className="sitter-head">
            <h5>Marta L.</h5>
            <div className="meta"><Icon name="pin" size={11}/> Milano · Isola</div>
            <div className="sitter-rating"><span className="star"><Icon name="star" size={12}/></span>— · in attesa di servizi</div>
          </div>
        </div>
        <p className="sitter-bio">Educatrice cinofila, ho 2 cani e una casa con giardino.</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          <span className="tag tag-mute">In verifica</span>
          <span className="tag tag-mute">Pet first aid</span>
        </div>
        <div className="sitter-foot">
          <div><span className="sitter-price">€18</span><small> / notte</small></div>
          <button type="button" className="btn btn-primary" disabled style={{opacity:.6}}>Prenota</button>
        </div>
      </div>
      <div className="benefits">
        <div className="ben"><span className="bdot bg-grad-2">💼</span><div><b>Solo clienti seri</b><p>Profili utente verificati.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-3">🛡️</span><div><b>Coperti da assicurazione</b><p>Inclusa per ogni servizio MUSO.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-5">💸</span><div><b>Pagamento garantito</b><p>Niente fatture, riceviamo per te.</p></div></div>
      </div>
    </div>
  );
}

function PreviewShop() {
  return (
    <div className="preview-stack">
      <div className="preview-eyebrow">Anteprima vetrina</div>
      <div className="store-card" style={{cursor:'default'}}>
        <div className="store-banner" style={{background:'linear-gradient(135deg,#FFB59B,#FF8A66)',height:80}}></div>
        <div style={{position:'relative'}}><div className="store-logo" style={{width:48,height:48,fontSize:14,bottom:-12}}>A</div></div>
        <div className="store-body" style={{padding:'22px 16px 16px'}}>
          <h5>Arcaplanet — Buenos Aires</h5>
          <div className="store-meta">Pet shop · Milano · in verifica</div>
          <div className="store-foot"><span className="promo">La tua promo qui</span></div>
        </div>
      </div>
      <div className="benefits">
        <div className="ben"><span className="bdot bg-grad-1">📍</span><div><b>Visibilità geolocalizzata</b><p>Ti vedono solo gli utenti vicini.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-3">📣</span><div><b>Promozioni mirate</b><p>Pubblica offerte e ricevi richieste in chat.</p></div></div>
        <div className="ben"><span className="bdot bg-grad-5">📊</span><div><b>Statistiche reali</b><p>Visite, click, conversioni.</p></div></div>
      </div>
    </div>
  );
}

export default function ScreenJoin({ initialRole = 'user', go }) {
  const [role, setRole] = useState(initialRole);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { setRole(initialRole); }, [initialRole]);

  const Form    = role === 'sitter' ? FormSitter    : role === 'shop' ? FormShop    : FormUser;
  const Preview = role === 'sitter' ? PreviewSitter : role === 'shop' ? PreviewShop : PreviewUser;

  if (submitted) {
    const titles = { user:'Benvenuta nella rete MUSO.', sitter:'Profilo sitter inviato!', shop:'Vetrina in revisione.' };
    const descs = {
      user:"Il tuo profilo è attivo. Inizia da una segnalazione, un'adozione o una donazione.",
      sitter:'Il team MUSO verifica i documenti entro 24-48h. Riceverai una mail appena sei online.',
      shop:'Verifichiamo P.IVA e dati aziendali in 24-48h. Poi attiviamo la vetrina.'
    };
    return (
      <div className="content" style={{minHeight:'70vh',justifyContent:'center'}}>
        <div className="success-anim" style={{margin:'auto',maxWidth:520}}>
          <div className="ring"><Icon name="check" size={42}/></div>
          <h2 className="modal-title" style={{textAlign:'center'}}>{titles[role]}</h2>
          <p className="modal-desc" style={{textAlign:'center'}}>{descs[role]}</p>
          <div style={{display:'flex',gap:8,marginTop:20}}>
            <button className="btn btn-primary" onClick={() => go('home')}>Vai alla home <Icon name="arrow-right" size={14}/></button>
            <button className="btn" onClick={() => setSubmitted(false)}>Modifica dati</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Unisciti a <em>MUSO</em>.<br/>In che ruolo?</h1>
          <div className="sub">Tre profili, una rete sola. Cambia idea quando vuoi.</div>
        </div>
      </div>
      <div className="role-tabs">
        {ROLES.map(r => (
          <button key={r.id} type="button" className={"role-tab " + (role === r.id ? 'active' : '')} onClick={() => setRole(r.id)}>
            <span className="rt-emoji">{r.emoji}</span>
            <span className="rt-text"><span className="rt-label">{r.label}</span><span className="rt-desc">{r.desc}</span></span>
            <span className="rt-radio"></span>
          </button>
        ))}
      </div>
      <div className="join-layout">
        <form className="join-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
          <Form />
          <div className="form-foot">
            <button type="button" className="btn btn-ghost" onClick={() => go('home')}>Annulla</button>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:12,color:'var(--c-ink-mute)'}}>I tuoi dati sono crittografati e non condivisi con terzi.</span>
              <button type="submit" className="btn btn-primary">
                {role === 'user' ? 'Crea account' : role === 'sitter' ? 'Invia per la verifica' : 'Apri la vetrina'}
                <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </div>
        </form>
        <aside className="join-aside"><Preview /></aside>
      </div>
    </>
  );
}
