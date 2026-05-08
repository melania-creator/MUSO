import Icon from '../components/Icon';

function EmptySection({ emoji, text }) {
  return (
    <div style={{ padding:'28px 0', textAlign:'center', color:'var(--c-ink-mute)', fontSize:14 }}>
      <div style={{ fontSize:28, marginBottom:8 }}>{emoji}</div>
      {text}
    </div>
  );
}

function Divider({ color, label, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      margin: '36px 0 4px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: color + '22',
        border: '1.5px solid ' + color + '55',
        borderRadius: 999,
        padding: '5px 14px 5px 10px',
        fontSize: 13, fontWeight: 600,
        color: color === '#F5C842' ? '#7A5C00' : color,
      }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        {label}
      </div>
      <div style={{ flex: 1, height: 1.5, background: color + '33', borderRadius: 999 }} />
    </div>
  );
}

export default function ScreenHome({ go, onSos, goJoin, openDetail }) {
  const sosList   = [];
  const petsList  = [];
  const needsList = [];
  const sitterList = [];
  const storeList  = [];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-l">
          <div className="hero-eyebrow">
            <span className="dot live-dot"></span> La rete che protegge gli animali — attiva ora
          </div>
          <h1 className="home-hero-title">
            La rete di persone<br/>
            che <em>salva</em> gli animali <span className="hero-arrow"><Icon name="paw" size={36}/></span>
          </h1>
          <div className="home-hero-actions">
            <button className="btn btn-sos" onClick={onSos}>
              <Icon name="plus" size={14}/> Segnala un animale in difficoltà
            </button>
            <button className="btn" onClick={() => go('adopt')}>
              Sfoglia le adozioni <Icon name="arrow-right" size={14}/>
            </button>
          </div>
        </div>
        <div className="home-hero-r">
          <div className="hero-card hc-1">
            <div className="hc-emoji">🐾</div>
            <div className="hc-tag">MUSO · in attesa</div>
            <div className="hc-title">Sii il primo<br/>a segnalare.</div>
            <div className="hc-meta">La rete è pronta</div>
          </div>
          <div className="hero-card hc-2">
            <div className="hc-emoji">🐈</div>
            <div className="hc-mini">Adozioni</div>
            <div className="hc-mini-sub">in arrivo</div>
          </div>
          <div className="hero-card hc-3">
            <div className="hc-mini-num">€0</div>
            <div className="hc-mini-sub">raccolti oggi<br/>per i rifugi</div>
          </div>
          <div className="hero-blob"></div>
        </div>
      </section>

      <section className="home-quick">
        {[
          { id:'sos',    icon:'sos',     title:'Segnala SOS',      desc:'Animale in difficoltà',  acc:'qa-sos',    onClick: onSos,              bg:'#FF5C4D', fg:'#fff' },
          { id:'adopt',  icon:'paw',     title:'Adotta',           desc:'Da rifugi verificati',    acc:'qa-adopt',  onClick: () => go('adopt'),  bg:'#F4A7B9', fg:'#5C1A2E' },
          { id:'rifugi', icon:'shelter', title:'Aiuta un rifugio', desc:'Cibo, cucce, medicine',   acc:'qa-rifugi', onClick: () => go('rifugi'), bg:'#6DBF8A', fg:'#fff' },
          { id:'sitter', icon:'sitter',  title:'Pet sitter',       desc:'Verificati e assicurati', acc:'qa-sitter', onClick: () => go('sitter'), bg:'#6BAED6', fg:'#fff' },
          { id:'shop',   icon:'shop',    title:'Vetrine',          desc:'Negozi e brand pet',      acc:'qa-shop',   onClick: () => go('shop'),   bg:'#F5C842', fg:'#3B2E00' },
        ].map(q => (
          <button key={q.id} className={"qa " + q.acc} onClick={q.onClick}
                  style={{ background: q.bg, color: q.fg, borderColor: 'transparent' }}>
            <span className="qa-icn" style={{ color: q.fg, opacity: 0.9 }}><Icon name={q.icon} size={20}/></span>
            <span className="qa-text">
              <span className="qa-title" style={{ color: q.fg }}>{q.title}</span>
              <span className="qa-desc"  style={{ color: q.fg, opacity: 0.75 }}>{q.desc}</span>
            </span>
            <Icon name="arrow-up-right" size={14}/>
          </button>
        ))}
      </section>

      <Divider color="#FF5C4D" label="SOS vicino a te" icon="🐾"/>

      <section>
        <div className="sec-title">
          <div>
            <h3>SOS <em>vicino a te</em></h3>
            <div className="sub">Le segnalazioni attive appariranno qui in tempo reale.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('sos'); }}>
            Apri la mappa <Icon name="arrow-right" size={12}/>
          </a>
        </div>
        {sosList.length === 0
          ? <EmptySection emoji="🗺️" text="Nessun SOS attivo al momento — ottima notizia." />
          : (
            <div className="grid-3" style={{ marginTop:14 }}>
              {sosList.map((f, i) => (
                <div key={i} className="card hoverable sos-strip-card"
                     onClick={() => openDetail({ type:'sos', id:f.id, data:f })}>
                  <div className={"thumb " + f.tone} style={{ width:54, height:54, borderRadius:14, fontSize:24 }}>{f.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', gap:6, marginBottom:6 }}>
                      <span className={"tag " + f.tagCls}>{f.tag}</span>
                    </div>
                    <div style={{ fontWeight:600, fontSize:14, marginBottom:4, lineHeight:1.3 }}>{f.title}</div>
                    <div style={{ fontSize:12, color:'var(--c-ink-mute)' }}>{f.meta}</div>
                  </div>
                  <Icon name="arrow-right" size={16}/>
                </div>
              ))}
            </div>
          )
        }
      </section>

      <Divider color="#F4A7B9" label="Adozioni" icon="🐾"/>

      <section>
        <div className="sec-title">
          <div>
            <h3>Cercano <em>una casa</em>.</h3>
            <div className="sub">Gli animali dei rifugi partner compariranno qui.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('adopt'); }}>
            Vedi tutte <Icon name="arrow-right" size={12}/>
          </a>
        </div>
        {petsList.length === 0
          ? <EmptySection emoji="🐾" text="Nessun animale disponibile al momento — i rifugi stanno arrivando." />
          : (
            <div className="grid-4" style={{ marginTop:14 }}>
              {petsList.map((p, i) => (
                <div key={i} className="pet-card"
                     onClick={() => openDetail({ type:'adopt', id:p.id, data:p })}>
                  <div className={"pet-photo " + p.bg}>
                    <div className="face">{p.emoji}</div>
                    <div className="ph-tags">
                      <span className="tag tag-mint">{p.tag}</span>
                      <button className="heart" onClick={e => e.stopPropagation()}><Icon name="heart" size={14}/></button>
                    </div>
                  </div>
                  <div className="pet-body">
                    <span className="pet-name">{p.name}</span>
                    <div className="pet-meta"><span>{p.age}</span></div>
                    <div className="pet-shelter"><Icon name="shelter" size={12}/> da <b>{p.shelter}</b></div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </section>

      <Divider color="#6DBF8A" label="Rifugi & Aiuti" icon="🏠"/>

      <section>
        <div className="sec-title">
          <div>
            <h3>I rifugi <em>chiedono aiuto</em>.</h3>
            <div className="sub">Anche un sacco di crocchette è tanto.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('rifugi'); }}>Tutte <Icon name="arrow-right" size={12}/></a>
        </div>
        {needsList.length === 0
          ? <EmptySection emoji="🏠" text="Nessuna richiesta attiva — i rifugi si stanno registrando." />
          : (
            <div className="grid-3" style={{ marginTop:14 }}>
              {needsList.map((n, i) => {
                const pct = Math.round(n.raised / n.goal * 100);
                return (
                  <div key={i} className="help-card" onClick={() => go('rifugi')} style={{ cursor:'pointer' }}>
                    <div className="help-head">
                      <div className="av">{n.av}</div>
                      <div style={{ flex:1 }}><h4>{n.org}</h4><div className="loc"><Icon name="pin" size={11}/> Verificato</div></div>
                      <span className={"tag " + n.cls}>{n.tag}</span>
                    </div>
                    <h3 className="help-need" style={{ fontSize:20 }}>{n.need}</h3>
                    <div className="help-progress">
                      <div className="help-bar-wrap"><div className="help-bar" style={{ width: pct + '%' }}></div></div>
                      <div className="help-stats">
                        <span><b>€{n.raised.toLocaleString('it-IT')}</b> su €{n.goal.toLocaleString('it-IT')} · {n.donors} donatori</span>
                        <span>{pct}%</span>
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ justifyContent:'center' }}>
                      <Icon name="donate" size={14}/> Dona ora
                    </button>
                  </div>
                );
              })}
            </div>
          )
        }
      </section>

      <Divider color="#6BAED6" label="Pet Sitter" icon="🌿"/>

      <section>
        <div className="sec-title">
          <div>
            <h3>Pet sitter <em>consigliati</em>.</h3>
            <div className="sub">Nella tua zona, già verificati.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('sitter'); }}>Tutti <Icon name="arrow-right" size={12}/></a>
        </div>
        {sitterList.length === 0
          ? <EmptySection emoji="🌿" text="Nessun sitter ancora — i primi si stanno iscrivendo." />
          : (
            <div className="grid-3" style={{ marginTop:14 }}>
              {sitterList.map((s, i) => (
                <div key={i} className="card hoverable sitter-row"
                     onClick={() => openDetail({ type:'sitter', id:s.id, data:s })}>
                  <div className={"sitter-av " + s.tone} style={{ width:48, height:48, fontSize:22 }}>{s.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
                      <div style={{ fontWeight:600, fontSize:14 }}>{s.name}</div>
                      <div className="sitter-rating"><span className="star"><Icon name="star" size={12}/></span>{s.rating}</div>
                    </div>
                    <div style={{ fontSize:12, color:'var(--c-ink-mute)', marginTop:2 }}>{s.city} · {s.jobs} servizi</div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:8 }}>
                      <span className="tag tag-mute">{s.tag}</span>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:18 }}>€{s.rate}<small style={{ fontSize:11, color:'var(--c-ink-mute)' }}> / notte</small></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </section>

      <Divider color="#F5C842" label="Vetrine" icon="🏪"/>

      <section>
        <div className="sec-title">
          <div>
            <h3>Dalle <em>vetrine</em> di MUSO.</h3>
            <div className="sub">I negozi e brand che supportano la rete.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('shop'); }}>Tutte le vetrine <Icon name="arrow-right" size={12}/></a>
        </div>
        {storeList.length === 0
          ? <EmptySection emoji="🏪" text="Nessuna vetrina ancora — i partner stanno arrivando." />
          : (
            <div className="grid-3" style={{ marginTop:14 }}>
              {storeList.map((s, i) => (
                <div key={i} className="store-card" onClick={() => go('shop')}>
                  <div className="store-banner" style={{ background:s.banner, height:96, position:'relative' }}>
                    <span className="store-sponsor-tag">{s.tag}</span>
                  </div>
                  <div style={{ position:'relative' }}>
                    <div className="store-logo" style={{ width:48, height:48, fontSize:14, bottom:-12 }}>{s.logo}</div>
                  </div>
                  <div className="store-body" style={{ padding:'22px 16px 16px' }}>
                    <h5>{s.brand}</h5>
                    <div className="store-meta">{s.cat}</div>
                    <div className="store-foot">
                      <span className="promo">{s.promo}</span>
                      <Icon name="arrow-right" size={14}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </section>
    </>
  );
}
