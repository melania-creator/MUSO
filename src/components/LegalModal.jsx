import Icon from './Icon';

const DOCS = {
  termini: {
    title: 'Termini di servizio',
    body: [
      { h: 'Accettazione', p: 'Utilizzando MUSO accetti i presenti Termini. Se non li accetti, non utilizzare il servizio.' },
      { h: 'Descrizione del servizio', p: 'MUSO è una piattaforma digitale che connette utenti, rifugi, pet sitter e negozi con l\'obiettivo di favorire la tutela degli animali.' },
      { h: 'Responsabilità degli utenti', p: 'Ogni utente è responsabile delle informazioni inserite. Le segnalazioni SOS devono essere veritiere e tempestive. L\'uso improprio della piattaforma comporta la sospensione dell\'account.' },
      { h: 'Donazioni', p: 'Le donazioni effettuate tramite MUSO sono destinate ai rifugi partner verificati. MUSO non trattiene commissioni sulle donazioni standard.' },
      { h: 'Limitazione di responsabilità', p: 'MUSO agisce da intermediario e non è responsabile delle azioni dei singoli utenti, sitter o rifugi.' },
      { h: 'Modifiche', p: 'Ci riserviamo il diritto di aggiornare questi termini. Le modifiche saranno comunicate via email e notifica in-app.' },
    ],
  },
  privacy: {
    title: 'Informativa privacy',
    body: [
      { h: 'Titolare del trattamento', p: 'MUSO S.r.l., Via Esempio 1, Roma. Contatto DPO: privacy@muso.app' },
      { h: 'Dati raccolti', p: 'Raccogliamo nome, email, posizione (solo quando la condividi attivamente per le segnalazioni SOS), foto caricate, messaggi in-app.' },
      { h: 'Finalità', p: 'I dati sono usati per: erogare il servizio, migliorare la piattaforma, inviare notifiche di servizio, gestire i pagamenti.' },
      { h: 'Conservazione', p: 'I dati sono conservati per il periodo necessario all\'erogazione del servizio e per gli obblighi di legge (max 10 anni per dati fiscali).' },
      { h: 'I tuoi diritti', p: 'Puoi richiedere accesso, rettifica, cancellazione dei tuoi dati scrivendo a privacy@muso.app. Hai diritto di portabilità e opposizione al trattamento.' },
      { h: 'Cookie', p: 'Utilizziamo cookie tecnici necessari al funzionamento. Non installiamo cookie di profilazione di terze parti.' },
    ],
  },
  etico: {
    title: 'Codice etico MUSO',
    body: [
      { h: 'Principio fondamentale', p: 'Il benessere animale viene sempre prima di qualsiasi interesse commerciale o personale.' },
      { h: 'Per gli utenti', p: 'Tratta ogni animale con rispetto. Non pubblicare contenuti violenti o diseducativi. Le segnalazioni false sono vietate e punibili.' },
      { h: 'Per i sitter', p: 'Mantieni gli standard di cura dichiarati. Comunica tempestivamente qualsiasi problema. Non accettare prenotazioni che non sei in grado di gestire.' },
      { h: 'Per i rifugi', p: 'Fornisci informazioni accurate sugli animali. Il processo di adozione deve tutelare sia l\'animale che la famiglia adottante.' },
      { h: 'Per le vetrine', p: 'Offri solo prodotti e servizi sicuri per gli animali. Le donazioni ai rifugi devono essere genuine e non a fini di mera visibilità.' },
      { h: 'Segnalazione violazioni', p: 'Ogni violazione del codice etico può essere segnalata a etico@muso.app. Ogni segnalazione è trattata con riservatezza.' },
    ],
  },
  sitter: {
    title: 'Termini per i sitter',
    body: [
      { h: 'Requisiti', p: 'Per iscriversi come sitter occorre essere maggiorenni, fornire un documento d\'identità valido e superare la verifica MUSO.' },
      { h: 'Copertura assicurativa', p: 'Ogni sitter verificato è coperto dalla polizza MUSO per danni accidentali durante i servizi prenotati tramite piattaforma.' },
      { h: 'Pagamenti', p: 'I pagamenti sono trattenuti in escrow e versati entro 48h dalla conferma fine servizio da parte del cliente. Commissione MUSO: 15%.' },
      { h: 'Cancellazioni', p: 'Cancellazioni entro 48h prima dell\'inizio: rimborso completo al cliente. Cancellazioni tardive ripetute comportano la sospensione del profilo.' },
      { h: 'Standard di qualità', p: 'Un rating medio inferiore a 3.5 stelle dopo 10 recensioni comporta una revisione del profilo e possibile sospensione.' },
    ],
  },
  partner: {
    title: 'Condizioni partner',
    body: [
      { h: 'Accesso alla piattaforma', p: 'Le vetrine partner accedono a un pannello di gestione dedicato per caricare prodotti, gestire promo e visualizzare statistiche.' },
      { h: 'Commissioni', p: 'MUSO non applica commissioni sulle vendite offline. Per le transazioni in-app la commissione è del 10%.' },
      { h: 'Missioni e XP', p: 'Le vetrine guadagnano XP completando missioni. Gli XP determinano il livello e la visibilità nella piattaforma.' },
      { h: 'Contenuti', p: 'I contenuti caricati devono essere veritieri e relativi all\'attività reale. MUSO si riserva di rimuovere contenuti non conformi.' },
      { h: 'Durata', p: 'Il contratto partner ha durata annuale con rinnovo automatico. Il recesso deve essere comunicato 30 giorni prima della scadenza.' },
    ],
  },
};

export default function LegalModal({ doc, onClose }) {
  const d = DOCS[doc];
  if (!d) return null;
  return (
    <div className="legal-overlay" onClick={onClose}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-head">
          <h3>{d.title}</h3>
          <button className="btn btn-ghost" style={{ padding:'4px 8px' }} onClick={onClose}>
            <Icon name="close" size={16}/>
          </button>
        </div>
        <div className="legal-modal-body">
          {d.body.map((s, i) => (
            <div key={i}>
              <h4>{s.h}</h4>
              <p style={{ margin: '0 0 8px' }}>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="legal-modal-foot">
          <button className="btn btn-primary" onClick={onClose}>Ho capito</button>
        </div>
      </div>
    </div>
  );
}
