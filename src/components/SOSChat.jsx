import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const CHAT_STYLE = `
  .sos-chat {
    display: flex; flex-direction: column;
    border: 1.5px solid var(--c-line, #eee);
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    height: 420px;
  }
  .sos-chat-head {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--c-line, #eee);
    background: #fff;
    flex-shrink: 0;
  }
  .sos-chat-live {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: #FF5C4D;
  }
  .sos-chat-live-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #FF5C4D;
    animation: blink 1.2s infinite;
  }
  .sos-chat-msgs {
    flex: 1; overflow-y: auto;
    padding: 14px 14px 8px;
    display: flex; flex-direction: column; gap: 10px;
    scroll-behavior: smooth;
  }
  .sos-chat-msgs::-webkit-scrollbar { width: 4px; }
  .sos-chat-msgs::-webkit-scrollbar-track { background: transparent; }
  .sos-chat-msgs::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
  .sos-msg {
    display: flex; gap: 8px; align-items: flex-end;
  }
  .sos-msg.me { flex-direction: row-reverse; }
  .sos-msg-av {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0;
    color: #fff;
  }
  .sos-msg-bubble {
    max-width: 72%;
    padding: 8px 12px;
    border-radius: 16px;
    font-size: 13.5px; line-height: 1.45;
  }
  .sos-msg:not(.me) .sos-msg-bubble {
    background: #f3f3f5;
    border-bottom-left-radius: 4px;
    color: #1f1b2e;
  }
  .sos-msg.me .sos-msg-bubble {
    background: #D4318A;
    border-bottom-right-radius: 4px;
    color: #fff;
  }
  .sos-msg-meta {
    font-size: 10px; color: #aaa; margin-top: 3px;
    display: flex; gap: 4px; align-items: center;
  }
  .sos-msg.me .sos-msg-meta { justify-content: flex-end; }
  .sos-msg-role {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .04em;
  }
  .sos-chat-system {
    text-align: center;
    font-size: 11px; color: #aaa;
    background: #f7f7f7;
    border-radius: 999px;
    padding: 4px 12px;
    align-self: center;
  }
  .sos-chat-quick {
    display: flex; gap: 6px; flex-wrap: wrap;
    padding: 8px 14px 0;
    flex-shrink: 0;
  }
  .sos-chat-quick-btn {
    background: none;
    border: 1.5px solid var(--c-line, #eee);
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 12px; font-weight: 600;
    color: #555;
    cursor: pointer;
    transition: border-color .15s, background .15s;
    white-space: nowrap;
  }
  .sos-chat-quick-btn:hover {
    border-color: #D4318A;
    background: #FCEAF4;
    color: #D4318A;
  }
  .sos-chat-input-row {
    display: flex; gap: 8px; align-items: flex-end;
    padding: 10px 12px max(12px, env(safe-area-inset-bottom));
    border-top: 1px solid var(--c-line, #eee);
    background: #fff;
    flex-shrink: 0;
  }
  .sos-chat-input {
    flex: 1;
    border: 1.5px solid var(--c-line, #eee);
    border-radius: 12px;
    padding: 9px 12px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    max-height: 80px;
    transition: border-color .15s;
    line-height: 1.4;
  }
  .sos-chat-input:focus { border-color: #D4318A; }
  .sos-chat-send {
    width: 38px; height: 38px; border-radius: 12px;
    background: #D4318A; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #fff; flex-shrink: 0;
    transition: opacity .15s;
  }
  .sos-chat-send:disabled { opacity: .4; cursor: default; }
  .sos-chat-send:not(:disabled):hover { opacity: .85; }
  .sos-chat-eta {
    display: flex; gap: 6px; align-items: center;
    padding: 0 14px 10px;
    flex-shrink: 0;
  }
  .sos-chat-eta-label { font-size: 12px; color: #888; }
  .sos-chat-eta-btn {
    background: #FFF0EE; border: 1.5px solid #FF5C4D;
    border-radius: 999px; padding: 4px 12px;
    font-size: 12px; font-weight: 700; color: #FF5C4D;
    cursor: pointer;
  }
`;

const QUICK_REPLIES = [
  '🚗 Sto arrivando!',
  '📍 Sono sul posto',
  '✅ Animale al sicuro',
  '⏱️ ETA 10 min',
  '🏥 Serve un veterinario',
  '🆘 Serve rinforzi',
];

