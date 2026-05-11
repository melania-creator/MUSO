import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, Toggle } from '../components/FormComponents';
import { SITTER_BADGES, SIZE_OPTS, SERVICE_OPTS, SHOP_LEVELS, SHOP_BADGES } from '../constants';
import { BookingFlow } from './ScreenDetails';
import { XPBar, ShopMissions } from './ScreenShop';
import Toast, { useToast } from '../components/Toast';

export function DetailSitterRich({ data, onBack, go }) {
  const [step, setStep] = useState(0);
  const [tab,  setTab]  = useState('profile');
  const [book, setBook] = useState({ service:'walking', from:'', to:'', pet:'cane' });
  const [saved, setSaved] = useState(false);
  const [toastMsg, showToast] = useToast();

  if (step >= 1) return (
    <BookingFlow sitter={data} step={step} setStep={setStep} book={book} setBook={setBook} onBack={() => setStep(0)} />
  );

  const SERVICES_PRICES = [
    { v:'walking', i:'🚶', l:'Dog walking',    d:'60 min, due uscite/dì',       price:14,       unit:'/visita' },
    { v:'day',     i:'🌞', l:'Day care',        d:'7-10h presso il sitter',       price:22,       unit:'/giorno' },
    { v:'night',   i:'🌙', l:'Pernottamento',   d:'24h, foto/video frequenti',    price:data.rate, unit:'/notte' },
    { v:'cat',     i:'🐈', l:'Cat sitter',      d:'Visite a domicilio, 30-60 min',price:12,       unit:'/visita' },
  ].filter(s => data.services && data.services.includes(s.v));

  return (
    <>
      <div className="detail-head">
        <button className="btn btn-ghost" onClick={onBack}><Icon name="arrow-left" size={14}/> Indietro</button>
        <div className="dh-eyebrow">Pet sitter · {data.city} · {data.zone}</div>
        <h1 className="dh-title"><em>{data.name}</em></h1>
        <div className="dh-sub">{data.bio}</div>
        <div className="dh-tags">
          {data.badges.slice(0, 3).map(b => {
            const bd = SITTER_BADGES[b]; if (!bd) return null;
            return <span key={b} className={"tag " + (bd.cls === 'bd-mint' ? 'tag-mint' : bd.cls === 'bd-gold' ? 'tag-butter' : 'tag-mute')}>{bd.i} {bd.l}</span>;
          })}
        </div>
        <div className="dh-actions">
          <button className="btn btn-primary" onClick={() => setStep(1)}><Icon name="check" size={14}/> Prenota — €{data.rate}/notte</button>
          <button className="btn" onClick={() => { go ? go('msg') : showToast('💬 Vai alla sezione Messaggi per contattare ' + data.name.split(' ')[0]); }}>
            <Icon name="message" size={14}/> Scrivi un messaggio
          </button>
          <button className="btn btn-ghost" onClick={() => { setSaved(v => !v); showToast(saved ? '💔 Rimosso dai preferiti' : '❤️ ' + data.name.split(' ')[0] + ' salvato/a nei preferiti'); }}>
            <Icon name="heart" size={14}/> {saved ? 'Salvato ❤️' : 'Salva'}
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="card" style={{ padding:24, display:'flex', gap:20, alignItems:'center' }}>
            <div className={"sitter-av " + data.tone} style={{ width:96, height:96, fontSize:46, borderRadius:24, flexShrink:0 }}>{data.av}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', gap:14, alignItems:'baseline', flexWrap:'wrap' }}>
                <span className="sitter-rating" style={{ fontSize:18 }}><Icon name="star" size={16}/> {data.rating}</span>
                <span style={{ color:'var(--c-ink-soft)', fontSize:14 }}>{data.jobs} servizi · {data.exp} anni di esperienza</span>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:10 }}>
                {data.badges.map(b => {
                  const bd = SITTER_BADGES[b]; if (!bd) return null;
                  return <span key={b} className={"badge-pill " + bd.cls}>{bd.i} {bd.l}</span>;
                })}
              </div>
            </div>
          </div>

          <div className="ds-tabs">
            {[['profile','Profilo'],['skills','Competenze'],['calendar','Calendario'],['reviews','Recensioni'],['home','Casa']].map(([v, l]) => (
              <button key={v} className={"ds-tab " + (tab === v ? 'active' : '')} onClick={() => setTab(v)}>{l}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <>
              <div className="card" style={{ padding:24 }}>
                <div className="card-h">Servizi e tariffe</div>
                <div className="services-grid">
                  {SERVICES_PRICES.map(s => (
                    <div key={s.v} className="svc-row-rich">
                      <div className="svc-icn">{s.i}</div>
                      <div style={{ flex:1 }}><b>{s.l}</b><div className="meta">{s.d}</div></div>
                      <div className="svc-price"><span className="serif">€{s.price}</span><small>{s.unit}</small></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding:24 }}>
                <div className="card-h">Su {data.name.split(' ')[0]}</div>
                <p className="prose">{data.bio}</p>
                <dl className="kv-list" style={{ marginTop:14 }}>
                  <div><dt>Tempo di risposta</dt><dd>{data.response}</dd></div>
                  <div><dt>Esperienza</dt><dd>{data.exp} anni</dd></div>
                  <div><dt>Lingue</dt><dd>{data.langs?.join(', ')}</dd></div>
                  <div><dt>Giardino privato</dt><dd>{data.hasGarden ? 'Sì' : 'No'}</dd></div>
                  <div><dt>Taglie accettate</dt><dd>{data.sizes?.map(sz => SIZE_OPTS.find(o => o.v === sz)?.l).join(', ')}</dd></div>
                </dl>
              </div>
            </>
          )}

          {tab === 'skills' && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">Competenze veterinarie e cura</div>
              <div className="skill-grid">
                {data.skills?.map(s => <div key={s} className="skill-tile"><Icon name="check" size={14}/> <span>{s}</span></div>)}
              </div>
              {data.cert?.length > 0 && (
                <div style={{ marginTop:18 }}>
                  <div className="card-h">Certificazioni</div>
                  <div className="cert-list">
                    {data.cert.map((c, i) => (
                      <div key={i} className="cert-row">
                        <div className="cert-icn">🎓</div>
                        <div style={{ flex:1 }}><b>{c}</b><div className="meta">Verificato da MUSO</div></div>
                        <span className="tag tag-mint">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'calendar' && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">Disponibilità prossime 4 settimane</div>
              <div className="calendar-grid-big">
                {['L','M','M','G','V','S','D'].map(d => <div key={d} className="cgb-head">{d}</div>)}
                {Array.from({ length:28 }).map((_, i) => (
                  <div key={i} className="cgb-day free">{i + 1}</div>
                ))}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">{data.jobs} servizi · media {data.rating}★</div>
              <div style={{ padding:'32px 0', textAlign:'center', color:'var(--c-ink-mute)', fontSize:14 }}>
                Nessuna recensione ancora — sarà il primo sitter a riceverle.
              </div>
            </div>
          )}

          {tab === 'home' && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">Dove starà il tuo animale</div>
              <dl className="kv-list" style={{ marginTop:14 }}>
                <div><dt>Tipo abitazione</dt><dd>{{ apartment:'Appartamento', 'apt-balcony':'App. con balcone', 'house-garden':'Casa con giardino' }[data.home]}</dd></div>
                <div><dt>Spazio esterno</dt><dd>{data.hasGarden ? 'Giardino recintato' : 'Terrazzo / balcone'}</dd></div>
                <div><dt>Quartiere</dt><dd>{data.zone}, {data.city}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <aside className="detail-aside">
          <div className="card sticky-book">
            <div className="sb-price"><span className="serif">€{data.rate}</span><small>/notte</small></div>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} onClick={() => setStep(1)}>
              Prenota ora <Icon name="arrow-right" size={14}/>
            </button>
            <div className="sb-info">
              <div><Icon name="shield" size={13}/> Coperto da assicurazione MUSO</div>
              <div><Icon name="check"  size={13}/> Cancellazione gratuita 48h prima</div>
              <div><Icon name="check"  size={13}/> Pagamento trattenuto fino a fine servizio</div>
            </div>
          </div>
        </aside>
      </div>
      <Toast msg={toastMsg}/>
    </>
  );
}

function OwnerNav({ section, setSection, items }) {
  return (
    <aside className="owner-nav">
      {items.map(([v, i, l]) => (
        <button key={v} className={"on-link " + (section === v ? 'active' : '')} onClick={() => setSection(v)}>
          <span>{i}</span>{l}
        </button>
      ))}
    </aside>
  );
}

function InboxPanel() {
  return (
    <div className="card" style={{ padding:32, textAlign:'center', color:'var(--c-ink-mute)' }}>
      <div style={{ fontSize:32, marginBottom:10 }}>💬</div>
      <h4>Nessun messaggio ancora</h4>
      <p style={{ fontSize:13 }}>I messaggi dai clienti appariranno qui.</p>
    </div>
  );
}

function ShopProfilePanel({ onSave }) {
  const [form, setForm] = useState({ name:'', city:'', desc:'', phone:'', web:'' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="card" style={{ padding:24 }}>
      <div className="card-h">Profilo vetrina</div>
      <div style={{ display:'grid', gap:14, marginTop:8 }}>
        <Field label="Nome vetrina"><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="es. PetShop Roma Centro"/></Field>
        <Field label="Città"><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Roma"/></Field>
        <Field label="Descrizione"><textarea value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Cosa offre la tua vetrina..." style={{ minHeight:80 }}/></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="Telefono"><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+39 06 ..."/></Field>
          <Field label="Sito web"><input value={form.web} onChange={e => set('web', e.target.value)} placeholder="www.esempio.it"/></Field>
        </div>
      </div>
      <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
        <button className="btn btn-primary" onClick={() => onSave?.('✅ Profilo salvato!')}>
          <Icon name="check" size={14}/> Salva profilo
        </button>
      </div>
    </div>
  );
}

function PromosPanel({ onSave }) {
  const [promos, setPromos] = useState([]);
  const [form, setForm] = useState({ code:'', desc:'', disc:'' });
  const add = () => {
    if (!form.code) return;
    setPromos(p => [...p, form]);
    setForm({ code:'', desc:'', disc:'' });
    onSave?.('🎯 Promo aggiunta!');
  };
  return (
    <div style={{ display:'grid', gap:14 }}>
      <div className="card" style={{ padding:24 }}>
        <div className="card-h">Nuova promo</div>
        <div style={{ display:'grid', gap:12, marginTop:8 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <Field label="Codice sconto"><input value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} placeholder="MUSO10"/></Field>
            <Field label="Sconto (%)"><input type="number" min="1" max="100" value={form.disc} onChange={e => setForm(f => ({...f, disc: e.target.value}))} placeholder="10"/></Field>
          </div>
          <Field label="Descrizione"><input value={form.desc} onChange={e => setForm(f => ({...f, desc: e.target.value}))} placeholder="es. 10% su tutto il cibo per cani"/></Field>
        </div>
        <button className="btn btn-primary" style={{ marginTop:14 }} onClick={add}>
          <Icon name="plus-thin" size={14}/> Aggiungi promo
        </button>
      </div>
      {promos.length > 0 && (
        <div className="card" style={{ padding:24 }}>
          <div className="card-h">Promo attive</div>
          {promos.map((p, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--c-line)' }}>
              <span className="tag tag-mint" style={{ fontFamily:'monospace', fontSize:13 }}>{p.code}</span>
              <span style={{ flex:1, fontSize:13 }}>{p.desc}</span>
              <span style={{ fontWeight:700 }}>-{p.disc}%</span>
              <button className="btn btn-ghost" style={{ padding:'4px 8px' }} onClick={() => setPromos(ps => ps.filter((_, j) => j !== i))}>
                <Icon name="close" size={14}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsPanel() {
  const stats = [
    { label:'Visualizzazioni', value:'—', sub:'questo mese' },
    { label:'Click su promo', value:'—', sub:'questo mese' },
    { label:'XP guadagnati', value:'0', sub:'totale' },
    { label:'Donazioni ai rifugi', value:'€0', sub:'totale' },
  ];
  return (
    <div style={{ display:'grid', gap:14 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:12 }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ padding:20, textAlign:'center' }}>
            <div style={{ fontSize:28, fontWeight:700 }}>{s.value}</div>
            <div style={{ fontWeight:600, fontSize:13, marginTop:4 }}>{s.label}</div>
            <div style={{ fontSize:12, color:'var(--c-ink-mute)' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:24, textAlign:'center', color:'var(--c-ink-mute)' }}>
        <div style={{ fontSize:28, marginBottom:8 }}>📈</div>
        <div style={{ fontWeight:600, marginBottom:6 }}>Statistiche dettagliate in arrivo</div>
        <p style={{ fontSize:13, margin:0 }}>Completa il profilo e inizia ad accumulare dati per vedere grafici di visualizzazioni, conversioni e trend mensili.</p>
      </div>
    </div>
  );
}

function PlanPanel({ onSave }) {
  const [plan, setPlan] = useState('free');
  const plans = [
    { id:'free',    label:'Free',    price:'€0',   features:['Profilo base','Missioni gratuite','Max 1 promo attiva'] },
    { id:'starter', label:'Starter', price:'€9,99', features:['Tutto Free','3 promo attive','Statistiche base','Badge Starter'] },
    { id:'premium', label:'Premium', price:'€24,99', features:['Tutto Starter','Promo illimitate','Analytics completo','Boost in home','Badge Premium'] },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:14 }}>
      {plans.map(p => (
        <div key={p.id} className={"card " + (plan === p.id ? 'popular' : '')}
          style={{ padding:24, cursor:'pointer', border: plan === p.id ? '2px solid var(--c-accent)' : '' }}
          onClick={() => setPlan(p.id)}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
            <b style={{ fontSize:16 }}>{p.label}</b>
            <span style={{ fontSize:22, fontWeight:700 }}>{p.price}<small style={{ fontSize:12, fontWeight:400 }}>/mese</small></span>
          </div>
          <ul style={{ margin:0, padding:'0 0 0 18px', fontSize:13, color:'var(--c-ink-soft)', lineHeight:1.8 }}>
            {p.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button className={"btn " + (plan === p.id ? 'btn-primary' : '')}
            style={{ width:'100%', justifyContent:'center', marginTop:16 }}
            onClick={e => { e.stopPropagation(); setPlan(p.id); onSave?.('Piano ' + p.label + ' selezionato!'); }}>
            {plan === p.id ? '✓ Piano attivo' : 'Seleziona'}
          </button>
        </div>
      ))}
    </div>
  );
}

export function ShopOwner({ onBack }) {
  const [section, setSection] = useState('overview');
  const [toastMsg, showToast] = useToast();

  const navItems = [
    ['overview','📊','Panoramica'], ['profile','🏪','Profilo vetrina'],
    ['promos','🎯','Promo & coupon'], ['missions','🎮','Missioni & XP'],
    ['inbox','💬','Messaggi'], ['analytics','📈','Statistiche'], ['plan','💎','Piano & boost'],
  ];

  return (
    <>
      <div className="page-head" style={{ paddingBottom:14 }}>
        <div>
          <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom:10 }}>
            <Icon name="arrow-left" size={14}/> Torna a MUSO
          </button>
          <h1 style={{ margin:0 }}>Dashboard <em>vetrina</em></h1>
          <div className="sub">Gestisci profilo, promo, eventi e missioni in autonomia.</div>
        </div>
      </div>
      <div className="owner-layout">
        <OwnerNav section={section} setSection={setSection} items={navItems}/>
        <div className="owner-body">
          {section === 'overview' && (
            <div className="card" style={{ padding:32, textAlign:'center', color:'var(--c-ink-mute)' }}>
              <div style={{ fontSize:36, marginBottom:12 }}>📊</div>
              <h3>Dashboard in attesa</h3>
              <p>Completa il profilo vetrina per sbloccare statistiche, missioni e promo.</p>
              <button className="btn btn-primary" style={{ marginTop:12 }} onClick={() => setSection('profile')}>
                Completa il profilo
              </button>
            </div>
          )}
          {section === 'profile'   && <ShopProfilePanel onSave={showToast}/>}
          {section === 'promos'    && <PromosPanel onSave={showToast}/>}
          {section === 'missions'  && <ShopMissions/>}
          {section === 'inbox'     && <InboxPanel/>}
          {section === 'analytics' && <AnalyticsPanel/>}
          {section === 'plan'      && <PlanPanel onSave={showToast}/>}
        </div>
      </div>
      <Toast msg={toastMsg}/>
    </>
  );
}

/* ── SitterOwner sections ── */

function SitterProfilePanel({ onSave }) {
  const [form, setForm] = useState({ name:'', city:'', bio:'', phone:'', rate:'' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="card" style={{ padding:24 }}>
      <div className="card-h">Profilo personale</div>
      <div style={{ display:'grid', gap:14, marginTop:8 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="Nome e cognome"><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Mario Rossi"/></Field>
          <Field label="Città"><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Roma"/></Field>
        </div>
        <Field label="Bio"><textarea value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Presentati ai futuri clienti..." style={{ minHeight:80 }}/></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <Field label="Telefono"><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+39 ..."/></Field>
          <Field label="Tariffa notte (€)"><input type="number" value={form.rate} onChange={e => set('rate', e.target.value)} placeholder="25"/></Field>
        </div>
      </div>
      <div style={{ marginTop:18, display:'flex', justifyContent:'flex-end' }}>
        <button className="btn btn-primary" onClick={() => onSave?.('✅ Profilo aggiornato!')}>
          <Icon name="check" size={14}/> Salva profilo
        </button>
      </div>
    </div>
  );
}

function SitterCalendarPanel({ onSave }) {
  const days = Array.from({ length:28 }, (_, i) => i + 1);
  const [available, setAvailable] = useState(new Set());
  const toggle = d => {
    setAvailable(prev => { const s = new Set(prev); s.has(d) ? s.delete(d) : s.add(d); return s; });
  };
  return (
    <div className="card" style={{ padding:24 }}>
      <div className="card-h" style={{ marginBottom:8 }}>Disponibilità — tocca i giorni per selezionarli</div>
      <div style={{ fontSize:12, color:'var(--c-ink-mute)', marginBottom:16 }}>
        🟢 Verde = disponibile &nbsp;|&nbsp; Grigio = non disponibile
      </div>
      <div className="calendar-grid-big">
        {['L','M','M','G','V','S','D'].map(d => <div key={d} className="cgb-head">{d}</div>)}
        {days.map(d => (
          <div key={d}
            className={"cgb-day " + (available.has(d) ? 'free' : '')}
            style={{ cursor:'pointer', background: available.has(d) ? '#6DBF8A22' : undefined, fontWeight: available.has(d) ? 700 : undefined }}
            onClick={() => toggle(d)}>{d}</div>
        ))}
      </div>
      <div style={{ marginTop:16, display:'flex', justifyContent:'flex-end' }}>
        <button className="btn btn-primary" onClick={() => onSave?.('📅 Disponibilità salvata — ' + available.size + ' giorni selezionati')}>
          <Icon name="check" size={14}/> Salva disponibilità
        </button>
      </div>
    </div>
  );
}

function SitterRequestsPanel() {
  return (
    <div className="card" style={{ padding:32, textAlign:'center', color:'var(--c-ink-mute)' }}>
      <div style={{ fontSize:32, marginBottom:10 }}>📥</div>
      <h4>Nessuna prenotazione ancora</h4>
      <p style={{ fontSize:13 }}>Le richieste di prenotazione dai clienti appariranno qui con tutti i dettagli.</p>
    </div>
  );
}

function SitterReviewsPanel() {
  return (
    <div className="card" style={{ padding:32, textAlign:'center', color:'var(--c-ink-mute)' }}>
      <div style={{ fontSize:32, marginBottom:10 }}>⭐</div>
      <h4>Nessuna recensione ancora</h4>
      <p style={{ fontSize:13 }}>Dopo ogni servizio completato, i clienti possono lasciare una recensione. Apparirà qui.</p>
    </div>
  );
}

function SitterPayoutsPanel() {
  const rows = [
    { label:'Saldo disponibile', value:'€0,00', accent:true },
    { label:'In attesa (escrow)', value:'€0,00' },
    { label:'Totale guadagnato', value:'€0,00' },
  ];
  return (
    <div style={{ display:'grid', gap:14 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:12 }}>
        {rows.map((r, i) => (
          <div key={i} className="card" style={{ padding:20, textAlign:'center' }}>
            <div style={{ fontSize:26, fontWeight:700, color: r.accent ? 'var(--c-accent)' : undefined }}>{r.value}</div>
            <div style={{ fontSize:13, color:'var(--c-ink-soft)', marginTop:4 }}>{r.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:24 }}>
        <div className="card-h">Metodo di pagamento</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--c-line)', fontSize:14 }}>
          <span>🏦 IBAN — non configurato</span>
          <button className="btn" style={{ padding:'6px 12px' }}>Aggiungi IBAN</button>
        </div>
        <p style={{ fontSize:12, color:'var(--c-ink-mute)', marginTop:12 }}>I pagamenti vengono versati entro 48h dalla conferma di fine servizio. Commissione MUSO: 15%.</p>
      </div>
    </div>
  );
}

export function SitterOwner({ onBack }) {
  const [section, setSection] = useState('overview');
  const [toastMsg, showToast] = useToast();

  const navItems = [
    ['overview','📊','Panoramica'], ['profile','👤','Profilo personale'],
    ['calendar','📅','Disponibilità'], ['requests','📥','Prenotazioni'],
    ['inbox','💬','Messaggi'], ['reviews','⭐','Recensioni'], ['payouts','🏦','Pagamenti'],
  ];

  return (
    <>
      <div className="page-head" style={{ paddingBottom:14 }}>
        <div>
          <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom:10 }}>
            <Icon name="arrow-left" size={14}/> Torna a MUSO
          </button>
          <h1 style={{ margin:0 }}>Dashboard <em>sitter</em></h1>
          <div className="sub">Gestisci profilo, calendario, prenotazioni e tariffe.</div>
        </div>
      </div>
      <div className="owner-layout">
        <OwnerNav section={section} setSection={setSection} items={navItems}/>
        <div className="owner-body">
          {section === 'overview' && (
            <div className="card" style={{ padding:32, textAlign:'center', color:'var(--c-ink-mute)' }}>
              <div style={{ fontSize:36, marginBottom:12 }}>📊</div>
              <h3>Nessuna prenotazione ancora</h3>
              <p>Completa il profilo e le prime richieste inizieranno ad arrivare.</p>
              <button className="btn btn-primary" style={{ marginTop:12 }} onClick={() => setSection('profile')}>
                Completa il profilo
              </button>
            </div>
          )}
          {section === 'profile'   && <SitterProfilePanel onSave={showToast}/>}
          {section === 'calendar'  && <SitterCalendarPanel onSave={showToast}/>}
          {section === 'requests'  && <SitterRequestsPanel/>}
          {section === 'inbox'     && <InboxPanel/>}
          {section === 'reviews'   && <SitterReviewsPanel/>}
          {section === 'payouts'   && <SitterPayoutsPanel/>}
        </div>
      </div>
      <Toast msg={toastMsg}/>
    </>
  );
}
