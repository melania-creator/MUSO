import { useState } from 'react';
import Icon from '../components/Icon';
import { STORES, SHOP_LEVELS, SHOP_BADGES } from '../constants';

export function XPBar({ xp, level, compact }) {
  const cur = SHOP_LEVELS[level - 1];
  const next = SHOP_LEVELS[level] || cur;
  const pct = Math.round(((xp - cur.min) / (next.max - cur.min)) * 100);
  return (
    <div className={"xp-bar " + (compact ? 'compact' : '')}>
      <div className="xp-meta">
        <span><b>{xp.toLocaleString('it-IT')}</b> XP</span>
        {!compact && <span>Lv. {level} → {level+1}</span>}
        <span>{next.max - xp} al prossimo livello</span>
      </div>
      <div className="xp-track">
        <div className="xp-fill" style={{width: pct + '%', background:cur.color}}></div>
      </div>
    </div>
  );
}

function Leaderboard() {
  const sorted = [...STORES].sort((a,b) => b.xp - a.xp);
  return (
    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <div className="lb-head">
        <div>
          <h3 style={{margin:0, fontFamily:'var(--font-display)', fontSize:28}}><em>Classifica mensile</em></h3>
          <div style={{fontSize:13, color:'var(--c-ink-soft)'}}>Top 3 vincono visibilità extra in home la settimana successiva.</div>
        </div>
        <select className="sort"><option>Tutta Italia</option><option>La mia zona</option></select>
      </div>
      <div className="lb-list">
        {sorted.map((s, i) => (
          <div key={i} className={"lb-row " + (i < 3 ? 'lb-top' : '')}>
            <span className="lb-rank">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1)}</span>
            <div className="lb-logo" style={{background: s.banner}}>{s.logo}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <b>{s.brand}</b>
                <span className="lv-chip-mini" style={{background:SHOP_LEVELS[s.level-1].color}}>Lv.{s.level}</span>
              </div>
              <div className="meta">{s.cat} · {s.reviews} recensioni · 🔥 {s.streak}gg</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:22}}>{s.xp.toLocaleString('it-IT')}</div>
              <div className="meta">XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopDashboard() {
  const me = STORES[1];
  return (
    <div className="dash-grid">
      <div className="card dash-hero">
        <div className="dash-logo" style={{background: me.banner}}>{me.logo}</div>
        <div style={{flex:1}}>
          <div className="card-h" style={{margin:0}}>La tua vetrina</div>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:36,margin:'4px 0 8px'}}>{me.brand}</h2>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <span className="lv-chip" style={{background:SHOP_LEVELS[me.level-1].color}}>Lv.{me.level} · {SHOP_LEVELS[me.level-1].name}</span>
            <span className="tag tag-mute">Piano {me.plan}</span>
            <span className="tag tag-mint">🔥 {me.streak} giorni di streak</span>
          </div>
          <div style={{marginTop:18}}><XPBar xp={me.xp} level={me.level}/></div>
        </div>
      </div>
      <div className="card" style={{padding:22}}>
        <div className="card-h">I tuoi badge ({me.badges.length}/{SHOP_BADGES.length})</div>
        <div className="badge-grid">
          {SHOP_BADGES.map(b => {
            const owned = me.badges.includes(b.id);
            return (
              <div key={b.id} className={"badge-tile " + (owned ? 'owned' : 'locked')}>
                <div className={"badge-emoji " + b.cls}>{owned ? b.i : '🔒'}</div>
                <div className="badge-name">{b.l}</div>
                <div className="badge-desc">{b.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card" style={{padding:22}}>
        <div className="card-h">Statistiche del mese</div>
        <div className="stat-grid">
          <div className="stat-tile"><div className="sv">2.847</div><div className="sl">visite vetrina</div></div>
          <div className="stat-tile"><div className="sv">192</div><div className="sl">click su promo</div></div>
          <div className="stat-tile"><div className="sv">38</div><div className="sl">messaggi ricevuti</div></div>
          <div className="stat-tile"><div className="sv">12</div><div className="sl">prenotazioni</div></div>
          <div className="stat-tile"><div className="sv">+€340</div><div className="sl">donato a rifugi</div></div>
          <div className="stat-tile"><div className="sv">4.5</div><div className="sl">★ rating medio</div></div>
        </div>
      </div>
    </div>
  );
}

export function ShopMissions() {
  const missions = [
    { i:'🎁', cat:'GRATIS',    t:'Dona 10 sacchi a un rifugio',       d:'Scegli un rifugio partner e regala il tuo prodotto.',        xp:200, prog:60,  cls:'mn-mint' },
    { i:'⚡', cat:'GRATIS',    t:'Rispondi a 20 messaggi in < 1h',    d:'Sblocca il badge Risposta lampo.',                           xp:100, prog:75,  cls:'mn-mint' },
    { i:'🐾', cat:'GRATIS',    t:'Ospita una giornata adozione',       d:'Coordinati con un rifugio della tua zona.',                  xp:300, prog:0,   cls:'mn-mint' },
    { i:'⭐', cat:'GRATIS',    t:'Raccogli 50 recensioni',              d:"Invita i clienti dopo l'acquisto.",                          xp:150, prog:34,  cls:'mn-mint' },
    { i:'🎮', cat:'MINI-GAME', t:'Pet Quiz settimanale',               d:'Crea 5 domande sul pet care, ricevi visualizzazioni.',       xp:80,  prog:0,   cls:'mn-sky', cost:'€0,99' },
    { i:'🎰', cat:'MINI-GAME', t:'Spin della fortuna',                  d:'1 spin al giorno per XP e boost casuali.',                   xp:50,  prog:100, cls:'mn-sky', cost:'€0,49' },
    { i:'🧩', cat:'MINI-GAME', t:'Sfida giornaliera',                  d:'Indovina il pet del giorno tra i tuoi clienti.',             xp:30,  prog:0,   cls:'mn-sky', cost:'€0,29' },
    { i:'💎', cat:'PREMIUM',   t:'Sponsor un SOS',                     d:'Associa il brand a un soccorso reale (logo nel ringraziamento finale).', xp:500, prog:0, cls:'mn-lav', cost:'€9,99' },
  ];
  return (
    <>
      <div className="missions-banner">
        <div>
          <h3 style={{margin:0,fontFamily:'var(--font-display)',fontSize:28}}>Cresci anche <em>senza pagare</em>.</h3>
          <p style={{margin:'6px 0 0',color:'var(--c-ink-soft)'}}>Le missioni gratuite ti fanno guadagnare XP, badge e visibilità.</p>
        </div>
        <div className="mb-stats">
          <div><div className="hsv">+340</div><div className="hsl">XP questa settimana</div></div>
          <div className="hsep"></div>
          <div><div className="hsv">2/8</div><div className="hsl">missioni completate</div></div>
        </div>
      </div>
      <div className="grid-2" style={{marginTop:18}}>
        {missions.map((m, i) => (
          <div key={i} className={"mission-card " + m.cls}>
            <div className="mn-head">
              <span className="mn-icn">{m.i}</span>
              <div style={{flex:1}}>
                <span className="mn-cat">{m.cat}</span>
                <h5>{m.t}</h5>
              </div>
              <span className="mn-xp">+{m.xp} XP</span>
            </div>
            <p>{m.d}</p>
            {m.prog > 0 && (
              <div className="mn-progress">
                <div className="mn-bar"><div style={{width: m.prog + '%'}}></div></div>
                <span>{m.prog}%</span>
              </div>
            )}
            <button className={"btn " + (m.cost ? '' : 'btn-primary')} style={{width:'100%',justifyContent:'center',marginTop:10}}>
              {m.prog === 100 ? <><Icon name="check" size={14}/> Riscatta</> : m.cost ? <>Sblocca · {m.cost}</> : <>Inizia <Icon name="arrow-right" size={14}/></>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ScreenShop({ goJoin }) {
  const [tab, setTab] = useState('explore');
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Vetrine MUSO. <em>Più aiuti, più cresci.</em></h1>
          <div className="sub">Le vetrine guadagnano XP donando ai rifugi, ospitando eventi adozione, rispondendo veloci.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => goJoin && goJoin('shop')}>Apri la tua vetrina <Icon name="arrow-up-right" size={14}/></button>
          <button className="btn btn-primary"><Icon name="trophy" size={14}/> Classifica</button>
        </div>
      </div>

      <div className="shop-tabs">
        <button className={"shop-tab " + (tab==='explore'?'active':'')} onClick={() => setTab('explore')}>🛍️ Esplora vetrine</button>
        <button className={"shop-tab " + (tab==='leaderboard'?'active':'')} onClick={() => setTab('leaderboard')}>🏆 Classifica</button>
        <button className={"shop-tab " + (tab==='dashboard'?'active':'')} onClick={() => setTab('dashboard')}>📊 La mia vetrina</button>
        <button className={"shop-tab " + (tab==='missions'?'active':'')} onClick={() => setTab('missions')}>🎯 Missioni</button>
      </div>

      {tab === 'explore' && (
        <>
          <div className="filter-bar">
            <button className="chip active">Tutti</button>
            <button className="chip">Pet shop</button>
            <button className="chip">Toelettatura</button>
            <button className="chip">Veterinari</button>
            <button className="chip">Brand</button>
            <span className="filter-divider"></span>
            <button className="chip">⭐ Top livello</button>
            <button className="chip">🌿 Eco-friendly</button>
            <button className="chip"><Icon name="pin" size={12}/> Vicino a me</button>
          </div>
          <div className="grid-3">
            {STORES.map((s, i) => (
              <div key={i} className="store-game-card">
                <div className="store-banner" style={{background:s.banner,height:96,position:'relative'}}>
                  <span className="lv-chip" style={{background:SHOP_LEVELS[s.level-1].color}}>Lv.{s.level} · {SHOP_LEVELS[s.level-1].name}</span>
                  {s.plan === 'Premium' && <span className="store-sponsor-tag">Premium</span>}
                </div>
                <div style={{position:'relative'}}>
                  <div className="store-logo">{s.logo}</div>
                </div>
                <div className="store-body" style={{padding:'22px 16px 16px'}}>
                  <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:8}}>
                    <h5>{s.brand}</h5>
                    <span className="sitter-rating"><Icon name="star" size={12}/> {s.rating}</span>
                  </div>
                  <div className="store-meta">{s.cat} · {s.km} · {s.reviews} recensioni</div>
                  <XPBar xp={s.xp} level={s.level} compact/>
                  <div className="store-badges-row">
                    {s.badges.map(b => {
                      const bd = SHOP_BADGES.find(x => x.id === b);
                      return <span key={b} className={"badge-mini " + bd.cls} title={bd.l}>{bd.i}</span>;
                    })}
                    <span className="badge-mini badge-locked">+{8 - s.badges.length}</span>
                  </div>
                  <div className="store-foot">
                    <span className="promo">{s.promo}</span>
                    <button className="btn" style={{padding:'6px 12px'}}>Apri <Icon name="arrow-right" size={12}/></button>
                  </div>
                  <div className="store-streak">
                    <span>🔥 {s.streak} giorni di streak</span>
                    <span>{s.achievements}/{s.achievementsTotal} obiettivi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {tab === 'leaderboard' && <Leaderboard/>}
      {tab === 'dashboard' && <ShopDashboard/>}
      {tab === 'missions' && <ShopMissions/>}
    </>
  );
}
