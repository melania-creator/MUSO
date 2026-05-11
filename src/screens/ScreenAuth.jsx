import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/Icon';
import logoSrc from '../assets/LogoMuso.png';
import sfondoBg from '../assets/sfondoHOME.png';

const CITIES = ['Roma','Milano','Napoli','Torino','Bologna','Firenze','Palermo','Bari','Catania','Venezia'];

const ROLES = [
  { id: 'user',    label: 'Utente',     desc: 'Adotto, segnalo, dono',    icon: 'sitter',  color: '#C9B8FF' },
  { id: 'sitter',  label: 'Pet Sitter', desc: 'Offro servizi di cura',    icon: 'paw',     color: '#6BAED6' },
  { id: 'rifugio', label: 'Rifugio',    desc: 'Gestisco un rifugio',      icon: 'shelter', color: '#6DBF8A' },
  { id: 'shop',    label: 'Vetrina',    desc: 'Ho un negozio pet',        icon: 'shop',    color: '#F5C842' },
];

export default function ScreenAuth() {
  const { login, register, loginWithProvider } = useAuth();
  const [mode, setMode]               = useState('login');
  const [form, setForm]               = useState({ name: '', email: '', password: '', role: 'user', city: 'Roma' });
  const [showPwd, setShowPwd]         = useState(false);
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [socialModal, setSocialModal] = useState(null); // { provider, name, email }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const switchMode = (m) => { setMode(m); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register({ name: form.name, email: form.email, password: form.password, role: form.role, city: form.city });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openSocialModal = (provider) => {
    setSocialModal({
      provider,
      name:  provider === 'google' ? 'Utente Google' : 'Utente Apple',
      email: '',
    });
    setError('');
  };

  const handleSocialConfirm = async () => {
    if (!socialModal.email.trim()) { setError('Inserisci la tua email'); return; }
    setError('');
    setLoading(true);
    try {
      await loginWithProvider(socialModal.provider, { name: socialModal.name, email: socialModal.email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillTest = () => {
    if (mode === 'login') {
      setForm(f => ({ ...f, email: 'test@muso.app', password: 'test123' }));
    } else {
      setForm({ name: 'Annalisa Melania', email: 'test@muso.app', password: 'test123', role: 'user', city: 'Roma' });
    }
    setError('');
  };

  return (
    <div className="auth-screen">
      <div className="auth-bg" style={{ backgroundImage: `url(${sfondoBg})` }} />
      <div className="auth-overlay" />

      <div className="auth-wrap">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-brand">
            <img src={logoSrc} alt="MUSO" className="auth-logo" />
            <span className="auth-brand-name">MU<em>SO</em></span>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className={'auth-tab' + (mode === 'login'    ? ' active' : '')} onClick={() => switchMode('login')}>Accedi</button>
            <button className={'auth-tab' + (mode === 'register' ? ' active' : '')} onClick={() => switchMode('register')}>Registrati</button>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {mode === 'register' && (
              <>
                <div className="auth-field">
                  <label>Nome completo</label>
                  <input
                    type="text" autoComplete="name" placeholder="Mario Rossi"
                    value={form.name} onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label>Sei qui come…</label>
                  <div className="auth-roles">
                    {ROLES.map(r => (
                      <button key={r.id} type="button"
                        className={'auth-role-card' + (form.role === r.id ? ' selected' : '')}
                        style={form.role === r.id ? { borderColor: r.color, background: r.color + '22' } : {}}
                        onClick={() => set('role', r.id)}
                      >
                        <span className="auth-role-icon" style={{ background: r.color + '33', color: r.color }}>
                          <Icon name={r.icon} size={18} />
                        </span>
                        <span className="auth-role-label">{r.label}</span>
                        <span className="auth-role-desc">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="auth-field">
              <label>Email</label>
              <input
                type="email" autoComplete="email" placeholder="nome@email.com"
                value={form.email} onChange={e => set('email', e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-pwd-wrap">
                <input
                  type={showPwd ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder={mode === 'login' ? '••••••••' : 'Almeno 6 caratteri'}
                  value={form.password} onChange={e => set('password', e.target.value)}
                  required
                />
                <button type="button" className="auth-pwd-toggle" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
              {mode === 'login' && (
                <span className="auth-forgot">Password dimenticata?</span>
              )}
            </div>

            {mode === 'register' && (
              <div className="auth-field">
                <label>Città</label>
                <select value={form.city} onChange={e => set('city', e.target.value)}>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {error && <div className="auth-error"><Icon name="sos" size={14} /> {error}</div>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading
                ? <span className="auth-spinner" />
                : (mode === 'login' ? 'Accedi' : 'Registrati')
              }
            </button>
          </form>

          {/* Social */}
          <div className="auth-divider"><span>oppure continua con</span></div>
          <div className="auth-social">
            <button type="button" className="auth-social-btn" onClick={() => openSocialModal('google')}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button type="button" className="auth-social-btn" onClick={() => openSocialModal('apple')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          {/* Switch mode */}
          <p className="auth-switch">
            {mode === 'login'
              ? <>Non hai un account? <button type="button" onClick={() => switchMode('register')}>Registrati</button></>
              : <>Hai già un account? <button type="button" onClick={() => switchMode('login')}>Accedi</button></>
            }
          </p>

          {/* Test helper */}
          <button type="button" className="auth-test-btn" onClick={fillTest}>
            🧪 Usa dati di test (test@muso.app / test123)
          </button>
        </div>
      </div>

      {/* Social OAuth simulation modal */}
      {socialModal && (
        <div className="auth-social-overlay" onClick={() => setSocialModal(null)}>
          <div className="auth-social-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-social-modal-header">
              {socialModal.provider === 'google'
                ? <><svg width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Simulazione Google OAuth</>
                : <><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> Simulazione Apple Sign-in</>
              }
            </div>
            <p className="auth-social-modal-note">
              In produzione si aprirà il popup OAuth del provider.<br/>Per il test inserisci i tuoi dati.
            </p>
            <div className="auth-field">
              <label>Nome</label>
              <input type="text" value={socialModal.name}
                onChange={e => setSocialModal(m => ({ ...m, name: e.target.value }))} />
            </div>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="nome@email.com" value={socialModal.email}
                onChange={e => setSocialModal(m => ({ ...m, email: e.target.value }))} />
            </div>
            {error && <div className="auth-error"><Icon name="sos" size={14} /> {error}</div>}
            <div className="auth-social-modal-actions">
              <button type="button" className="auth-social-modal-cancel" onClick={() => setSocialModal(null)}>Annulla</button>
              <button type="button" className="auth-submit" style={{ flex:1 }} onClick={handleSocialConfirm} disabled={loading}>
                {loading ? <span className="auth-spinner" /> : 'Conferma'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
