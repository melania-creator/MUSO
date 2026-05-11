import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import { FormSection, Field, CheckTile, Toggle } from '../components/FormComponents';
import LegalModal from '../components/LegalModal';
import Toast, { useToast } from '../components/Toast';

const ROLES = [
  { id:'user',    label:'Utente',     emoji:'👤', desc:'Adotto, dono, segnalo SOS' },
  { id:'sitter',  label:'Pet Sitter', emoji:'🌿', desc:'Offro servizi di cura' },
  { id:'rifugio', label:'Rifugio',    emoji:'🏠', desc:'Associazione, canile, gattile — gratuito' },
  { id:'shop',    label:'Vetrina',    emoji:'🏬', desc:'Pet shop, brand, veterinari' },
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

function UploadRow({ label, optional, showToast }) {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const handleChange = e => {
    const f = e.target.files?.[0];
    if (f) { setFile(f.name); showToast?.('📎 File caricato: ' + f.name); }
  };
  return (
    <div className="upload-row">
      <Icon name="shield" size={16}/>
      <span><b>{label}</b>{optional && ' — opzionale'}</span>
      {file && <span style={{ fontSize:12, color:'var(--c-ink-mute)', marginLeft:4 }}>✓ {file}</span>}
      <input ref={ref} type="file" accept="image/*,.pdf" style={{ display:'none' }} onChange={handleChange}/>
      <button type="button" className="btn" style={{ marginLeft:'auto' }} onClick={() => ref.current?.click()}>
        <Icon name="camera" size={14}/> {file ? 'Cambia' : 'Carica'}
      </button>
    </div>
  );
}

function FormUser({ onLegal }) {
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
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Accetto i <a href="#" onClick={e=>{e.preventDefault();onLegal?.('termini')}}>Termini di servizio</a> e l'<a href="#" onClick={e=>{e.preventDefault();onLegal?.('privacy')}}>Informativa privacy</a>.</span></label>
        <label className="check-row"><input type="checkbox" /><span>Ricevi la newsletter MUSO (storie di adozioni, novità, una a settimana).</span></label>
      </FormSection>
    </>
  );
}

function FormSitter({ onLegal, showToast }) {
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
        <UploadRow label="Documento d'identità" required showToast={showToast}/>
        <UploadRow label="Certificazioni" optional showToast={showToast}/>
        <label className="check-row mt-3"><input type="checkbox" defaultChecked /><span>Accetto i <a href="#" onClick={e=>{e.preventDefault();onLegal?.('sitter')}}>Termini per i sitter</a> e il <a href="#" onClick={e=>{e.preventDefault();onLegal?.('etico')}}>Codice etico MUSO</a>.</span></label>
      </FormSection>
    </>
  );
}

const RIFUGIO_TYPES = [
  { id:'canile-mun',  icon:'🏛️', label:'Canile municipale', desc:'Struttura pubblica' },
  { id:'canile-priv', icon:'🏠', label:'Canile privato',     desc:'Struttura privata' },
  { id:'gattile',     icon:'🐈', label:'Gattile',            desc:'Colonie e adozioni' },
  { id:'assoc',       icon:'🤝', label:'Associazione',       desc:'No-profit, APS, ODV' },
  { id:'recupero',    icon:'🌿', label:'Centro recupero',    desc:'Fauna selvatica' },
  { id:'altro',       icon:'❓', label:'Altro',              desc:'Altra tipologia' },
];

