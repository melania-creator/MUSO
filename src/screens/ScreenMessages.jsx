import { useState } from 'react';
import Icon from '../components/Icon';

const MSG_TYPES = [
  { icon: '🩺', label: 'SOS',       color: '#FF5C4D', desc: 'Aggiornamenti sulle segnalazioni' },
  { icon: '🐾', label: 'Adozione',  color: '#6DBF8A', desc: 'Risposte dai rifugi' },
  { icon: '🏠', label: 'Sitter',    color: '#6BAED6', desc: 'Conferme e chat con i sitter' },
  { icon: '🛍️', label: 'Vetrina',   color: '#F5C842', desc: 'Ordini e info dai negozi' },
  { icon: '💜', label: 'Rifugio',   color: '#C9B8FF', desc: 'Comunicazioni dai rifugi' },
];

const STYLE = `
  .msg-screen { padding: 24px 20px; max-width: 680px; margin: 0 auto; }

  .msg-topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .msg-topbar h1 { font-size: 22px; font-weight: 700; margin: 0; }

  .notif-banner {
    display: flex; align-items: center; gap: 14px;
    background: #FFF8ED;
    border: 1.5px solid #F5D9A0;
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }
  .notif-banner-icon { font-size: 24px; flex-shrink: 0; }
  .notif-banner-text { flex: 1; }
  .notif-banner-text b { font-size: 14px; font-weight: 600; color: var(--c-ink); display: block; margin-bottom: 2px; }
  .notif-banner-text span { font-size: 12px; color: var(--c-ink-mute); }
  .notif-btn {
    padding: 8px 14px; border-radius: 10px;
    background: #F5A623; color: #fff;
    border: none; font-size: 13px; font-weight: 600; cursor: pointer;
    white-space: nowrap;
  }
  .notif-btn.active {
    background: #6DBF8A;
  }

  .msg-empty {
    text-align: center;
    padding: 32px 20px 24px;
    border: 1.5px dashed var(--c-line, #e0ddd8);
    border-radius: 18px;
    margin-bottom: 24px;
  }
  .msg-empty-icon { font-size: 44px; margin-bottom: 12px; }
  .msg-empty h3 { font-size: 16px; font-weight: 700; margin: 0 0 6px; }
  .msg-empty p { font-size: 13px; color: var(--c-ink-mute); margin: 0; line-height: 1.5; }

  .msg-types-title {
    font-size: 11px; font-weight: 700; color: var(--c-ink-mute);
    text-transform: uppercase; letter-spacing: .06em;
    margin-bottom: 10px;
  }
  .msg-types-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }
  .msg-type-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--c-bg, #f9f7f4);
    border: 1px solid var(--c-line, #eee);
  }
  .msg-type-avatar {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .msg-type-info { flex: 1; }
  .msg-type-info b { font-size: 13px; font-weight: 600; display: block; }
  .msg-type-info span { font-size: 12px; color: var(--c-ink-mute); }
  .msg-type-badge {
    font-size: 10px; font-weight: 700;
    padding: 3px 8px; border-radius: 999px;
    color: #fff;
  }

  .compose-btn {
    width: 100%; padding: 14px;
    border-radius: 14px;
    border: 2px solid var(--c-accent, #D4318A);
    background: #FCEAF4; color: var(--c-accent, #D4318A);
    font-size: 15px; font-weight: 700;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .compose-btn:hover { background: #f9d9ee; }

  /* Compose modal */
  .compose-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,.4);
    display: flex; align-items: flex-end;
  }
  .compose-panel {
    background: var(--c-surface, #fff);
    border-radius: 24px 24px 0 0;
    padding: 20px 20px max(28px, env(safe-area-inset-bottom));
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
  }
  .compose-handle {
    width: 36px; height: 4px;
    background: var(--c-line, #ddd);
    border-radius: 999px; margin: 0 auto 18px;
  }
  .compose-panel h2 { font-size: 18px; font-weight: 700; margin: 0 0 16px; }
  .compose-field { margin-bottom: 14px; }
  .compose-field label { font-size: 12px; font-weight: 600; color: var(--c-ink-mute); text-transform: uppercase; letter-spacing: .04em; display: block; margin-bottom: 6px; }
  .compose-field input, .compose-field textarea {
    width: 100%; padding: 11px 14px;
    border-radius: 12px; border: 1.5px solid var(--c-line, #eee);
    background: var(--c-bg, #f9f7f4);
    font-size: 14px; color: var(--c-ink);
    box-sizing: border-box; outline: none;
    font-family: inherit;
  }
  .compose-field input:focus, .compose-field textarea:focus {
    border-color: var(--c-accent, #D4318A);
  }
  .compose-field textarea { resize: none; }
  .compose-actions { display: flex; gap: 10px; margin-top: 6px; }
  .compose-send {
    flex: 1; padding: 13px;
    border-radius: 12px; border: none;
    background: var(--c-accent, #D4318A); color: #fff;
    font-size: 15px; font-weight: 700; cursor: pointer;
  }
  .compose-send:disabled { opacity: .4; cursor: default; }
  .compose-cancel {
    padding: 13px 18px;
    border-radius: 12px; border: 1.5px solid var(--c-line, #eee);
    background: none; font-size: 15px; font-weight: 600;
    cursor: pointer; color: var(--c-ink-mute);
  }
`;

