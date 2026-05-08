import Icon from '../components/Icon';

export default function ScreenRifugi({ goJoin }) {
  // In futuro: needs arriveranno dal backend (es. fetch('/api/shelters/needs'))
  const needs = [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>I rifugi <em>chiedono aiuto.</em><br/>Un sacco di crocchette, una coperta, un'ora del tuo tempo. Tutto conta.</h1>
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

      {needs.length === 0 ? (
        <div className="empty-state" style={{ marginTop:40 }}>
          <div className="es-emoji">🏠</div>
          <h3>Nessuna richiesta attiva al momento</h3>
          <p>I rifugi si stanno registrando. Appena attivano una richiesta di aiuto,<br/>la troverai qui con tutti i dettagli per donare in pochi click.</p>
          <button className="btn btn-primary" onClick={() => goJoin && goJoin('shop')}>
            <Icon name="shelter" size={14}/> Registra il tuo rifugio
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {needs.map((n, i) => {
            const pct = Math.round(n.raised / n.goal * 100);
            return (
              <div key={i} className="help-card">
                <div className="help-head">
                  <div className="av">{n.av}</div>
                  <div style={{ flex:1 }}><h4>{n.org}</h4><div className="loc"><Icon name="pin" size={11}/> {n.city} · verificato</div></div>
                  <span className={"tag " + n.acc}>{n.cat}</span>
                </div>
                <h3 className="help-need">{n.need}</h3>
                <div className="help-progress">
                  <div className="help-bar-wrap"><div className="help-bar" style={{ width: pct + '%' }}></div></div>
                  <div className="help-stats"><span><b>€{n.raised.toLocaleString('it-IT')}</b> raccolti su €{n.goal.toLocaleString('it-IT')}</span><span>{pct}%</span></div>
                  <div className="help-stats"><span>{n.donors} donatori</span><span>{n.days} giorni rimanenti</span></div>
                </div>
                <div className="help-actions">
                  <button className="btn btn-primary" style={{ flex:1, justifyContent:'center' }}><Icon name="donate" size={14}/> Dona</button>
                  <button className="btn"><Icon name="gift" size={14}/></button>
                  <button className="btn"><Icon name="message" size={14}/></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
