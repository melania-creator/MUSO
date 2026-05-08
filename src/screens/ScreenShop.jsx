import { useState } from 'react';
import Icon from '../components/Icon';
import { STORES, SHOP_LEVELS, SHOP_BADGES } from '../constants';

export function XPBar({ xp, level, compact }) {
  const cur  = SHOP_LEVELS[level - 1];
  const next = SHOP_LEVELS[level] || cur;
  const pct  = Math.round(((xp - cur.min) / (next.max - cur.min)) * 100);
  return (
    <div className={"xp-bar " + (compact ? 'compact' : '')}>
      <div className="xp-meta">
        <span><b>{xp.toLocaleString('it-IT')}</b> XP</span>
        {!compact && <span>Lv. {level} → {level + 1}</span>}
        <span>{next.max - xp} al prossimo livello</span>
      </div>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: pct + '%', background: cur.color }}></div>
      </div>
    </div>
  );
}

export function ShopMissions() {
  const missions = [
    { i:'🎁', cat:'GRATIS',    t:'Dona 10 sacchi a un rifugio',        d:'Scegli un rifugio partner e regala il tuo prodotto.',        xp:200, prog:0,  cls:'mn-mint' },
    { i:'⚡', cat:'GRATIS',    t:'Rispondi a 20 messaggi in < 1h',     d:'Sblocca il badge Risposta lampo.',                           xp:100, prog:0,  cls:'mn-mint' },
    { i:'🐾', cat:'GRATIS',    t:'Ospita una giornata adozione',        d:'Coordinati con un rifugio della tua zona.',                  xp:300, prog:0,  cls:'mn-mint' },
    { i:'⭐', cat:'GRATIS',    t:'Raccogli 50 recensioni',              d:"Invita i clienti dopo l'acquisto.",                          xp:150, prog:0,  cls:'mn-mint' },
    { i:'🎮', cat:'MINI-GAME', t:'Pet Quiz settimanale',                d:'Crea 5 domande sul pet care, ricevi visualizzazioni.',       xp:80,  prog:0,  cls:'mn-sky', cost:'€0,99' },
    { i:'🎰', cat:'MINI-GAME', t:'Spin della fortuna',                   d:'1 spin al giorno per XP e boost casuali.',                   xp:50,  prog:0,  cls:'mn-sky', cost:'€0,49' },
    { i:'🧩', cat:'MINI-GAME', t:'Sfida giornaliera',                   d:'Indovina il pet del giorno tra i tuoi clienti.',             xp:30,  prog:0,  cls:'mn-sky', cost:'€0,29' },
    { i:'💎', cat:'PREMIUM',   t:'Sponsor un SOS',                      d:'Associa il brand a un soccorso reale.',                      xp:500, prog:0,  cls:'mn-lav', cost:'€9,99' },
  ];
  return (
    <>
      <div className="missions-banner">
        <div>
          <h3 style={{ margin:0, fontFamily:'var(--font-display)', fontSize:28 }}>Cresci anche <em>senza pagare</em>.</h3>
          <p style={{ margin:'6px 0 0', color:'var(--c-ink-soft)' }}>Le missioni gratuite ti fanno guadagnare XP, badge e visibilità.</p>
        </div>
      </div>
      <div className="grid-2" style={{ marginTop:18 }}>
        {missions.map((m, i) => (
          <div key={i} className={"mission-card " + m.cls}>
            <div className="mn-head">
              <span className="mn-icn">{m.i}</span>
              <div style={{ flex:1 }}>
                <span className="mn-cat">{m.cat}</span>
                <h5>{m.t}</h5>
              </div>
              <span className="mn-xp">+{m.xp} XP</span>
            </div>
            <p>{m.d}</p>
            <button className={"btn " + (m.cost ? '' : 'btn-primary')} style={{ width:'100%', justifyContent:'center', marginTop:10 }}>
              {m.cost ? <>Sblocca · {m.cost}</> : <>Inizia <Icon name="arrow-right" size={14}/></>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function Leaderboard() {
  const sorted = [...STORES].sort((a, b) => b.xp - a.xp);
  if (sorted.length === 0) {
    return (
      <div className="empty-state" style={{ marginTop:32 }}>
        <div className="es-emoji">🏆</div>
        <h3>Classifica vuota</h3>
        <p>Appena le prime vetrine si iscrivono, la classifica prende vita.<br/>Sii tra i primi e parti in vantaggio.</p>
      </div>
    );
  }
  return (
    <div className="card" style={{ padding:0, overflow:'hidden' }}>
      <div className="lb-head">
        <div>
          <h3 style={{ margin:0, fontFamily:'var(--font-display)', fontSize:28 }}><em>Classifica mensile</em></h3>
          <div style={{ fontSize:13, color:'var(--c-ink-soft)' }}>Top 3 vincono visibilità extra in home la settimana successiva.</div>
        </div>
        <select className="sort"><option>Tutta Italia</option><option>La mia zona</option></select>
      </div>
      <div className="lb-list">
        {sorted.map((s, i) => (
          <div key={i} className={"lb-row " + (i < 3 ? 'lb-top' : '')}>
            <span className="lb-rank">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
            <div className="lb-logo" style={{ background: s.banner }}>{s.logo}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <b>{s.brand}</b>
                <span className="lv-chip-mini" style={{ background: SHOP_LEVELS[s.level-1].color }}>Lv.{s.level}</span>
              </div>
              <div className="meta">{s.cat} · {s.reviews} recensioni · 🔥 {s.streak}gg</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:22 }}>{s.xp.toLocaleString('it-IT')}</div>
              <div className="meta">XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
        <button className={"shop-tab " + (tab === 'explore'     ? 'active' : '')} onClick={() => setTab('explore')}>🛍️ Esplora vetrine</button>
        <button className={"shop-tab " + (tab === 'leaderboard' ? 'active' : '')} onClick={() => setTab('leaderboard')}>🏆 Classifica</button>
        <button className={"shop-tab " + (tab === 'missions'    ? 'active' : '')} onClick={() => setTab('missions')}>🎯 Missioni</button>
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
          {STORES.length === 0 ? (
            <div className="empty-state" style={{ marginTop:40 }}>
              <div className="es-emoji">🏪</div>
              <h3>Nessuna vetrina ancora</h3>
              <p>I partner stanno completando la registrazione.<br/>Apri la tua vetrina e sii tra i fondatori della rete.</p>
              <button className="btn btn-primary" onClick={() => goJoin && goJoin('shop')}>
                <Icon name="arrow-up-right" size={14}/> Apri la tua vetrina
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {STORES.map((s, i) => (
                <div key={i} className="store-game-card">
                  <div className="store-banner" style={{ background:s.banner, height:96, position:'relative' }}>
                    <span className="lv-chip" style={{ background: SHOP_LEVELS[s.level-1].color }}>Lv.{s.level} · {SHOP_LEVELS[s.level-1].name}</span>
                    {s.plan === 'Premium' && <span className="store-sponsor-tag">Premium</span>}
                  </div>
                  <div style={{ position:'relative' }}>
                    <div className="store-logo">{s.logo}</div>
                  </div>
                  <div className="store-body" style={{ padding:'22px 16px 16px' }}>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
                      <h5>{s.brand}</h5>
                      <span className="sitter-rating"><Icon name="star" size={12}/> {s.rating}</span>
                    </div>
                    <div className="store-meta">{s.cat} · {s.km} · {s.reviews} recensioni</div>
                    <XPBar xp={s.xp} level={s.level} compact/>
                    <div className="store-foot">
                      <span className="promo">{s.promo}</span>
                      <button className="btn" style={{ padding:'6px 12px' }}>Apri <Icon name="arrow-right" size={12}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {tab === 'leaderboard' && <Leaderboard/>}
      {tab === 'missions'    && <ShopMissions/>}
    </>
  );
}
