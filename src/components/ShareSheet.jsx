import { useState } from 'react';

const SHARE_STYLE = `
  .share-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,.45);
    z-index: 11000;
    display: flex; align-items: flex-end; justify-content: center;
  }
  @media (min-width: 600px) {
    .share-backdrop { align-items: center; }
    .share-panel { border-radius: 20px !important; max-width: 480px; margin: 0 auto; }
  }
  .share-panel {
    background: #fff;
    border-radius: 20px 20px 0 0;
    width: 100%;
    padding: 20px 20px max(20px, env(safe-area-inset-bottom));
    box-shadow: 0 -8px 40px rgba(0,0,0,.18);
  }
  .share-handle {
    width: 36px; height: 4px;
    border-radius: 999px;
    background: #ddd;
    margin: 0 auto 18px;
  }
  .share-title {
    font-size: 17px; font-weight: 700;
    margin-bottom: 4px;
  }
  .share-sub {
    font-size: 13px; color: #888;
    margin-bottom: 14px;
  }
  .share-textarea {
    width: 100%; box-sizing: border-box;
    border: 1.5px solid #eee;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    font-family: inherit;
    color: #1f1b2e;
    background: #f9f7f4;
    outline: none;
    margin-bottom: 16px;
    transition: border-color .15s;
  }
  .share-textarea:focus { border-color: #D4318A; background: #fff; }
  .share-socials {
    display: flex; gap: 10px; flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .share-btn {
    display: flex; flex-direction: column;
    align-items: center; gap: 6px;
    flex: 1; min-width: 56px;
    background: none; border: none;
    cursor: pointer; padding: 4px 0;
    font-size: 11px; font-weight: 600;
    color: #555;
    transition: transform .12s;
  }
  .share-btn:hover { transform: translateY(-2px); }
  .share-btn:active { transform: scale(.95); }
  .share-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    font-weight: 900;
    color: #fff;
  }
  .share-copy-row {
    display: flex; gap: 8px; align-items: center;
    background: #f3f3f3;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 12px; color: #888;
    margin-bottom: 16px;
  }
  .share-copy-row span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .share-copy-btn {
    background: none; border: none; cursor: pointer;
    font-size: 12px; font-weight: 700; color: #D4318A; padding: 0;
    white-space: nowrap;
  }
  .share-copied {
    font-size: 12px; color: #2EA37A; font-weight: 600;
    text-align: center; margin-bottom: 8px;
  }
`;

const SOCIALS = [
  {
    id: 'facebook',
    label: 'Facebook',
    bg: '#1877F2',
    icon: 'f',
    share: (text, url) => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400'),
  },
  {
    id: 'x',
    label: 'X',
    bg: '#000',
    icon: '𝕏',
    share: (text, url) => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + '\n' + url)}`, '_blank', 'width=600,height=400'),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    bg: '#25D366',
    icon: '💬',
    share: (text, url) => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n' + url)}`, '_blank'),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    icon: '📷',
    share: (text) => {
      if (navigator.share) {
        navigator.share({ title: 'MUSO', text }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(text);
      }
    },
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    bg: '#010101',
    icon: '♪',
    share: (text) => {
      if (navigator.share) {
        navigator.share({ title: 'MUSO', text }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(text);
      }
    },
  },
];

const APP_URL = 'https://musoapp.it';

export default function ShareSheet({ open, onClose, title, defaultText }) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const shareText = text || defaultText || title || 'Condivido questa segnalazione da MUSO — la rete di persone che salva gli animali.';

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareText + '\n' + APP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{SHARE_STYLE}</style>
      <div className="share-backdrop" onClick={onClose}>
        <div className="share-panel" onClick={e => e.stopPropagation()}>
          <div className="share-handle" />
          <div className="share-title">Condividi sui social</div>
          <div className="share-sub">Scrivi un messaggio o usa quello suggerito — poi scegli dove condividere.</div>

          <textarea
            className="share-textarea"
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={defaultText}
          />

          <div className="share-socials">
            {SOCIALS.map(s => (
              <button key={s.id} className="share-btn" onClick={() => s.share(shareText, APP_URL)}>
                <div className="share-icon" style={{ background: s.bg }}>{s.icon}</div>
                {s.label}
              </button>
            ))}
          </div>

          <div className="share-copy-row">
            <span>{APP_URL}</span>
            <button className="share-copy-btn" onClick={handleCopy}>
              {copied ? '✓ Copiato' : 'Copia link'}
            </button>
          </div>

          {copied && <div className="share-copied">Link copiato negli appunti!</div>}

          <button
            style={{ width:'100%', padding:'13px', borderRadius:12, border:'none', background:'#f3f3f3', fontWeight:600, fontSize:14, cursor:'pointer' }}
            onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </>
  );
}
