import { useState } from 'react';
import Icon from '../components/Icon';
import { Field, Toggle } from '../components/FormComponents';
import { SITTER_BADGES, SIZE_OPTS, SERVICE_OPTS, SHOP_LEVELS, SHOP_BADGES } from '../constants';
import { BookingFlow } from './ScreenDetails';
import { XPBar, ShopMissions } from './ScreenShop';

export function DetailSitterRich({ data, onBack }) {
  const [step, setStep] = useState(0);
  const [tab,  setTab]  = useState('profile');
  const [book, setBook] = useState({ service:'walking', from:'', to:'', pet:'cane' });

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
          <button className="btn"><Icon name="message" size={14}/> Scrivi un messaggio</button>
          <button className="btn btn-ghost"><Icon name="heart" size={14}/> Salva</button>
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
                <div style={{ fontSize:28, marginBottom:8 }}>⭐</div>
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

export function ShopOwner({ onBack }) {
  const [section, setSection] = useState('overview');

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
          {section === 'missions'  && <ShopMissions/>}
          {section === 'inbox'     && <InboxPanel/>}
          {(section === 'profile' || section === 'promos' || section === 'analytics' || section === 'plan') && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">{navItems.find(([v]) => v === section)?.[2]}</div>
              <p style={{ color:'var(--c-ink-soft)' }}>Sezione in costruzione — disponibile nella prossima versione.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function SitterOwner({ onBack }) {
  const [section, setSection] = useState('overview');

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
          {section === 'inbox' && <InboxPanel/>}
          {(section === 'profile' || section === 'calendar' || section === 'requests' || section === 'reviews' || section === 'payouts') && (
            <div className="card" style={{ padding:24 }}>
              <div className="card-h">{navItems.find(([v]) => v === section)?.[2]}</div>
              <p style={{ color:'var(--c-ink-soft)' }}>Sezione in costruzione — disponibile nella prossima versione.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
