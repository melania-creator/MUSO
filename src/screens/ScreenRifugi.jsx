import { useState } from 'react';
import Icon from '../components/Icon';
import Toast, { useToast } from '../components/Toast';
import DonationModal from '../components/DonationModal';

const CATS   = ['Tutte','Cibo','Coperte','Cucce','Medicine','Accessori'];
const DISTS  = ['50 km','20 km','10 km','Tutti'];

export default function ScreenRifugi({ goJoin }) {
  const [cat,        setCat]        = useState('Tutte');
  const [urgent,     setUrgent]     = useState(false);
  const [dist,       setDist]       = useState('50 km');
  const [donating,   setDonating]   = useState(null); // { title } or null
  const [toastMsg,   showToast]     = useToast();

  const needs = [];

  const visible = needs.filter(n =>
    (cat === 'Tutte' || n.cat === cat) &&
    (!urgent || n.urgent)
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>I rifugi <em>chiedono aiuto.</em><br/>Un sacco di crocchette, una coperta, un'ora del tuo tempo. Tutto conta.</h1>
          <div className="sub">Richieste reali da associazioni verificate. Doni in pochi click — diretto a chi ne ha bisogno.</div>
        </div>
        <div className="ph-actions">
          <button className="btn" onClick={() => goJoin && goJoin('rifugio')}>Sei un rifugio? <Icon name="arrow-up-right" size={14}/></button>
          <button className="btn btn-primary" onClick={() => setDonating({ title: 'un rifugio' })}>
            <Icon name="heart" size={14}/> Dona ora
          </button>
        </div>
      </div>

      <div className="filter-bar">
        {CATS.map(c => (
          <button key={c} className={'chip ' + (cat === c ? 'active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
        <span className="filter-divider"></span>
        <button className={'chip ' + (urgent ? 'active' : '')} onClick={() => setUrgent(v => !v)}>
          <Icon name="clock" size={12}/> Urgenza alta
        </button>
        <button className={'chip ' + (dist !== '50 km' ? 'active' : '')}
          onClick={() => setDist(d => { const i = DISTS.indexOf(d); return DISTS[(i+1) % DISTS.length]; })}>
          <Icon name="pin" size={12}/> {dist}
        </button>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state" style={{ marginTop:40 }}>
          <div className="es-emoji">🏠</div>
          <h3>Nessuna richiesta attiva al momento</h3>
          <p>I rifugi si stanno registrando. Appena attivano una richiesta di aiuto,<br/>la troverai qui con tutti i dettagli per donare in pochi click.</p>
          <button className="btn btn-primary" onClick={() => goJoin && goJoin('rifugio')}>
            <Icon name="shelter" size={14}/> Registra il tuo rifugio
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {visible.map((n, i) => {
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
                  <button className="btn btn-primary" style={{ flex:1, justifyContent:'center' }}
                    onClick={() => setDonating({ title: n.org })}>
                    <Icon name="donate" size={14}/> Dona
                  </button>
                  <button className="btn" title="Dona prodotti" onClick={() => showToast('🎁 Funzionalità donazione prodotti in arrivo!')}>
                    <Icon name="gift" size={14}/>
                  </button>
                  <button className="btn" title="Scrivi al rifugio" onClick={() => showToast('💬 Messaggistica rifugi in arrivo!')}>
                    <Icon name="message" size={14}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {donating && (
        <DonationModal
          title={donating.title}
          onClose={() => setDonating(null)}
          onDone={() => showToast('💚 Grazie! La donazione è stata registrata.')}
        />
      )}
      <Toast msg={toastMsg}/>
    </>
  );
}
