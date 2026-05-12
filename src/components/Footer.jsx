import { useState } from 'react';
import Icon from './Icon';
import logoSrc from '../assets/logoTEST.png';
import LegalModal from './LegalModal';
import Toast, { useToast } from './Toast';

const NAV_LINKS = [
  { label:'Home',           id:'home' },
  { label:'SOS Mappa',      id:'sos' },
  { label:'Adozioni',       id:'adopt' },
  { label:'Rifugi & Aiuti', id:'rifugi' },
  { label:'Pet Sitter',     id:'sitter' },
  { label:'Vetrine',        id:'shop' },
];

const SOCIAL = [
  { label:'Instagram', icon:'📸', url:'https://instagram.com' },
  { label:'TikTok',    icon:'🎵', url:'https://tiktok.com' },
  { label:'Facebook',  icon:'📘', url:'https://facebook.com' },
];

function ReportProblemModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ type:'bug', desc:'' });
  const types = [
    { v:'bug',       l:'Errore tecnico' },
    { v:'abuse',     l:'Segnala abuso / contenuto inappropriato' },
    { v:'animal',    l:'Benessere animale a rischio' },
    { v:'feedback',  l:'Suggerimento / feedback' },
  ];
  const send = () => {
    if (!form.desc.trim()) return;
    setSent(true);
  };
  return (
    <div className="legal-overlay" onClick={onClose}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-head">
          <h3>Segnala un problema</h3>
          <button className="btn btn-ghost" style={{ padding:'4px 8px' }} onClick={onClose}>
            <Icon name="close" size={16}/>
          </button>
        </div>
        <div className="legal-modal-body" style={{ paddingBottom:0 }}>
          {sent ? (
            <div style={{ textAlign:'center', padding:'24px 0' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
              <h4 style={{ margin:'0 0 8px' }}>Segnalazione ricevuta</h4>
              <p style={{ color:'var(--c-ink-soft)', margin:0 }}>Il team MUSO esaminerà la tua segnalazione entro 24h. Grazie per aiutarci a migliorare.</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:8, color:'var(--c-ink-soft)' }}>TIPO DI SEGNALAZIONE</div>
                {types.map(t => (
                  <label key={t.v} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid var(--c-line)', cursor:'pointer', fontSize:14 }}>
                    <input type="radio" name="report-type" checked={form.type === t.v} onChange={() => setForm(f => ({...f, type:t.v}))}/>
                    {t.l}
                  </label>
                ))}
              </div>
              <div style={{ marginTop:14 }}>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:6, color:'var(--c-ink-soft)' }}>DESCRIZIONE</div>
                <textarea
                  value={form.desc}
                  onChange={e => setForm(f => ({...f, desc:e.target.value}))}
                  placeholder="Descrivi il problema nel modo più dettagliato possibile..."
                  style={{ width:'100%', minHeight:100, padding:'10px 12px', border:'1.5px solid var(--c-line)', borderRadius:'var(--r-sm)', fontSize:14, resize:'vertical', boxSizing:'border-box' }}
                />
              </div>
            </>
          )}
        </div>
        <div className="legal-modal-foot" style={{ justifyContent: sent ? 'center' : 'space-between' }}>
          {sent ? (
            <button className="btn btn-primary" onClick={onClose}>Chiudi</button>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={onClose}>Annulla</button>
              <button className="btn btn-primary" disabled={!form.desc.trim()} onClick={send}>
                Invia segnalazione
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Footer({ go, onSos }) {
  const [open,       setOpen]       = useState(false);
  const [legalDoc,   setLegalDoc]   = useState(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [toastMsg,   showToast]     = useToast();

  const nav = (id) => { go?.(id); window.scrollTo({ top: 0 }); };

  return (
    <>
      {/* ── DESKTOP footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">

          {/* col 1 — brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoSrc} alt="MUSO" style={{ height:36, width:'auto' }}/>
              <span className="footer-logo-name">MUSO</span>
            </div>
            <p className="footer-tagline">
              La rete di persone<br/>che salva gli animali.
            </p>
            <div className="footer-social">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                   className="footer-social-btn" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* col 2 — esplora */}
          <div className="footer-col">
            <div className="footer-col-title">Esplora</div>
            {NAV_LINKS.map(l => (
              <button key={l.id} className="footer-link" onClick={() => nav(l.id)}>{l.label}</button>
            ))}
          </div>

          {/* col 3 — supporto */}
          <div className="footer-col">
            <div className="footer-col-title">Supporto</div>
            <button className="footer-link footer-link-accent" onClick={() => setReportOpen(true)}>
              ⚠️ Segnala un problema
            </button>
            <button className="footer-link" onClick={() => setLegalDoc('etico')}>Codice etico</button>
            <button className="footer-link" onClick={() => showToast('📧 Scrivi a supporto@muso.app')}>Contattaci</button>
            <button className="footer-link" onClick={() => showToast('❓ Centro assistenza in arrivo')}>Centro assistenza</button>
            <button className="footer-link" onClick={onSos}>
              🆘 Segnala SOS animale
            </button>
          </div>

          {/* col 4 — legale */}
          <div className="footer-col">
            <div className="footer-col-title">Legale</div>
            <button className="footer-link" onClick={() => setLegalDoc('termini')}>Termini di servizio</button>
            <button className="footer-link" onClick={() => setLegalDoc('privacy')}>Informativa privacy</button>
            <button className="footer-link" onClick={() => showToast('🍪 Cookie: usiamo solo cookie tecnici necessari.')}>Cookie policy</button>
            <button className="footer-link" onClick={() => showToast('💚 100% delle donazioni va ai rifugi — nessuna commissione.')}>Trasparenza donazioni</button>
            <button className="footer-link" onClick={() => showToast('🌍 Report di impatto annuale in arrivo')}>Impatto ambientale</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MUSO · Tutti i diritti riservati</span>
          <span className="footer-bottom-dot">·</span>
          <span>P.IVA 12345678901</span>
          <span className="footer-bottom-dot">·</span>
          <span>Fatto con ❤️ per gli animali</span>
        </div>
      </footer>

      {/* ── MOBILE footer ── */}
      <div className="mobile-footer">
        <button className="mobile-footer-toggle" onClick={() => setOpen(v => !v)}>
          <span>Info &amp; Supporto</span>
          <span className={"mf-chevron " + (open ? 'open' : '')}><Icon name="arrow-right" size={14}/></span>
        </button>

        {open && (
          <div className="mobile-footer-body">
            <div className="mf-section">
              <div className="mf-section-title">Navigazione</div>
              <div className="mf-links">
                {NAV_LINKS.map(l => (
                  <button key={l.id} className="mf-link" onClick={() => { nav(l.id); setOpen(false); }}>{l.label}</button>
                ))}
              </div>
            </div>

            <div className="mf-section">
              <div className="mf-section-title">Supporto</div>
              <div className="mf-links">
                <button className="mf-link mf-link-accent" onClick={() => { setReportOpen(true); setOpen(false); }}>⚠️ Segnala un problema</button>
                <button className="mf-link" onClick={() => { setLegalDoc('etico'); setOpen(false); }}>Codice etico</button>
                <button className="mf-link" onClick={() => { showToast('📧 supporto@muso.app'); setOpen(false); }}>Contattaci</button>
                <button className="mf-link" onClick={() => { setOpen(false); onSos?.(); }}>🆘 SOS animale</button>
              </div>
            </div>

            <div className="mf-section">
              <div className="mf-section-title">Legale</div>
              <div className="mf-links mf-links-row">
                <button className="mf-link" onClick={() => { setLegalDoc('termini'); setOpen(false); }}>Termini</button>
                <button className="mf-link" onClick={() => { setLegalDoc('privacy'); setOpen(false); }}>Privacy</button>
                <button className="mf-link" onClick={() => showToast('🍪 Solo cookie tecnici necessari.')}>Cookie</button>
                <button className="mf-link" onClick={() => showToast('💚 100% donazioni ai rifugi — nessuna commissione.')}>Donazioni</button>
              </div>
            </div>

            <div className="mf-social">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-btn">{s.icon} {s.label}</a>
              ))}
            </div>

            <div className="mf-copy">
              © {new Date().getFullYear()} MUSO · Fatto con ❤️ per gli animali
            </div>
          </div>
        )}
      </div>

      {legalDoc   && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)}/>}
      {reportOpen && <ReportProblemModal onClose={() => setReportOpen(false)}/>}
      <Toast msg={toastMsg}/>
    </>
  );
}