function FormRifugio({ onLegal }) {
  const [tipo, setTipo] = useState('assoc');
  const [animali, setAnimali] = useState({ cani:true, gatti:true, piccoli:false, esotici:false });
  return (
    <>
      <div style={{
        display:'flex', alignItems:'center', gap:12,
        background:'linear-gradient(135deg,#F0FBF4,#E6F7ED)',
        border:'2px solid #6DBF8A', borderRadius:14,
        padding:'14px 18px', marginBottom:24,
      }}>
        <span style={{ fontSize:28 }}>🎁</span>
        <div>
          <div style={{ fontWeight:700, fontSize:15, color:'#2A7A4A' }}>Gratuito per sempre</div>
          <div style={{ fontSize:13, color:'#3A8A5C', marginTop:2 }}>
            MUSO è completamente gratuito per tutti i rifugi e le associazioni. Nessun piano, nessuna carta.
          </div>
        </div>
      </div>

      <FormSection num="1" title="Il rifugio" desc="I dati che appariranno sul tuo profilo pubblico.">
        <div className="field-grid">
          <Field label="Nome rifugio" required span="2"><input placeholder="Rifugio del Sole" /></Field>
          <Field label="Email" required><input type="email" placeholder="info@rifugioxx.it" /></Field>
          <Field label="Telefono" required><input placeholder="+39 06 1234567" /></Field>
          <Field label="Città" required><input placeholder="Roma" /></Field>
          <Field label="Indirizzo" required><input placeholder="Via degli Animali 12" /></Field>
        </div>
      </FormSection>

      <FormSection num="2" title="Tipo di struttura">
        <div className="check-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
          {RIFUGIO_TYPES.map(t => (
            <CheckTile key={t.id} icon={t.icon} label={t.label} desc={t.desc}
              checked={tipo === t.id} onChange={() => setTipo(t.id)} />
          ))}
        </div>
      </FormSection>

      <FormSection num="3" title="Animali ospitati" desc="Quali specie accogliete?">
        <div className="check-grid" style={{ gridTemplateColumns:'repeat(2,1fr)' }}>
          <CheckTile icon="🐕" label="Cani"           checked={animali.cani}    onChange={v => setAnimali({...animali, cani:v})} />
          <CheckTile icon="🐈" label="Gatti"          checked={animali.gatti}   onChange={v => setAnimali({...animali, gatti:v})} />
          <CheckTile icon="🐰" label="Piccoli animali" checked={animali.piccoli} onChange={v => setAnimali({...animali, piccoli:v})} />
          <CheckTile icon="🦜" label="Esotici"        checked={animali.esotici} onChange={v => setAnimali({...animali, esotici:v})} />
        </div>
        <div className="field-grid" style={{ marginTop:12 }}>
          <Field label="Numero medio animali ospitati" hint="Dato indicativo"><input type="number" placeholder="Es: 45" /></Field>
          <Field label="Posti disponibili ora"><input type="number" placeholder="Es: 8" /></Field>
        </div>
      </FormSection>

      <FormSection num="4" title="Profilo pubblico" desc="Come ti presenterai agli utenti.">
        <div className="field-grid">
          <Field label="Sito web" span="2"><input placeholder="https://rifugioxx.it" /></Field>
          <Field label="Descrizione" hint="Max 300 caratteri" span="2">
            <textarea placeholder="Siamo un'associazione no-profit fondata nel 2010. Ogni anno salviamo oltre 200 animali…" />
          </Field>
        </div>
      </FormSection>

      <FormSection num="5" title="Documenti" desc="Per la verifica ufficiale (24-48h).">
        <div className="field-grid">
          <Field label="Codice fiscale associazione" required span="2"><input placeholder="9712345678" /></Field>
          <Field label="Atto costitutivo / iscrizione registro" required span="2">
            <input type="file" accept=".pdf,.jpg,.png" />
          </Field>
        </div>
      </FormSection>

      <FormSection num="6" title="Conferma">
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Confermo che i dati sono veritieri e che la struttura è regolarmente registrata.</span></label>
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Accetto i <a href="#" onClick={e=>{e.preventDefault();onLegal?.('termini')}}>Termini di servizio</a> e il <a href="#" onClick={e=>{e.preventDefault();onLegal?.('etico')}}>Codice etico MUSO</a>.</span></label>
      </FormSection>
    </>
  );
}

