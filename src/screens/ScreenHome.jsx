import Icon from '../components/Icon';

const HOME_SOS = [
  { id:'sos-1', tone:'t-peach',  emoji:'🐕', tag:'critica', tagCls:'tag-sos',    title:'Cane ferito, P.zza Vetra',      meta:'4 min · 0.6 km · 2 testimoni' },
  { id:'sos-2', tone:'t-mint',   emoji:'🐈', tag:'alta',    tagCls:'tag-sos',    title:'Gatto bloccato su albero',      meta:'11 min · 1.2 km · ENPA in arrivo' },
  { id:'sos-3', tone:'t-butter', emoji:'🐶', tag:'smarrito',tagCls:'tag-butter', title:'Beagle, collare azzurro',       meta:'27 min · 1.8 km · Parco Sempione' },
];

const HOME_PETS = [
  { id:'p1', name:'Luna',    age:'2 anni · F', shelter:'ENPA Milano',     bg:'bg-grad-1', emoji:'🐕',    tag:'Buona con bambini' },
  { id:'p2', name:'Pepe',    age:'5 mesi · M', shelter:'Gattile Cinisello',bg:'bg-grad-2', emoji:'🐈',   tag:'Vaccinato' },
  { id:'p3', name:'Briciola',age:'4 anni · F', shelter:'Lega del Cane',   bg:'bg-grad-3', emoji:'🐶',    tag:'Energica' },
  { id:'p4', name:'Otto',    age:'7 anni · M', shelter:'Canile di Lodi',  bg:'bg-grad-4', emoji:'🐕‍🦺', tag:'Senior' },
];

const HOME_NEEDS = [
  { org:'ENPA Milano',  av:'EM', tag:'Cibo',   cls:'tag-peach', need:'Cibo umido per 38 gattini orfani', raised:1240, goal:1800, donors:87 },
  { org:'Lega del Cane', av:'LC', tag:'Cucce', cls:'tag-mint',  need:"5 cucce coibentate per l'inverno", raised:380,  goal:1200, donors:24 },
];

const HOME_SITTERS = [
  { id:'s1', name:'Chiara B.',  emoji:'☕', tone:'bg-grad-3', city:'Brera',    rate:22, rating:5.0, jobs:218, tag:'Veterinaria' },
  { id:'s2', name:'Marta L.',   emoji:'🌿', tone:'bg-grad-2', city:'Isola',    rate:18, rating:4.9, jobs:142, tag:'Pet first aid' },
  { id:'s3', name:'Sara T.',    emoji:'🌷', tone:'bg-grad-6', city:'Navigli',  rate:20, rating:4.9, jobs:103, tag:'Cat lover' },
];

const HOME_STORES = [
  { brand:'Arcaplanet', logo:'A', banner:'linear-gradient(135deg,#FFB59B,#FF8A66)', cat:'Pet shop · 1.2 km',  promo:'-15% sui sacchi grandi', tag:'Sponsored' },
  { brand:'Vetrinando', logo:'V', banner:'linear-gradient(135deg,#FFE39A,#F5C04A)', cat:'Toelettatura · 0.8 km', promo:'Prima toelettatura -20%', tag:'In zona' },
  { brand:'Bauzaar',    logo:'B', banner:'linear-gradient(135deg,#FFC8DA,#E47AA0)', cat:'Box mensile · Online',  promo:'Box mensile -€10', tag:'Premium' },
];

