/**
 * authService — layer di astrazione autenticazione.
 *
 * Implementazione attuale: mock localStorage (per sviluppo/test UI).
 * Per passare a produzione (Firebase, Supabase, custom API) sostituire
 * solo le funzioni qui sotto — il resto dell'app non cambia.
 *
 * Interfaccia pubblica:
 *   getCurrentUser()                     → User | null
 *   login(email, password)               → Promise<User>
 *   register({ name, email, password, role, city }) → Promise<User>
 *   loginWithProvider(provider, { name, email })    → Promise<User>
 *   logout()                             → void
 *   updateProfile(updates)               → Promise<User>
 */

const USER_KEY  = 'muso_auth_user';
const USERS_KEY = 'muso_users';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Account di test pre-seeded
function seedTestUser() {
  const users = getUsers();
  if (!users.find(u => u.email === 'test@muso.app')) {
    users.push({
      id: 'test_user_1',
      name: 'Andrea Martini',
      email: 'test@muso.app',
      password: 'test123',
      role: 'user',
      city: 'Roma',
      provider: 'email',
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
  }
}
seedTestUser();

export const authService = {
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  async login(email, password) {
    await delay(450);
    const users = getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!user) throw new Error('Email o password non corretti');
    const { password: _, ...safe } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(safe));
    return safe;
  },

  async register({ name, email, password, role, city }) {
    await delay(550);
    if (!name.trim())         throw new Error('Inserisci il tuo nome');
    if (!email.trim())        throw new Error('Inserisci la tua email');
    if (password.length < 6)  throw new Error('La password deve avere almeno 6 caratteri');
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('Esiste già un account con questa email');
    }
    const user = {
      id: `local_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      city,
      provider: 'email',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    const { password: _, ...safe } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(safe));
    return safe;
  },

  // provider: 'google' | 'apple'
  async loginWithProvider(provider, { name, email }) {
    await delay(400);
    if (!name.trim() || !email.trim()) throw new Error('Dati non validi');
    const users = getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      user = {
        id: `${provider}_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: null,
        role: 'user',
        city: 'Roma',
        provider,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      saveUsers(users);
    }
    const { password: _, ...safe } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(safe));
    return safe;
  },

  logout() {
    localStorage.removeItem(USER_KEY);
  },

  async updateProfile(updates) {
    await delay(300);
    const current = this.getCurrentUser();
    if (!current) throw new Error('Non autenticato');
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    const users = getUsers();
    const idx = users.findIndex(u => u.id === current.id);
    if (idx >= 0) { users[idx] = { ...users[idx], ...updates }; saveUsers(users); }
    return updated;
  },
};
