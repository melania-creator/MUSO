import Icon from '../components/Icon';

const NEEDS = [
  { org:'ENPA Milano',    city:'Milano',  av:'EM', acc:'tag-peach',  need:'Cibo umido per 38 gattini orfani',    cat:'Cibo',      raised:1240, goal:1800, donors:87,  days:4 },
  { org:'Lega del Cane',  city:'Bergamo', av:'LC', acc:'tag-mint',   need:"5 cucce coibentate per l'inverno",    cat:'Cucce',     raised:380,  goal:1200, donors:24,  days:12 },
  { org:'Casa dei Gatti', city:'Como',    av:'CG', acc:'tag-sky',    need:'Coperte e teli per il gattile',       cat:'Coperte',   raised:95,   goal:250,  donors:18,  days:7 },
  { org:'Canile di Lodi', city:'Lodi',    av:'CL', acc:'tag-lav',    need:'Medicine e visite veterinarie',       cat:'Medicine',  raised:2150, goal:3000, donors:142, days:21 },
  { org:'ENPA Brescia',   city:'Brescia', av:'EB', acc:'tag-butter', need:'Sacchi di crocchette premium',        cat:'Cibo',      raised:670,  goal:900,  donors:51,  days:5 },
  { org:'Gattile Cinisello',city:'Milano',av:'GC', acc:'tag-rose',   need:'Lettiere e tiragraffi',               cat:'Accessori', raised:220,  goal:400,  donors:33,  days:9 },
];

export default function ScreenRifugi({ goJoin }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>I rifugi <em>chiedono aiuto.</em><br/>Anche un sacco di crocchette è tanto.</h1>
          <div className="sub">Richieste reali da associazioni verificate. Doni in pochi click — diretto a chi ne ha bisogno.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => goJoin && goJoin('shop')}>Sei un rifugio? <Icon name="arrow-up-right" size={14}/></button>
          <button className="btn btn-primary"><Icon name="heart" size={14}/> Dona ora</button>
        </div>
      </div>
      <div className="filter-bar">
        {['Tutte','Cibo','Coperte','Cucce','Medicine','Accessori'].map(c => (
          <button key={c} className={"chip " + (c === 'Tutte' ? 'active' : '')}>{c}</button>
        ))}
        <span className="filter-divider"></span>
        <button className="chip"><Icon name="clock" size={12}/> Urgenza alta</button>
        <button className="chip"><Icon name="pin" size={12}/> 50 km</button>
      </div>
      <div className="grid-3">
        {NEEDS.map((n, i) => {
          const pct = Math.round(n.raised / n.goal * 100);
          return (
            <div key={i} className="help-card">
              <div className="help-head">
                <div className="av">{n.av}</div>
                <div style={{flex:1}}><h4>{n.org}</h4><div className="loc"><Icon name="pin" size={11}/> {n.city} · verificato</div></div>
                <span className={"tag " + n.acc}>{n.cat}</span>
              </div>
              <h3 className="help-need">{n.need}</h3>
              <div className="help-progress">
                <div className="help-bar-wrap"><div className="help-bar" style={{width: pct + '%'}}></div></div>
                <div className="help-stats"><span><b>€{n.raised.toLocaleString('it-IT')}</b> raccolti su €{n.goal.toLocaleString('it-IT')}</span><span>{pct}%</span></div>
                <div className="help-stats"><span>{n.donors} donatori</span><span>{n.days} giorni rimanenti</span></div>
              </div>
              <div className="help-actions">
                <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}}><Icon name="donate" size={14}/> Dona</button>
                <button className="btn"><Icon name="gift" size={14}/></button>
                <button className="btn"><Icon name="message" size={14}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
