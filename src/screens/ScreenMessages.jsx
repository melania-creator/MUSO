import { useState } from 'react';
import Icon from '../components/Icon';

const CONVERSATIONS = [
  {
    id: 1,
    avatar: '🏠',
    name: 'Rifugio Amici a 4 Zampe',
    preview: 'Ciao! Luna è ancora disponibile per l\'adozione. Vuoi fissare una visita?',
    time: '10:32',
    unread: 2,
    tag: 'Adozione',
    tagColor: '#6DBF8A',
  },
  {
    id: 2,
    avatar: '🐕',
    name: 'SOS Cane Ferito — Via Merulana',
    preview: 'Grazie per la segnalazione! Il cane è stato soccorso dai volontari.',
    time: 'Ieri',
    unread: 0,
    tag: 'SOS',
    tagColor: '#FF5C4D',
  },
  {
    id: 3,
    avatar: '👤',
    name: 'Giulia R. — Pet Sitter',
    preview: 'Perfetto, confermo la settimana dal 12 al 19. Porto anche le crocchette.',
    time: 'Ieri',
    unread: 0,
    tag: 'Sitter',
    tagColor: '#6BAED6',
  },
  {
    id: 4,
    avatar: '🏠',
    name: 'Rifugio Canile Roma Nord',
    preview: 'Ha risposto alla tua richiesta di informazioni.',
    time: 'Lun',
    unread: 1,
    tag: 'Rifugio',
    tagColor: '#C9B8FF',
  },
  {
    id: 5,
    avatar: '🐈',
    name: 'SOS Gatto Bloccato — Prati',
    preview: 'Risolto ✓ Il gatto è stato liberato. Grazie!',
    time: 'Dom',
    unread: 0,
    tag: 'SOS',
    tagColor: '#FF5C4D',
  },
];

const STYLE = `
  .msg-screen { padding: 24px 20px; max-width: 680px; margin: 0 auto; }
  .msg-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .msg-header h1 { font-size: 22px; font-weight: 700; margin: 0; }
  .msg-search {
    display: flex; align-items: center; gap: 10px;
    background: var(--c-bg, #f9f7f4);
    border: 1.5px solid var(--c-line, #eee);
    border-radius: 12px;
    padding: 10px 14px;
    margin-bottom: 16px;
    color: var(--c-ink-mute, #999);
    font-size: 14px;
  }
  .msg-list { display: flex; flex-direction: column; gap: 2px; }
  .msg-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 12px;
    border-radius: 14px;
    cursor: pointer;
    transition: background .12s;
    text-align: left;
    background: none;
    border: none;
    width: 100%;
  }
  .msg-item:hover { background: var(--c-bg, #f9f7f4); }
  .msg-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--c-bg, #f2f0ed);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
    border: 1.5px solid var(--c-line, #eee);
  }
  .msg-body { flex: 1; min-width: 0; }
  .msg-row1 { display: flex; align-items: center; gap: 8px; margin-bottom: 3px; }
  .msg-name { font-size: 14px; font-weight: 600; color: var(--c-ink, #1f1b2e); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .msg-tag { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 999px; white-space: nowrap; }
  .msg-time { font-size: 11px; color: var(--c-ink-mute, #999); margin-left: auto; white-space: nowrap; }
  .msg-preview { font-size: 13px; color: var(--c-ink-mute, #999); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .msg-unread {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--c-accent, #D4318A);
    color: #fff; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .msg-empty {
    text-align: center; padding: 60px 20px;
    color: var(--c-ink-mute, #999);
  }
  .msg-empty-icon { font-size: 48px; margin-bottom: 12px; }
  .msg-empty p { font-size: 14px; margin: 0; }
  .msg-item.unread .msg-name { color: var(--c-ink, #1f1b2e); }
  .msg-item.unread .msg-preview { color: var(--c-ink, #1f1b2e); font-weight: 500; }
`;

export default function ScreenMessages() {
  const [search, setSearch] = useState('');

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{STYLE}</style>
      <div className="msg-screen">
        <div className="msg-header">
          <h1>Messaggi</h1>
          <button className="icon-btn" aria-label="Nuovo messaggio">
            <Icon name="edit" size={18} />
          </button>
        </div>

        <div className="msg-search">
          <Icon name="search" size={15} />
          <input
            style={{ background: 'none', border: 'none', outline: 'none', flex: 1, fontSize: 14, color: 'var(--c-ink)' }}
            placeholder="Cerca conversazioni…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="msg-list">
          {filtered.length === 0 ? (
            <div className="msg-empty">
              <div className="msg-empty-icon">💬</div>
              <p>Nessuna conversazione trovata</p>
            </div>
          ) : filtered.map(c => (
            <button key={c.id} className={"msg-item " + (c.unread > 0 ? 'unread' : '')}>
              <div className="msg-avatar">{c.avatar}</div>
              <div className="msg-body">
                <div className="msg-row1">
                  <span className="msg-name">{c.name}</span>
                  <span className="msg-tag" style={{ background: c.tagColor + '22', color: c.tagColor }}>{c.tag}</span>
                  <span className="msg-time">{c.time}</span>
                </div>
                <div className="msg-preview">{c.preview}</div>
              </div>
              {c.unread > 0 && <div className="msg-unread">{c.unread}</div>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
