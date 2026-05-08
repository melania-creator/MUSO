// Configurazione badge e opzioni (non sono dati utente — non vanno azzerati)

export const SITTER_BADGES = {
  verified: { i:'✓',  l:'Verificato',      cls:'bd-mint'  },
  top:      { i:'⭐', l:'Top sitter',       cls:'bd-gold'  },
  firstaid: { i:'🩺', l:'Pet first aid',   cls:'bd-rose'  },
  vet:      { i:'⚕️', l:'Veterinario/a',   cls:'bd-sky'   },
  elite:    { i:'💎', l:'Elite',            cls:'bd-lav'   },
  senior:   { i:'👴', l:'Senior friendly',  cls:'bd-peach' },
  catlover: { i:'🐈', l:'Cat specialist',  cls:'bd-rose'  },
  new:      { i:'🌱', l:'Nuovo',            cls:'bd-mint'  },
};

export const SERVICE_OPTS = [
  { v:'walking', l:'Dog walking',   i:'🚶' },
  { v:'day',     l:'Day care',      i:'🌞' },
  { v:'night',   l:'Pernottamento', i:'🌙' },
  { v:'cat',     l:'Cat sitter',    i:'🐈' },
];

export const SIZE_OPTS = [
  { v:'small',  l:'Piccola' },
  { v:'medium', l:'Media'   },
  { v:'large',  l:'Grande'  },
];

export const SHOP_LEVELS = [
  { lv:1, name:'Cucciolo',    min:0,    max:100,  color:'#C7E8D9' },
  { lv:2, name:'Apprendista', min:100,  max:300,  color:'#FFE39A' },
  { lv:3, name:'Esperto',     min:300,  max:700,  color:'#FFB59B' },
  { lv:4, name:'Veterano',    min:700,  max:1500, color:'#C9B8FF' },
  { lv:5, name:'Leggenda',    min:1500, max:3000, color:'#FFD700' },
];

export const SHOP_BADGES = [
  { id:'first-promo', i:'🎯', l:'Prima promo',        cls:'bd-mint',  desc:'Hai pubblicato la prima offerta' },
  { id:'donor',       i:'💝', l:'Sostenitore',        cls:'bd-rose',  desc:'Hai donato a un rifugio partner' },
  { id:'eco',         i:'🌿', l:'Eco-friendly',       cls:'bd-mint',  desc:'Prodotti certificati sostenibili' },
  { id:'fast',        i:'⚡', l:'Risposta lampo',      cls:'bd-gold',  desc:'Rispondi in < 1h' },
  { id:'reviews',     i:'⭐', l:'100 recensioni',     cls:'bd-gold',  desc:'Hai superato 100 recensioni' },
  { id:'rescue',      i:'🐾', l:'Pet rescue partner', cls:'bd-peach', desc:'Hai ospitato un evento adozione' },
  { id:'top',         i:'👑', l:'Top zona',           cls:'bd-lav',   desc:'#1 della tua zona' },
  { id:'minigame',    i:'🎮', l:'Maestro mini-game',  cls:'bd-sky',   desc:'5 mini-game completati' },
];

// Dati utente — vuoti, si riempiono con il backend
export const STORES  = [];
export const SITTERS = [];
