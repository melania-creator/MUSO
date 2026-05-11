import { useState } from 'react';
import Icon from './Icon';

const PRESETS = [5, 10, 20, 50];

export default function DonationModal({ title, onClose, onDone }) {
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState('');
  const [done, setDone] = useState(false);

  const finalAmount = custom ? parseFloat(custom) || 0 : amount;

  const handleDone = () => {
    setDone(true);
    setTimeout(() => { setDone(false); onDone?.(); onClose(); }, 1800);
  };

  return (
    <div className="donation-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={e => e.stopPropagation()}>
        {done ? (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div className="ring" style={{ margin:'0 auto 14px', width:64, height:64, display:'flex', alignItems:'center', justifyContent:'center', background:'#6DBF8A22', borderRadius:'50%' }}>
              <Icon name="check" size={32} style={{ color:'#6DBF8A' }}/>
            </div>
            <h3 style={{ margin:'0 0 6px' }}>Grazie! 💚</h3>
            <p style={{ color:'var(--c-ink-soft)', fontSize:14, margin:0 }}>La tua donazione di <b>€{finalAmount}</b> è stata registrata.</p>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h3 style={{ margin:0 }}><Icon name="donate" size={16}/> Dona a {title || 'un rifugio'}</h3>
              <button className="btn btn-ghost" style={{ padding:'4px 8px' }} onClick={onClose}>
                <Icon name="close" size={16}/>
              </button>
            </div>
            <p style={{ color:'var(--c-ink-soft)', fontSize:13.5, margin:'0 0 6px' }}>Scegli un importo:</p>
            <div className="donation-amounts">
              {PRESETS.map(p => (
                <button key={p}
                  className={amount === p && !custom ? 'active' : ''}
                  onClick={() => { setAmount(p); setCustom(''); }}>
                  €{p}
                </button>
              ))}
            </div>
            <div className="donation-custom">
              <input
                type="number" min="1" placeholder="Importo personalizzato (€)"
                value={custom}
                onChange={e => { setCustom(e.target.value); setAmount(0); }}
              />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:20 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', border:'1.5px solid var(--c-line)', borderRadius:'var(--r-sm)', cursor:'pointer', fontSize:13 }}>
                <input type="radio" name="pay" defaultChecked/> 💳 Carta
              </label>
              <label style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', border:'1.5px solid var(--c-line)', borderRadius:'var(--r-sm)', cursor:'pointer', fontSize:13 }}>
                <input type="radio" name="pay"/> 🅿️ PayPal
              </label>
            </div>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:16 }}
              disabled={finalAmount <= 0}
              onClick={handleDone}>
              <Icon name="donate" size={14}/> Dona €{finalAmount || '—'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