export default function ScreenMessages() {
  const [notifOn, setNotifOn]       = useState(false);
  const [composeOpen, setCompose]   = useState(false);
  const [to, setTo]                 = useState('');
  const [subject, setSubject]       = useState('');
  const [body, setBody]             = useState('');
  const [sent, setSent]             = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setCompose(false);
      setTo(''); setSubject(''); setBody('');
      setSent(false);
    }, 1400);
  };

  const canSend = to.trim() && body.trim();

  return (
    <>
      <style>{STYLE}</style>
      <div className="msg-screen">

        {/* Header */}
        <div className="msg-topbar">
          <h1>Messaggi</h1>
          <button className="icon-btn" aria-label="Scrivi messaggio" onClick={() => setCompose(true)}>
            <Icon name="edit" size={18}/>
          </button>
        </div>

        {/* Banner notifiche */}
        <div className="notif-banner">
          <div className="notif-banner-icon">🔔</div>
          <div className="notif-banner-text">
            <b>Attiva le notifiche</b>
            <span>Ricevi un avviso quando arriva un messaggio</span>
          </div>
          <button
            className={"notif-btn " + (notifOn ? 'active' : '')}
            onClick={() => setNotifOn(v => !v)}>
            {notifOn ? '✓ Attive' : 'Attiva'}
          </button>
        </div>

        {/* Inbox vuota */}
        <div className="msg-empty">
          <div className="msg-empty-icon">💬</div>
          <h3>Nessun messaggio</h3>
          <p>Quando riceverai messaggi da rifugi, sitter<br/>o altri utenti appariranno qui.</p>
        </div>

        {/* Tipi di messaggio futuri */}
        <div className="msg-types-title">Riceverai messaggi da</div>
        <div className="msg-types-list">
          {MSG_TYPES.map(t => (
            <div key={t.label} className="msg-type-row">
              <div className="msg-type-avatar" style={{ background: t.color + '22' }}>
                {t.icon}
              </div>
              <div className="msg-type-info">
                <b>{t.label}</b>
                <span>{t.desc}</span>
              </div>
              <span className="msg-type-badge" style={{ background: t.color }}>{t.label}</span>
            </div>
          ))}
        </div>

        {/* Bottone componi */}
        <button className="compose-btn" onClick={() => setCompose(true)}>
          <Icon name="edit" size={16}/> Scrivi un messaggio
        </button>
      </div>

      {/* Compose sheet */}
      {composeOpen && (
        <div className="compose-overlay" onClick={() => setCompose(false)}>
          <div className="compose-panel" onClick={e => e.stopPropagation()}>
            <div className="compose-handle"/>
            <h2>{sent ? '✓ Inviato!' : 'Nuovo messaggio'}</h2>
            {!sent && (
              <>
                <div className="compose-field">
                  <label>A (utente, rifugio, sitter…)</label>
                  <input
                    placeholder="Es. Rifugio Amici a 4 Zampe"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                  />
                </div>
                <div className="compose-field">
                  <label>Oggetto</label>
                  <input
                    placeholder="Es. Informazioni su Luna"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </div>
                <div className="compose-field">
                  <label>Messaggio</label>
                  <textarea
                    rows={4}
                    placeholder="Scrivi il tuo messaggio…"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  />
                </div>
                <div className="compose-actions">
                  <button className="compose-cancel" onClick={() => setCompose(false)}>Annulla</button>
                  <button className="compose-send" disabled={!canSend} onClick={handleSend}>
                    Invia
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