export default function ScreenHome({ go, onSos, goJoin, openDetail }) {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-l">
          <div className="hero-eyebrow">
            <span className="dot live-dot"></span> 3 SOS attivi a Milano · ora
          </div>
          <h1 className="home-hero-title">
            La rete che <em>salva</em><br/>
            gli animali <span className="hero-arrow"><Icon name="paw" size={36}/></span> attorno a te.
          </h1>
          <div className="home-hero-actions">
            <button className="btn btn-sos" onClick={onSos}>
              <Icon name="plus" size={14}/> Segnala un animale in difficoltà
            </button>
            <button className="btn" onClick={() => go('adopt')}>
              Sfoglia le adozioni <Icon name="arrow-right" size={14}/>
            </button>
          </div>
          <div className="home-hero-stats">
            <div><div className="hsv">8.247</div><div className="hsl">animali salvati</div></div>
            <div className="hsep"></div>
            <div><div className="hsv">312</div><div className="hsl">rifugi connessi</div></div>
            <div className="hsep"></div>
            <div><div className="hsv">94%</div><div className="hsl">SOS &lt; 1h</div></div>
          </div>
        </div>
        <div className="home-hero-r">
          <div className="hero-card hc-1">
            <div className="hc-emoji">🐕</div>
            <div className="hc-tag">SOS · 4 min</div>
            <div className="hc-title">Luna ha bisogno<br/>di te.</div>
            <div className="hc-meta">P.zza Vetra · 0.6 km</div>
          </div>
          <div className="hero-card hc-2">
            <div className="hc-emoji">🐈</div>
            <div className="hc-mini">Pepe, 5 mesi</div>
            <div className="hc-mini-sub">cerca casa</div>
          </div>
          <div className="hero-card hc-3">
            <div className="hc-mini-num">€1.240</div>
            <div className="hc-mini-sub">raccolti oggi<br/>per i rifugi</div>
          </div>
          <div className="hero-blob"></div>
        </div>
      </section>

      <section className="home-quick">
        {[
          { id:'sos',    icon:'sos',     title:'Segnala SOS',      desc:'Animale in difficoltà',  acc:'qa-sos',    onClick:onSos },
          { id:'adopt',  icon:'paw',     title:'Adotta',           desc:'Da rifugi verificati',    acc:'qa-adopt',  onClick:() => go('adopt') },
          { id:'rifugi', icon:'shelter', title:'Aiuta un rifugio', desc:'Cibo, cucce, medicine',   acc:'qa-rifugi', onClick:() => go('rifugi') },
          { id:'sitter', icon:'sitter',  title:'Pet sitter',       desc:'Verificati e assicurati', acc:'qa-sitter', onClick:() => go('sitter') },
          { id:'shop',   icon:'shop',    title:'Vetrine',          desc:'Negozi e brand pet',      acc:'qa-shop',   onClick:() => go('shop') },
        ].map(q => (
          <button key={q.id} className={"qa " + q.acc} onClick={q.onClick}>
            <span className="qa-icn"><Icon name={q.icon} size={20}/></span>
            <span className="qa-text">
              <span className="qa-title">{q.title}</span>
              <span className="qa-desc">{q.desc}</span>
            </span>
            <Icon name="arrow-up-right" size={14}/>
          </button>
        ))}
      </section>

      <section>
        <div className="sec-title">
          <div>
            <h3>SOS <em>vicino a te</em></h3>
            <div className="sub">Ogni minuto conta — clicca per dettagli e prenderlo in carico.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('sos'); }}>
            Apri la mappa <Icon name="arrow-right" size={12}/>
          </a>
        </div>
        <div className="grid-3" style={{marginTop:14}}>
          {HOME_SOS.map((f, i) => (
            <div key={i} className="card hoverable sos-strip-card" onClick={() => openDetail({type:'sos', id:f.id, data:f})}>
              <div className={"thumb " + f.tone} style={{width:54,height:54,borderRadius:14,fontSize:24}}>{f.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',gap:6,marginBottom:6}}>
                  <span className={"tag " + f.tagCls}>{f.tag}</span>
                </div>
                <div style={{fontWeight:600,fontSize:14,marginBottom:4,lineHeight:1.3}}>{f.title}</div>
                <div style={{fontSize:12,color:'var(--c-ink-mute)'}}>{f.meta}</div>
              </div>
              <Icon name="arrow-right" size={16}/>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sec-title">
          <div>
            <h3>Cercano <em>una casa</em>.</h3>
            <div className="sub">Quattro storie scelte oggi. Ce ne sono altre 1.847 ad aspettare.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('adopt'); }}>
            Vedi tutte <Icon name="arrow-right" size={12}/>
          </a>
        </div>
        <div className="grid-4" style={{marginTop:14}}>
          {HOME_PETS.map((p, i) => (
            <div key={i} className="pet-card" onClick={() => openDetail({type:'adopt', id:p.id, data:p})}>
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
      </section>

      <section className="home-split">
        <div className="split-l">
          <div className="sec-title">
            <div>
              <h3>I rifugi <em>chiedono aiuto</em>.</h3>
              <div className="sub">Anche un sacco di crocchette è tanto.</div>
            </div>
            <a href="#" className="right" onClick={e => { e.preventDefault(); go('rifugi'); }}>Tutte <Icon name="arrow-right" size={12}/></a>
          </div>
          <div className="flex-col gap-3" style={{marginTop:14}}>
            {HOME_NEEDS.map((n, i) => {
              const pct = Math.round(n.raised / n.goal * 100);
              return (
                <div key={i} className="help-card" onClick={() => go('rifugi')} style={{cursor:'pointer'}}>
                  <div className="help-head">
                    <div className="av">{n.av}</div>
                    <div style={{flex:1}}><h4>{n.org}</h4><div className="loc"><Icon name="pin" size={11}/> Verificato</div></div>
                    <span className={"tag " + n.cls}>{n.tag}</span>
                  </div>
                  <h3 className="help-need" style={{fontSize:20}}>{n.need}</h3>
                  <div className="help-progress">
                    <div className="help-bar-wrap"><div className="help-bar" style={{width: pct + '%'}}></div></div>
                    <div className="help-stats">
                      <span><b>€{n.raised.toLocaleString('it-IT')}</b> su €{n.goal.toLocaleString('it-IT')} · {n.donors} donatori</span>
                      <span>{pct}%</span>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{justifyContent:'center'}}
                          onClick={e => { e.stopPropagation(); go('rifugi'); }}>
                    <Icon name="donate" size={14}/> Dona ora
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="split-r">
          <div className="sec-title">
            <div>
              <h3>Pet sitter <em>consigliati</em>.</h3>
              <div className="sub">Nella tua zona, già verificati.</div>
            </div>
            <a href="#" className="right" onClick={e => { e.preventDefault(); go('sitter'); }}>Tutti <Icon name="arrow-right" size={12}/></a>
          </div>
          <div className="flex-col gap-3" style={{marginTop:14}}>
            {HOME_SITTERS.map((s, i) => (
              <div key={i} className="card hoverable sitter-row" onClick={() => openDetail({type:'sitter', id:s.id, data:s})}>
                <div className={"sitter-av " + s.tone} style={{width:48,height:48,fontSize:22}}>{s.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:8}}>
                    <div style={{fontWeight:600,fontSize:14}}>{s.name}</div>
                    <div className="sitter-rating"><span className="star"><Icon name="star" size={12}/></span>{s.rating}</div>
                  </div>
                  <div style={{fontSize:12,color:'var(--c-ink-mute)',marginTop:2}}>Milano · {s.city} · {s.jobs} servizi</div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
                    <span className="tag tag-mute">{s.tag}</span>
                    <span style={{fontFamily:'var(--font-display)',fontSize:18}}>€{s.rate}<small style={{fontSize:11,color:'var(--c-ink-mute)'}}> / notte</small></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="sec-title">
          <div>
            <h3>Dalle <em>vetrine</em> di MUSO.</h3>
            <div className="sub">Selezionate per la tua zona. Ogni acquisto sostiene la rete e i rifugi partner.</div>
          </div>
          <a href="#" className="right" onClick={e => { e.preventDefault(); go('shop'); }}>Tutte le vetrine <Icon name="arrow-right" size={12}/></a>
        </div>
        <div className="grid-3" style={{marginTop:14}}>
          {HOME_STORES.map((s, i) => (
            <div key={i} className="store-card" onClick={() => go('shop')}>
              <div className="store-banner" style={{background:s.banner,height:96,position:'relative'}}>
                <span className="store-sponsor-tag">{s.tag}</span>
              </div>
              <div style={{position:'relative'}}>
                <div className="store-logo" style={{width:48,height:48,fontSize:14,bottom:-12}}>{s.logo}</div>
              </div>
              <div className="store-body" style={{padding:'22px 16px 16px'}}>
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
      </section>
    </>
  );
}