const DEMO_MSGS = [
  { id:1, type:'system', text:'SOS aperto — segnalazione in attesa di risposta' },
  { id:2, from:'Volontario ENPA', role:'Volontario', av:'VE', color:'#6DBF8A', time:'14:32', text:'Visto la segnalazione, mi sto avvicinando dalla zona Prati. ETA circa 12 minuti.' },
  { id:3, from:'Sistema', type:'system', text:'Volontario in arrivo — 12 min' },
  { id:4, from:'Utente segnalante', role:'Segnalante', av:'US', color:'#6BAED6', time:'14:34', text:'È ancora lì, sotto la macchina blu. Sembra una zampa ferita ma è cosciente.' },
  { id:5, from:'Volontario ENPA', role:'Volontario', av:'VE', color:'#6DBF8A', time:'14:35', text:'Grazie, arrivo. Non spaventatelo, restate a distanza.' },
];

export default function SOSChat({ sosId = '001', userName = 'Tu', userColor = '#D4318A' }) {
  const [msgs, setMsgs] = useState(DEMO_MSGS);
  const [input, setInput] = useState('');
  const [etaOpen, setEtaOpen] = useState(false);
  const [eta, setEta] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
    setMsgs(prev => [...prev, {
      id: Date.now(),
      from: userName,
      role: 'Tu',
      av: userName.slice(0,2).toUpperCase(),
      color: userColor,
      time,
      text: text.trim(),
      me: true,
    }]);
    setInput('');
  };

  const sendEta = () => {
    if (!eta) return;
    send(`⏱️ Arrivo in ${eta} minuti`);
    setEta(''); setEtaOpen(false);
  };

  return (
    <>
      <style>{CHAT_STYLE}</style>
      <div className="sos-chat">

        {/* Header */}
        <div className="sos-chat-head">
          <div className="sos-chat-live">
            <div className="sos-chat-live-dot"/>
            LIVE
          </div>
          <div style={{ flex:1, fontWeight:700, fontSize:14 }}>Chat SOS #{sosId}</div>
          <div style={{ fontSize:12, color:'#aaa' }}>{msgs.filter(m=>!m.type).length} partecipanti</div>
        </div>

        {/* Messaggi */}
        <div className="sos-chat-msgs">
          {msgs.map(msg => msg.type === 'system' ? (
            <div key={msg.id} className="sos-chat-system">{msg.text}</div>
          ) : (
            <div key={msg.id} className={`sos-msg${msg.me ? ' me' : ''}`}>
              {!msg.me && (
                <div className="sos-msg-av" style={{ background: msg.color }}>
                  {msg.av}
                </div>
              )}
              <div>
                {!msg.me && (
                  <div style={{ display:'flex', gap:6, alignItems:'center', marginBottom:3, paddingLeft:2 }}>
                    <span style={{ fontSize:12, fontWeight:600 }}>{msg.from}</span>
                    <span className="sos-msg-role" style={{ color: msg.color }}>{msg.role}</span>
                  </div>
                )}
                <div className="sos-msg-bubble">{msg.text}</div>
                <div className="sos-msg-meta">{msg.time}</div>
              </div>
              {msg.me && (
                <div className="sos-msg-av" style={{ background: userColor }}>
                  {userName.slice(0,2).toUpperCase()}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>

        {/* Risposte rapide */}
        <div className="sos-chat-quick">
          {QUICK_REPLIES.map(r => (
            <button key={r} className="sos-chat-quick-btn" onClick={() => send(r)}>{r}</button>
          ))}
        </div>

        {/* ETA row */}
        {etaOpen && (
          <div className="sos-chat-eta">
            <span className="sos-chat-eta-label">Arrivo in</span>
            <input
              type="number" min="1" max="60" placeholder="min"
              value={eta} onChange={e => setEta(e.target.value)}
              style={{ width:56, border:'1.5px solid #FF5C4D', borderRadius:8, padding:'4px 8px', fontSize:13, outline:'none' }}
            />
            <span className="sos-chat-eta-label">minuti</span>
            <button className="sos-chat-eta-btn" onClick={sendEta}>Invia</button>
            <button onClick={() => setEtaOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#aaa', fontSize:16 }}>×</button>
          </div>
        )}

        {/* Input */}
        <div className="sos-chat-input-row">
          <button
            onClick={() => setEtaOpen(v => !v)}
            title="Comunica il tuo ETA"
            style={{ width:38, height:38, borderRadius:12, background:'#FFF0EE', border:'1.5px solid #FF5C4D', cursor:'pointer', fontSize:16, flexShrink:0 }}>
            ⏱️
          </button>
          <textarea
            className="sos-chat-input"
            rows={1}
            placeholder="Scrivi un aggiornamento…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
          />
          <button className="sos-chat-send" disabled={!input.trim()} onClick={() => send(input)}>
            <Icon name="arrow-right" size={16}/>
          </button>
        </div>
      </div>
    </>
  );
}
