import { useState } from 'react';
import Icon from '../components/Icon';

const PETS = [
  { name:'Luna',    species:'Cane',  breed:'Meticcio', age:'2 anni',  gender:'F', size:'Media',  bg:'bg-grad-1', emoji:'🐕',   shelter:'ENPA Milano',      city:'Milano',  tags:['Sterilizzata','Buona con bambini'] },
  { name:'Pepe',    species:'Gatto', breed:'Europeo',  age:'5 mesi',  gender:'M', size:'Piccola',bg:'bg-grad-2', emoji:'🐈',   shelter:'Gattile Cinisello',city:'Milano',  tags:['Vaccinato','Indoor'] },
  { name:'Briciola',species:'Cane',  breed:'Beagle',   age:'4 anni',  gender:'F', size:'Media',  bg:'bg-grad-3', emoji:'🐶',   shelter:'Lega del Cane',    city:'Bergamo', tags:['Energica','Adora correre'] },
  { name:'Otto',    species:'Cane',  breed:'Pastore',  age:'7 anni',  gender:'M', size:'Grande', bg:'bg-grad-4', emoji:'🐕‍🦺',shelter:'Canile di Lodi',   city:'Lodi',    tags:['Senior','Calmo'] },
  { name:'Zoe',     species:'Gatto', breed:'Siberiano',age:'3 anni',  gender:'F', size:'Media',  bg:'bg-grad-5', emoji:'🐱',   shelter:'Casa dei Gatti',   city:'Como',    tags:['Coccolona'] },
  { name:'Rocco',   species:'Cane',  breed:'Pitbull',  age:'1 anno',  gender:'M', size:'Grande', bg:'bg-grad-6', emoji:'🐕',   shelter:'ENPA Brescia',     city:'Brescia', tags:['Educato','Cerca famiglia attiva'] },
  { name:'Mimì',    species:'Gatto', breed:'Persiano', age:'8 anni',  gender:'F', size:'Piccola',bg:'bg-grad-1', emoji:'🐈‍⬛',shelter:'Gattile Lodi',     city:'Lodi',    tags:['Senior','Solo casa tranquilla'] },
  { name:'Toby',    species:'Cane',  breed:'Labrador', age:'6 mesi',  gender:'M', size:'Media',  bg:'bg-grad-3', emoji:'🐶',   shelter:'ENPA Como',        city:'Como',    tags:['Cucciolo','Iperattivo'] },
];

export default function ScreenAdopt({ openDetail }) {
  const [filter, setFilter] = useState('Tutti');
  const visible = filter === 'Tutti' ? PETS : PETS.filter(p => p.species === filter);
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Adotta. <em>Cambia una vita.</em><br/>Anche la tua.</h1>
          <div className="sub">{PETS.length} animali da rifugi e associazioni verificate vicino a te.</div>
        </div>
        <div className="ph-actions">
          <button className="btn"><Icon name="filter" size={14}/> Filtri avanzati</button>
          <button className="btn btn-primary"><Icon name="heart" size={14}/> I tuoi preferiti</button>
        </div>
      </div>
      <div className="filter-bar">
        {['Tutti','Cane','Gatto','Conigli','Altri'].map(s => (
          <button key={s} className={"chip " + (filter === s ? 'active' : '')} onClick={() => setFilter(s)}>{s}</button>
        ))}
        <span className="filter-divider"></span>
        <button className="chip">Taglia: tutte</button>
        <button className="chip">Età: qualsiasi</button>
        <button className="chip"><Icon name="pin" size={12}/> Tutta Italia</button>
        <span className="filter-divider"></span>
        <button className="chip"><Icon name="check" size={12}/> Solo urgenti</button>
      </div>
      <div className="grid-4">
        {visible.map((p, i) => (
          <div key={i} className="pet-card"
               onClick={() => openDetail && openDetail({type:'adopt', id:p.name, data:{name:p.name, age:p.age + ' · ' + p.gender, shelter:p.shelter, bg:p.bg, emoji:p.emoji, tag:p.tags[0]}})}>
            <div className={"pet-photo " + p.bg}>
              <div className="face">{p.emoji}</div>
              <div className="ph-tags">
                {p.tags[0] && <span className="tag tag-mint">{p.tags[0]}</span>}
                <button className="heart" onClick={e=>e.stopPropagation()}><Icon name="heart" size={14}/></button>
              </div>
            </div>
            <div className="pet-body">
              <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between'}}>
                <span className="pet-name">{p.name}</span>
                <span style={{fontSize:12,color:'var(--c-ink-mute)'}}>{p.gender}</span>
              </div>
              <div className="pet-meta">
                <span>{p.breed}</span><span className="dot"></span>
                <span>{p.age}</span><span className="dot"></span>
                <span>{p.size}</span>
              </div>
              <div className="pet-shelter"><Icon name="shelter" size={12}/> da <b>{p.shelter}</b> · {p.city}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
