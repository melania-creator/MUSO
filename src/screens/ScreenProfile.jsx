import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';

const ROLE_META = {
  user:    { label: 'Utente',     color: '#C9B8FF', icon: 'sitter'  },
  sitter:  { label: 'Pet Sitter', color: '#6BAED6', icon: 'paw'     },
  rifugio: { label: 'Rifugio',    color: '#6DBF8A', icon: 'shelter' },
  shop:    { label: 'Vetrina',    color: '#F5C842', icon: 'shop'    },
};

function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');
}

export default function ScreenProfile({ onBack }) {
  const { user, logout, updateProfile } = useAuth();
  const [editMode, setEditMode]   = useState(false);
  const [editForm, setEditForm]   = useState({ name: user?.name || '', city: user?.city || 'Roma' });
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');

  if (!user) return null;

  const role = ROLE_META[user.role] || ROLE_META.user;
  const initials = getInitials(user.name);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name: editForm.name, city: editForm.city });
      setSaveMsg('Salvato ✓');
      setTimeout(() => { setSaveMsg(''); setEditMode(false); }, 1400);
    } catch { setSaveMsg('Errore nel salvataggio'); }
    finally { setSaving(false); }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-screen">
      {/* Header */}
      <div className="profile-header">
        <button className="profile-back" onClick={onBack} aria-label="Indietro">
          <Icon name="arrow-left" size={20} />
        </button>

        <div className="profile-avatar-wrap">
          <div className="profile-avatar">{initials}</div>
        </div>

        {!editMode ? (
          <>
            <h2 className="profile-name">{user.name}</h2>
            <div className="profile-meta">
              <span className="profile-role-badge" style={{ background: role.color + '33', color: role.color }}>
                <Icon name={role.icon} size={12} /> {role.label}
              </span>
              <span className="profile-city">📍 {user.city}</span>
            </div>
            <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
              <Icon name="edit" size={13} /> Modifica profilo
            </button>
          </>
        ) : (
          <div className="profile-edit-form">
            <input
              className="profile-edit-input"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Nome completo"
            />
            <select
              className="profile-edit-input"
              value={editForm.city}
              onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))}
            >
              {['Roma','Milano','Napoli','Torino','Bologna','Firenze','Palermo','Bari','Catania','Venezia']
                .map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="profile-edit-actions">
              <button className="profile-edit-cancel" onClick={() => setEditMode(false)}>Annulla</button>
              <button className="profile-edit-save" onClick={handleSave} disabled={saving}>
                {saving ? '…' : saveMsg || 'Salva'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email (read-only) */}
      <div className="profile-body">
        <div className="profile-info-row">
          <span className="profile-info-label">Email</span>
          <span className="profile-info-value">{user.email}</span>
        </div>
        {user.provider && user.provider !== 'email' && (
          <div className="profile-info-row">
            <span className="profile-info-label">Accesso tramite</span>
            <span className="profile-info-value" style={{ textTransform: 'capitalize' }}>{user.provider}</span>
          </div>
        )}
        <div className="profile-info-row">
          <span className="profile-info-label">Membro dal</span>
          <span className="profile-info-value">
            {new Date(user.createdAt).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Menu sezioni */}
        <div className="profile-section-title">La mia attività</div>
        <div className="profile-menu">
          {[
            { icon: 'sos',     label: 'Le mie segnalazioni SOS', count: 0 },
            { icon: 'paw',     label: 'Adozioni seguite',        count: 0 },
            { icon: 'heart',   label: 'Le mie donazioni',        count: 0 },
            { icon: 'message', label: 'Messaggi',                count: 0 },
          ].map(item => (
            <div key={item.icon} className="profile-menu-item">
              <span className="profile-menu-icon"><Icon name={item.icon} size={16} /></span>
              <span className="profile-menu-label">{item.label}</span>
              <span className="profile-menu-count">{item.count}</span>
              <Icon name="arrow-right" size={14} />
            </div>
          ))}
        </div>

        <div className="profile-section-title">Impostazioni</div>
        <div className="profile-menu">
          {[
            { icon: 'bell',   label: 'Notifiche' },
            { icon: 'shield', label: 'Privacy e sicurezza' },
          ].map(item => (
            <div key={item.icon} className="profile-menu-item">
              <span className="profile-menu-icon"><Icon name={item.icon} size={16} /></span>
              <span className="profile-menu-label">{item.label}</span>
              <Icon name="arrow-right" size={14} />
            </div>
          ))}
        </div>

        <button className="profile-logout-btn" onClick={handleLogout}>
          Esci dall'account
        </button>
      </div>
    </div>
  );
}
