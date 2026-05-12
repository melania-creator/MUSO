import Icon from '../components/Icon';
import sfondoHero from '../assets/sfondoHOME.png';
import logoSOS from '../assets/logoSOS.png';
import logoAdotta from '../assets/logoAdotta.png';
import logoAiutaRifugio from '../assets/logoAiutaRifugio.png';
import logoPetsitter from '../assets/logoPetsitter.png';
import logoVetrina from '../assets/logoVetrina.png';

function EmptySection({ text }) {
  return (
    <div style={{ padding:'28px 0', textAlign:'center', color:'var(--c-ink-mute)', fontSize:14 }}>
      {text}
    </div>
  );
}

export default function ScreenHome({ go, onSos, goJoin, openDetail }) {
  const sosList = [
    { id:'s1', emoji:'🐕', tone:'t-peach',  tagCls:'tag-sos',    tag:'Urgente',   title:'Cane ferito abbandonato vicino al parco', meta:'Via Roma · 10 min fa' },
    { id:'s2', emoji:'🐈', tone:'t-sky',    tagCls:'tag-mute',   tag:'In attesa', title:'Gatto intrappolato sotto una macchina',    meta:'Corso Italia · 28 min fa' },
    { id:'s3', emoji:'🐦', tone:'t-butter', tagCls:'tag-mute',   tag:'In attesa', title:'Piccolo volatile con ala ferita',          meta:'Piazza Garibaldi · 1 ora fa' },
  ];
  const petsList  = [];
  const needsList = [];
  const sitterList = [];
  const storeList  = [];

  return (
    <>
      <section className="home-hero" style={{
        backgroundImage: `url(${sfondoHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 'inherit',
        }}/>
        <div className="home-hero-l" style={{ position:'relative', zIndex:1, paddingLeft:'2.5rem' }}>
          <div className="hero-eyebrow" style={{ color:'#D4318A' }}>
            <span className="dot live-dot"></span> <span style={{ fontWeight:700 }}>Attiva ora</span>
          </div>
          <h1 className="home-hero-title" style={{ color:'#fff', textShadow:'0 2px 16px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
            La rete di persone<br/>
            che <em>salva</em> gli animali
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
        <div className="home-hero-r" style={{ position:'relative', zIndex:1 }}>

          <div className="hero-card hc-1">
            <div className="hc-icon-bubble" style={{ background:'#FFE8F4' }}>🐾</div>
            <div className="hc-content">
              <div className="hc-label">SOS · In attesa</div>
              <div className="hc-heading">Sii il primo<br/>a segnalare.</div>
              <div className="hc-dot-row">
                <span className="hc-dot" style={{ background:'#D4318A' }}></span>
                <span className="hc-dot-text">La rete è pronta</span>
              </div>
            </div>
          </div>

          <div className="hero-card hc-2">
            <div className="hc-icon-bubble" style={{ background:'#FFF0C8' }}>🐈</div>
            <div className="hc-content">
              <div className="hc-label">Adozioni</div>
              <div className="hc-heading">In arrivo<br/>vicino a te.</div>
              <div className="hc-dot-row">
                <span className="hc-dot" style={{ background:'#F5C842' }}></span>
                <span className="hc-dot-text">Rifugi verificati</span>
              </div>
            </div>
          </div>

          <div className="hero-card hc-3">
            <div className="hc-icon-bubble" style={{ background:'#DFF4EA' }}>💚</div>
            <div className="hc-content">
              <div className="hc-label">Raccolte oggi</div>
              <div className="hc-heading" style={{ fontFamily:'var(--font-display)', fontSize:28 }}>€0</div>
              <div className="hc-dot-row">
                <span className="hc-dot" style={{ background:'#6DBF8A' }}></span>
                <span className="hc-dot-text">Per i rifugi</span>
              </div>
            </div>
          </div>

          <div className="hero-blob"></div>
        </div>
      </section>

      <section className="home-quick">
        {[
          { id:'sos',    logo: logoSOS,           title:'Segnala SOS',      desc:'Animale in difficoltà',  acc:'qa-sos',    onClick: onSos,              bg:'#FF5C4D', fg:'#fff' },
          { id:'adopt',  logo: logoAdotta,         title:'Adotta',           desc:'Da rifugi verificati',    acc:'qa-adopt',  onClick: () => go('adopt'),  bg:'#F4A7B9', fg:'#fff' },
          { id:'rifugi', logo: logoAiutaRifugio,   title:'Aiuta un rifugio', desc:'Cibo, cucce, medicine',   acc:'qa-rifugi', onClick: () => go('rifugi'), bg:'#6DBF8A', fg:'#fff' },
          { id:'sitter', logo: logoPetsitter,       title:'Pet sitter',       desc:'Verificati e assicurati', acc:'qa-sitter', onClick: () => go('sitter'), bg:'#6BAED6', fg:'#fff' },
          { id:'shop',   logo: logoVetrina,         title:'Vetrine',          desc:'Negozi e brand pet',      acc:'qa-shop',   onClick: () => go('shop'),   bg:'#F5C842', fg:'#fff' },
        ].map(q => (
          <button key={q.id} className={"qa " + q.acc} onClick={q.onClick}
                  style={{ backgroundColor: q.bg, color: q.fg, borderColor: 'transparent' }}>
            <span className="qa-icn">
              <img src={q.logo} alt={q.title} style={{ width:32, height:32, objectFit:'contain' }}/>
            </span>
            <span className="qa-text">
              <span className="qa-title" style={{ color: q.fg, textTransform:'uppercase', fontSize:15, fontWeight:700, letterSpacing:'.04em' }}>{q.title}</span>
              <span className="qa-desc"  style={{ color: q.fg, opacity: 0.75 }}>{q.desc}</span>
            </span>
            <Icon name="arrow-up-right" size={14}/>
          </button>
        ))}
      </section>

      <section style={{ background:'#FF2D1A30', borderRadius:0, padding:'16px', marginTop:4 }}>
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
          ? <EmptySection text="Nessun SOS attivo al momento — ottima notizia." />
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

      <section style={{ background:'#F4A7B930', borderRadius:0, padding:'16px', marginTop:4 }}>
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
          ? <EmptySection text="Nessun animale disponibile al momento — i rifugi stanno arrivando." />
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

      <section style={{ background:'#6DBF8A22', borderRadius:0, padding:'16px', marginTop:4 }}>
        <div className="sec-title">
          <div>
            <h3>I rifugi <em>chiedono aiuto</em>.</h3>
            <div className="sub">Un sacco di crocchette, una coperta, un'ora del tuo tempo. Tutto conta.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('rifugi'); }}>Tutte <Icon name="arrow-right" size={12}/></a>
        </div>
        {needsList.length === 0
          ? <EmptySection text="Nessuna richiesta attiva — i rifugi si stanno registrando." />
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

      <section style={{ background:'#6BAED630', borderRadius:0, padding:'16px', marginTop:4 }}>
        <div className="sec-title">
          <div>
            <h3>Pet sitter <em>consigliati</em>.</h3>
            <div className="sub">Nella tua zona, già verificati.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('sitter'); }}>Tutti <Icon name="arrow-right" size={12}/></a>
        </div>
        {sitterList.length === 0
          ? <EmptySection text="Nessun sitter ancora — i primi si stanno iscrivendo." />
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

      <section style={{ background:'#F5C84230', borderRadius:0, padding:'16px', marginTop:4 }}>
        <div className="sec-title">
          <div>
            <h3>Dalle <em>vetrine</em> di MUSO.</h3>
            <div className="sub">I negozi e brand che supportano la rete.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('shop'); }}>Tutte le vetrine <Icon name="arrow-right" size={12}/></a>
        </div>
        {storeList.length === 0
          ? <EmptySection text="Nessuna vetrina ancora — i partner stanno arrivando." />
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
