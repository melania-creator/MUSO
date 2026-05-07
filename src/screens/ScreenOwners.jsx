import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, Toggle } from '../components/FormComponents';
import { SITTERS, SITTER_BADGES, SIZE_OPTS, SERVICE_OPTS, STORES, SHOP_LEVELS, SHOP_BADGES } from '../constants';
import { BookingFlow } from './ScreenDetails';
import { XPBar, ShopMissions } from './ScreenShop';

export function DetailSitterRich({ data, onBack }) {
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState('profile');
  const [book, setBook] = useState({ service:'walking', from:'', to:'', pet:'cane' });

  if (step >= 1) return <BookingFlow sitter={data} step={step} setStep={setStep} book={book} setBook={setBook} onBack={() => setStep(0)} />;

  const SERVICES_PRICES = [
    {v:'walking',i:'🚶',l:'Dog walking',d:'60 min, due uscite/dì',price:14,unit:'/visita'},
    {v:'day',i:'🌞',l:'Day care',d:'7-10h presso il sitter',price:22,unit:'/giorno'},
    {v:'night',i:'🌙',l:'Pernottamento',d:'24h, foto/video frequenti',price:data.rate,unit:'/notte'},
    {v:'cat',i:'🐈',l:'Cat sitter',d:'Visite a domicilio, 30-60 min',price:12,unit:'/visita'},
  ].filter(s => data.services && data.services.includes(s.v));

  return (
    <>
      <div className="detail-head">
        <button className="btn btn-ghost" onClick={onBack}><Icon name="arrow-left" size={14}/> Indietro</button>
        <div className="dh-eyebrow">Pet sitter · {data.city} · {data.zone}</div>
        <h1 className="dh-title"><em>{data.name}</em></h1>
        <div className="dh-sub">{data.bio}</div>
        <div className="dh-tags">
          {data.badges.slice(0,3).map(b => {
            const bd = SITTER_BADGES[b]; if (!bd) return null;
            return <span key={b} className={"tag " + (bd.cls === 'bd-mint' ? 'tag-mint' : bd.cls === 'bd-gold' ? 'tag-butter' : 'tag-mute')}>{bd.i} {bd.l}</span>;
          })}
        </div>
        <div className="dh-actions">
          <button className="btn btn-primary" onClick={() => setStep(1)}><Icon name="check" size={14}/> Prenota — €{data.rate}/notte</button>
          <button className="btn"><Icon name="message" size={14}/> Scrivi un messaggio</button>
          <button className="btn btn-ghost"><Icon name="heart" size={14}/> Salva</button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="card" style={{padding:24,display:'flex',gap:20,alignItems:'center'}}>
            <div className={"sitter-av " + data.tone} style={{width:96,height:96,fontSize:46,borderRadius:24,flexShrink:0}}>{data.av}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',gap:14,alignItems:'baseline',flexWrap:'wrap'}}>
                <span className="sitter-rating" style={{fontSize:18}}><Icon name="star" size={16}/> {data.rating}</span>
                <span style={{color:'var(--c-ink-soft)',fontSize:14}}>{data.jobs} servizi · {data.exp} anni di esperienza</span>
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                {data.badges.map(b => {
                  const bd = SITTER_BADGES[b]; if (!bd) return null;
                  return <span key={b} className={"badge-pill " + bd.cls}>{bd.i} {bd.l}</span>;
                })}
              </div>
            </div>
          </div>

          <div className="ds-tabs">
            {[['profile','Profilo'],['skills','Competenze'],['calendar','Calendario'],['reviews','Recensioni'],['home','Casa']].map(([v,l]) => (
              <button key={v} className={"ds-tab " + (tab===v?'active':'')} onClick={() => setTab(v)}>{l}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <>
              <div className="card" style={{padding:24}}>
                <div className="card-h">Servizi e tariffe</div>
                <div className="services-grid">
                  {SERVICES_PRICES.map(s => (
                    <div key={s.v} className="svc-row-rich">
                      <div className="svc-icn">{s.i}</div>
                      <div style={{flex:1}}><b>{s.l}</b><div className="meta">{s.d}</div></div>
                      <div className="svc-price"><span className="serif">€{s.price}</span><small>{s.unit}</small></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{padding:24}}>
                <div className="card-h">Su {data.name.split(' ')[0]}</div>
                <p className="prose">{data.bio}</p>
                <dl className="kv-list" style={{marginTop:14}}>
                  <div><dt>Tempo di risposta</dt><dd>{data.response}</dd></div>
                  <div><dt>Esperienza</dt><dd>{data.exp} anni</dd></div>
                  <div><dt>Lingue</dt><dd>{data.langs.join(', ')}</dd></div>
                  <div><dt>Giardino privato</dt><dd>{data.hasGarden ? 'Sì' : 'No'}</dd></div>
                  <div><dt>Taglie accettate</dt><dd>{data.sizes.map(sz => SIZE_OPTS.find(o=>o.v===sz)?.l).join(', ')}</dd></div>
                </dl>
              </div>
            </>
          )}

          {tab === 'skills' && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">Competenze veterinarie e cura</div>
              <div className="skill-grid">
                {data.skills.map(s => <div key={s} className="skill-tile"><Icon name="check" size={14}/> <span>{s}</span></div>)}
              </div>
              {data.cert.length > 0 && (
                <div style={{marginTop:18}}>
                  <div className="card-h">Certificazioni</div>
                  <div className="cert-list">
                    {data.cert.map((c, i) => (
                      <div key={i} className="cert-row">
                        <div className="cert-icn">🎓</div>
                        <div style={{flex:1}}><b>{c}</b><div className="meta">Verificato da MUSO</div></div>
                        <span className="tag tag-mint">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'calendar' && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">Disponibilità prossime 4 settimane</div>
              <div className="calendar-grid-big">
                {['L','M','M','G','V','S','D'].map(d => <div key={d} className="cgb-head">{d}</div>)}
                {Array.from({length:28}).map((_,i) => {
                  const busy = [3,4,12,13,14,22].includes(i);
                  return <div key={i} className={"cgb-day " + (busy?'busy':'free')}>{i+1}</div>;
                })}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">{data.jobs} recensioni · media {data.rating}★</div>
              <div className="reviews" style={{marginTop:18}}>
                {[{av:'EM',cl:'av-peach',n:'Elisa M.',d:'3 sett. fa · Pernottamento',r:5,t:'Affidabilità totale. Ha mandato foto ogni giorno.'},{av:'RC',cl:'av-lav',n:'Roberto C.',d:'1 mese fa · Day care',r:5,t:'Professionale, paziente, il cane si è ambientato subito.'}].map((r,i) => (
                  <div key={i} className="rev">
                    <div className="rev-head"><div className={"av " + r.cl}>{r.av}</div><div><b>{r.n}</b><div className="meta">{r.d}</div></div><div className="sitter-rating" style={{marginLeft:'auto'}}><Icon name="star" size={12}/> {r.r}.0</div></div>
                    <p>{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'home' && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">Dove starà il tuo animale</div>
              <dl className="kv-list" style={{marginTop:14}}>
                <div><dt>Tipo abitazione</dt><dd>{{apartment:'Appartamento','apt-balcony':'App. con balcone','house-garden':'Casa con giardino'}[data.home]}</dd></div>
                <div><dt>Spazio esterno</dt><dd>{data.hasGarden ? 'Giardino recintato 80mq' : 'Terrazzo / balcone'}</dd></div>
                <div><dt>Quartiere</dt><dd>{data.zone}, {data.city}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <aside className="detail-aside">
          <div className="card sticky-book">
            <div className="sb-price"><span className="serif">€{data.rate}</span><small>/notte</small></div>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={() => setStep(1)}>Prenota ora <Icon name="arrow-right" size={14}/></button>
            <div className="sb-info">
              <div><Icon name="shield" size={13}/> Coperto da assicurazione MUSO</div>
              <div><Icon name="check" size={13}/> Cancellazione gratuita 48h prima</div>
              <div><Icon name="check" size={13}/> Pagamento trattenuto fino a fine servizio</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function OwnerNav({ section, setSection, items }) {
  return (
    <aside className="owner-nav">
      {items.map(([v,i,l]) => (
        <button key={v} className={"on-link " + (section===v?'active':'')} onClick={() => setSection(v)}>
          <span>{i}</span>{l}
        </button>
      ))}
    </aside>
  );
}

export function ShopOwner({ onBack }) {
  const [section, setSection] = useState('overview');
  const me = STORES[1];

  const navItems = [
    ['overview','📊','Panoramica'],['profile','🏪','Profilo vetrina'],
    ['promos','🎯','Promo & coupon'],['missions','🎮','Missioni & XP'],
    ['inbox','💬','Messaggi'],['analytics','📈','Statistiche'],['plan','💎','Piano & boost'],
  ];

  return (
    <>
      <div className="page-head" style={{paddingBottom:14}}>
        <div>
          <button className="btn btn-ghost" onClick={onBack} style={{marginBottom:10}}><Icon name="arrow-left" size={14}/> Torna a MUSO</button>
          <h1 style={{margin:0}}>Dashboard <em>{me.brand}</em></h1>
          <div className="sub">Gestisci profilo, promo, eventi e missioni in autonomia.</div>
        </div>
        <div className="ph-actions">
          <span className="lv-chip" style={{background:SHOP_LEVELS[me.level-1].color,position:'static'}}>Lv.{me.level} · {SHOP_LEVELS[me.level-1].name}</span>
          <span className="tag tag-mint">🔥 {me.streak}gg</span>
        </div>
      </div>
      <div className="owner-layout">
        <OwnerNav section={section} setSection={setSection} items={navItems}/>
        <div className="owner-body">
          {section === 'overview' && (
            <>
              <div className="card dash-hero">
                <div className="dash-logo" style={{background:me.banner}}>{me.logo}</div>
                <div style={{flex:1}}>
                  <h2 style={{fontFamily:'var(--font-display)',fontSize:32,margin:'0 0 10px'}}>{me.brand}</h2>
                  <XPBar xp={me.xp} level={me.level}/>
                </div>
              </div>
              <div className="grid-2" style={{marginTop:16}}>
                <div className="card" style={{padding:22}}>
                  <div className="card-h">I tuoi badge ({me.badges.length}/{SHOP_BADGES.length})</div>
                  <div className="badge-grid">
                    {SHOP_BADGES.map(b => {
                      const owned = me.badges.includes(b.id);
                      return <div key={b.id} className={"badge-tile " + (owned?'owned':'locked')}><div className={"badge-emoji " + b.cls}>{owned?b.i:'🔒'}</div><div className="badge-name">{b.l}</div></div>;
                    })}
                  </div>
                </div>
                <div className="card" style={{padding:22}}>
                  <div className="card-h">Statistiche del mese</div>
                  <div className="stat-grid">
                    <div className="stat-tile"><div className="sv">2.847</div><div className="sl">visite</div></div>
                    <div className="stat-tile"><div className="sv">192</div><div className="sl">click promo</div></div>
                    <div className="stat-tile"><div className="sv">38</div><div className="sl">messaggi</div></div>
                    <div className="stat-tile"><div className="sv">12</div><div className="sl">prenotazioni</div></div>
                  </div>
                </div>
              </div>
            </>
          )}
          {section === 'missions' && <ShopMissions/>}
          {section === 'inbox' && <InboxPanel/>}
          {section === 'analytics' && <AnalyticsPanel/>}
          {section === 'plan' && <PlanPanel/>}
          {(section === 'profile' || section === 'promos') && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">{section === 'profile' ? 'Identità vetrina' : 'Promo & coupon'}</div>
              <p style={{color:'var(--c-ink-soft)'}}>Sezione in costruzione — disponibile nella prossima versione.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function SitterOwner({ onBack }) {
  const [section, setSection] = useState('overview');
  const me = SITTERS[2];

  const navItems = [
    ['overview','📊','Panoramica'],['profile','👤','Profilo personale'],
    ['calendar','📅','Disponibilità'],['requests','📥','Prenotazioni'],
    ['inbox','💬','Messaggi'],['reviews','⭐','Recensioni'],['payouts','🏦','Pagamenti'],
  ];

  const bookings = [
    {n:'Brando · Labrador',who:'Elisa M.',svc:'Pernottamento 3 notti',date:'15-18 Mag',amount:66,status:'pending'},
    {n:'Mia · Europeo',who:'Roberto C.',svc:'Cat sitting · 5 visite',date:'20-24 Mag',amount:60,status:'confirmed'},
    {n:'Pepe · Beagle',who:'Federica T.',svc:'Day care',date:'oggi',amount:22,status:'today'},
  ];

  return (
    <>
      <div className="page-head" style={{paddingBottom:14}}>
        <div>
          <button className="btn btn-ghost" onClick={onBack} style={{marginBottom:10}}><Icon name="arrow-left" size={14}/> Torna a MUSO</button>
          <h1 style={{margin:0}}>Ciao, <em>{me.name.split(' ')[0]}</em></h1>
          <div className="sub">Gestisci profilo, calendario, prenotazioni e tariffe.</div>
        </div>
        <div className="ph-actions">
          <span className="tag tag-mint">⭐ {me.rating}</span>
          <span className="tag tag-mute">{me.jobs} servizi</span>
        </div>
      </div>
      <div className="owner-layout">
        <OwnerNav section={section} setSection={setSection} items={navItems}/>
        <div className="owner-body">
          {section === 'overview' && (
            <>
              <div className="card dash-hero">
                <div className={"dash-logo " + me.tone}>{me.av}</div>
                <div style={{flex:1}}>
                  <h2 style={{fontFamily:'var(--font-display)',fontSize:32,margin:'0 0 6px'}}>{me.name}</h2>
                  <div className="meta">{me.city} · {me.zone} · risposta {me.response}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:10}}>
                    {me.badges.map(b => { const bd = SITTER_BADGES[b]; if (!bd) return null; return <span key={b} className={"badge-pill " + bd.cls}>{bd.i} {bd.l}</span>; })}
                  </div>
                </div>
              </div>
              <div className="grid-2" style={{marginTop:16}}>
                <div className="card" style={{padding:22}}>
                  <div className="card-h">Questo mese</div>
                  <div className="stat-grid">
                    <div className="stat-tile"><div className="sv">8</div><div className="sl">prenotazioni</div></div>
                    <div className="stat-tile"><div className="sv">€1.240</div><div className="sl">guadagnato</div></div>
                    <div className="stat-tile"><div className="sv">89%</div><div className="sl">tasso risposta</div></div>
                    <div className="stat-tile"><div className="sv">4.9★</div><div className="sl">rating medio</div></div>
                  </div>
                </div>
                <div className="card" style={{padding:22}}>
                  <div className="card-h">Prossime prenotazioni</div>
                  <div className="item-list">
                    {bookings.slice(0,3).map((b,i) => (
                      <div key={i} className="item-row">
                        <div className="item-icn">🐕</div>
                        <div style={{flex:1}}><b>{b.n}</b><div className="meta">{b.who} · {b.svc} · {b.date}</div></div>
                        <span className="serif" style={{fontSize:18}}>€{b.amount}</span>
                        {b.status==='pending' && <button className="btn btn-primary" style={{padding:'6px 12px'}}>Accetta</button>}
                        {b.status==='confirmed' && <span className="tag tag-mint">Confermata</span>}
                        {b.status==='today' && <span className="tag tag-butter">Oggi</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {section === 'inbox' && <InboxPanel/>}
          {section === 'payouts' && <PayoutsPanel/>}
          {(section === 'profile' || section === 'calendar' || section === 'requests' || section === 'reviews') && (
            <div className="card" style={{padding:24}}>
              <div className="card-h">{navItems.find(([v])=>v===section)?.[2]}</div>
              <p style={{color:'var(--c-ink-soft)'}}>Sezione in costruzione — disponibile nella prossima versione.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function InboxPanel() {
  const msgs = [
    {who:'Elisa M.',av:'EM',last:'Ottimo, ci vediamo venerdì alle 18!',time:'2 min',unread:true},
    {who:'Roberto C.',av:'RC',last:'Posso fare una visita conoscitiva sabato?',time:'1h',unread:true},
    {who:'ENPA Milano',av:'EM',last:'Confermiamo la giornata adozione del 18.',time:'ieri',unread:false},
  ];
  return (
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div className="ow-head" style={{padding:'18px 24px'}}>
        <div className="card-h" style={{margin:0}}>Messaggi ({msgs.filter(m=>m.unread).length} non letti)</div>
      </div>
      <div className="inbox-list">
        {msgs.map((m,i) => (
          <div key={i} className={"inbox-row " + (m.unread?'unread':'')}>
            <div className="av av-mint">{m.av}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:10}}><b>{m.who}</b><span className="meta">{m.time}</span></div>
              <div className="meta" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.last}</div>
            </div>
            {m.unread && <span className="dot-unread"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="card" style={{padding:24}}>
      <div className="card-h">Andamento ultimi 30 giorni</div>
      <div className="chart-bars">
        {[40,55,32,68,82,71,90,62,55,78,88,95,72,80,68,92,85,77,98,82,70,88,75,84,90,96,88,92,80,87].map((h,i) => (
          <div key={i} className="cb" style={{height: h + '%'}}></div>
        ))}
      </div>
    </div>
  );
}

function PlanPanel() {
  return (
    <div className="card" style={{padding:24}}>
      <div className="card-h">Il tuo piano</div>
      <div className="plan-now">
        <div><div className="meta">Piano attuale</div><div style={{fontFamily:'var(--font-display)',fontSize:32}}>Pro · <em>€19/mese</em></div></div>
        <button className="btn btn-primary">Upgrade a Premium</button>
      </div>
    </div>
  );
}

function PayoutsPanel() {
  return (
    <div className="card" style={{padding:24}}>
      <div className="card-h">Saldo e prossimo accredito</div>
      <div className="payouts-hero">
        <div>
          <div className="meta">Saldo attuale</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:42}}>€340<small style={{fontSize:18}}>,00</small></div>
          <div className="meta">Prossimo accredito · <b>9 Maggio</b> su IBAN ••••8821</div>
        </div>
        <button className="btn btn-primary">Preleva ora</button>
      </div>
    </div>
  );
}