function PreviewRifugio() {
  return (
    <div className="preview-stack">
      <div className="preview-eyebrow">Anteprima profilo rifugio</div>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ height:60, background:'linear-gradient(135deg,#6DBF8A,#3A9A6A)' }} />
        <div style={{ padding:'0 18px 18px', marginTop:-22 }}>
          <div className="avatar" style={{ width:48, height:48, fontSize:22, background:'#6DBF8A', border:'3px solid white', display:'grid', placeItems:'center' }}>🏠</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:20, marginTop:8 }}>Rifugio del Sole</div>
          <div style={{ fontSize:12, color:'var(--c-ink-mute)', marginBottom:8 }}>Roma · Associazione · in verifica</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            <span className="tag tag-mint">🐕 Cani</span>
            <span className="tag tag-mint">🐈 Gatti</span>
            <span className="tag" style={{ background:'#E6F7ED', color:'#2A7A4A', fontWeight:700 }}>✓ Gratuito</span>
          </div>
        </div>
      </div>
      <div className="benefits">
        <div className="ben"><span className="bdot" style={{ background:'#6DBF8A' }}>🎁</span><div><b>Zero costi per sempre</b><p>Nessun piano, nessuna carta di credito.</p></div></div>
        <div className="ben"><span className="bdot" style={{ background:'#6BAED6' }}>📣</span><div><b>Visibilità su tutta la rete</b><p>I tuoi animali appaiono nelle adozioni.</p></div></div>
        <div className="ben"><span className="bdot" style={{ background:'#D4318A' }}>💝</span><div><b>Donazioni dirette</b><p>Gli utenti possono donarti cibo e medicine.</p></div></div>
      </div>
    </div>
  );
}

function FormShop({ onLegal }) {
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
        <label className="check-row"><input type="checkbox" defaultChecked /><span>Accetto le <a href="#" onClick={e=>{e.preventDefault();onLegal?.('partner')}}>Condizioni partner</a> e il <a href="#" onClick={e=>{e.preventDefault();onLegal?.('etico')}}>Codice etico MUSO</a>.</span></label>
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
  const [legalDoc, setLegalDoc] = useState(null);
  const [toastMsg, showToast] = useToast();
  useEffect(() => { setRole(initialRole); }, [initialRole]);

  const Form    = role === 'sitter' ? FormSitter    : role === 'rifugio' ? FormRifugio    : role === 'shop' ? FormShop    : FormUser;
  const Preview = role === 'sitter' ? PreviewSitter : role === 'rifugio' ? PreviewRifugio : role === 'shop' ? PreviewShop : PreviewUser;

  if (submitted) {
    const titles = { user:'Benvenuta nella rete MUSO.', sitter:'Profilo sitter inviato!', rifugio:'Rifugio registrato!', shop:'Vetrina in revisione.' };
    const descs = {
      user:"Il tuo profilo è attivo. Inizia da una segnalazione, un'adozione o una donazione.",
      sitter:'Il team MUSO verifica i documenti entro 24-48h. Riceverai una mail appena sei online.',
      rifugio:'Verifichiamo i documenti entro 24-48h. Il profilo del rifugio è gratuito per sempre — nessun costo, mai.',
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
          <div className="sub">Quattro profili, una rete sola. I rifugi entrano sempre gratis.</div>
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
          <Form onLegal={setLegalDoc} showToast={showToast} />
          <div className="form-foot">
            <button type="button" className="btn btn-ghost" onClick={() => go('home')}>Annulla</button>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <span style={{fontSize:12,color:'var(--c-ink-mute)'}}>I tuoi dati sono crittografati e non condivisi con terzi.</span>
              <button type="submit" className="btn btn-primary">
                {role === 'user' ? 'Crea account' : role === 'sitter' ? 'Invia per la verifica' : role === 'rifugio' ? 'Registra il rifugio' : 'Apri la vetrina'}
                <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </div>
        </form>
        <aside className="join-aside"><Preview /></aside>
      </div>
      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)}/>}
      <Toast msg={toastMsg}/>
    </>
  );
}
