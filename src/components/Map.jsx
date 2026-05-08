import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ================================================================
// FORNITORE MAPPA: Leaflet + OpenStreetMap (100% gratuito, no API key)
// Geocoding: Nominatim (OpenStreetMap) — gratuito, no API key
// ================================================================
// Per passare a Google Maps (con investitori):
//   1. console.cloud.google.com → crea progetto → abilita "Maps JavaScript API"
//   2. npm remove leaflet
//   3. npm install @googlemaps/js-api-loader
//   4. Sostituisci SOLO questo file — il resto dell'app usa sempre <MapView pins={...} />
// ================================================================

const ROME = [41.9028, 12.4964];

const PIN_COLORS = {
  sos:     '#FF5C4D',
  warn:    '#F5A623',
  success: '#34C759',
  user:    '#007AFF',
  select:  '#9B59B6',
};
const PIN_ICONS = {
  sos:     '🐾',
  warn:    '⚠️',
  success: '✓',
  user:    '📍',
  select:  '📌',
};

function makeIcon(type) {
  const color = PIN_COLORS[type] || PIN_COLORS.sos;
  const icon  = PIN_ICONS[type]  || '🐾';
  return L.divIcon({
    html: `<div style="
      background:${color};color:#fff;
      border:2.5px solid #fff;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);width:30px;height:30px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,.28);font-size:13px;
    "><span style="transform:rotate(45deg)">${icon}</span></div>`,
    className: '', iconSize: [30,30], iconAnchor: [15,30], popupAnchor: [0,-32],
  });
}

const MAP_STYLE = `
  .map-geo-btn {
    position: absolute;
    right: 10px;
    z-index: 999;
    width: 36px; height: 36px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid rgba(0,0,0,.15);
    box-shadow: 0 2px 6px rgba(0,0,0,.12);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px;
    transition: background .15s;
  }
  .map-geo-btn:hover { background: #f5f5f5; }
  .map-geo-btn.locating { animation: pulse-geo .8s infinite alternate; }
  @keyframes pulse-geo { from { opacity:1; } to { opacity:.4; } }

  .map-search-wrap {
    position: absolute;
    top: 10px; left: 10px; right: 54px;
    z-index: 999;
  }
  .map-search-input-row {
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,.14);
    padding: 0 10px;
    gap: 6px;
    height: 36px;
  }
  .map-search-input-row input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 13px;
    background: transparent;
    color: var(--c-ink, #1f1b2e);
    min-width: 0;
  }
  .map-search-input-row input::placeholder { color: #aaa; }
  .map-search-clear {
    background: none; border: none;
    cursor: pointer; color: #aaa;
    font-size: 17px; padding: 0; line-height: 1;
  }
  .map-search-clear:hover { color: #555; }
  .map-search-results {
    background: #fff;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0,0,0,.13);
    margin-top: 6px;
    overflow: hidden;
    max-height: 220px;
    overflow-y: auto;
  }
  .map-search-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 14px;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-size: 13px;
    border-bottom: 1px solid #f0f0f0;
    transition: background .1s;
  }
  .map-search-item:last-child { border-bottom: none; }
  .map-search-item:hover { background: #f7f7f7; }
  .map-search-item-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .map-search-item-name { font-weight: 600; color: var(--c-ink, #1f1b2e); line-height: 1.3; }
  .map-search-item-sub  { font-size: 11px; color: #888; margin-top: 2px; line-height: 1.3; }
  .map-search-loading {
    padding: 14px;
    text-align: center;
    font-size: 13px;
    color: #888;
  }
  .map-click-hint {
    position: absolute;
    bottom: 10px; left: 10px;
    z-index: 999;
    background: rgba(255,255,255,.92);
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    color: #555;
    pointer-events: none;
    box-shadow: 0 1px 4px rgba(0,0,0,.1);
  }
`;

// Nominatim geocoding — gratuito, nessuna API key
async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'it,en' } });
  if (!res.ok) throw new Error('geocode failed');
  return res.json();
}

function buildLabel(item) {
  const a = item.address || {};
  const nameParts = [
    a.road || a.pedestrian || a.footway || a.suburb,
    a.house_number,
  ].filter(Boolean).join(' ');
  const city = a.city || a.town || a.village || a.municipality || a.county;
  const region = a.state;
  const name = nameParts || item.display_name.split(',')[0];
  const sub = [city, region].filter(Boolean).join(', ');
  return { name, sub };
}

function placeIcon(item) {
  const t = item.addresstype || item.type || '';
  if (['city','town','village','municipality'].includes(t)) return '🏙️';
  if (['road','street','pedestrian','footway'].includes(t)) return '🛣️';
  if (['country'].includes(t)) return '🌍';
  if (['park','nature_reserve'].includes(t)) return '🌳';
  return '📍';
}

export default function MapView({
  pins           = [],
  center,
  zoom           = 13,
  style          = {},
  showSearch     = true,
  selectable     = false,   // click su mappa → chiama onLocationSelect
  onLocationSelect,         // ({ lat, lng, label }) => void
}) {
  const containerRef    = useRef(null);
  const mapRef          = useRef(null);
  const markersRef      = useRef([]);
  const userMarkerRef   = useRef(null);
  const selectMarkerRef = useRef(null);
  const searchTimer     = useRef(null);

  const [locating, setLocating]       = useState(false);
  const [query, setQuery]             = useState('');
  const [results, setResults]         = useState([]);
  const [searching, setSearching]     = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ── Init mappa ──
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: center || ROME,
      zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    if (!center && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const latlng = [pos.coords.latitude, pos.coords.longitude];
          map.setView(latlng, zoom);
          if (userMarkerRef.current) userMarkerRef.current.remove();
          userMarkerRef.current = L.marker(latlng, { icon: makeIcon('user') })
            .bindPopup('<b>Sei qui</b>')
            .addTo(map);
        },
        () => {}
      );
    }

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // ── Click su mappa per scegliere posizione ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectable) return;
    const handler = (e) => {
      const { lat, lng } = e.latlng;
      if (selectMarkerRef.current) selectMarkerRef.current.remove();
      selectMarkerRef.current = L.marker([lat, lng], { icon: makeIcon('select') })
        .bindPopup('<b>Posizione selezionata</b>')
        .addTo(map)
        .openPopup();
      onLocationSelect?.({ lat: lat.toFixed(5), lng: lng.toFixed(5), label: 'Posizione sulla mappa' });
    };
    map.on('click', handler);
    return () => map.off('click', handler);
  }, [selectable, onLocationSelect]);

  // ── Aggiorna i pin ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = pins.map(pin => {
      const marker = L.marker([pin.lat, pin.lng], { icon: makeIcon(pin.type) });
      if (pin.label) {
        marker.bindPopup(
          `<b>${pin.label}</b>${pin.meta ? `<br/><span style="font-size:12px;color:#666">${pin.meta}</span>` : ''}`
        );
      }
      return marker.addTo(map);
    });
  }, [pins]);

  // ── Ricerca con debounce 400ms ──
  useEffect(() => {
    clearTimeout(searchTimer.current);
    if (query.trim().length < 2) { setResults([]); setShowResults(false); return; }
    searchTimer.current = setTimeout(async () => {
      setSearching(true);
      setShowResults(true);
      try {
        const data = await geocode(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
  }, [query]);

  const goToMyLocation = () => {
    if (!navigator.geolocation || !mapRef.current) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        mapRef.current.setView(latlng, 15);
        if (userMarkerRef.current) userMarkerRef.current.remove();
        userMarkerRef.current = L.marker(latlng, { icon: makeIcon('user') })
          .bindPopup('<b>Sei qui</b>')
          .addTo(mapRef.current);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  const selectResult = useCallback((item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const map = mapRef.current;
    if (!map) return;
    map.setView([lat, lng], 14);

    if (selectMarkerRef.current) selectMarkerRef.current.remove();
    const { name, sub } = buildLabel(item);
    selectMarkerRef.current = L.marker([lat, lng], { icon: makeIcon('select') })
      .bindPopup(`<b>${name}</b>${sub ? `<br/><span style="font-size:12px;color:#666">${sub}</span>` : ''}`)
      .addTo(map)
      .openPopup();

    onLocationSelect?.({
      lat: lat.toFixed(5),
      lng: lng.toFixed(5),
      label: name + (sub ? `, ${sub}` : ''),
    });
    setQuery(name + (sub ? `, ${sub}` : ''));
    setShowResults(false);
    setResults([]);
  }, [onLocationSelect]);

  const geoTop = showSearch ? 54 : 80;

  return (
    <>
      <style>{MAP_STYLE}</style>
      <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:'inherit', ...style }}>
        <div
          ref={containerRef}
          style={{ width:'100%', height:'100%', minHeight:360, borderRadius:'inherit' }}
        />

        {/* ── Barra di ricerca ── */}
        {showSearch && (
          <div className="map-search-wrap">
            <div className="map-search-input-row">
              <span style={{ fontSize:14, color:'#aaa', flexShrink:0 }}>🔍</span>
              <input
                type="text"
                placeholder="Cerca una città, indirizzo, luogo…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => { if (results.length) setShowResults(true); }}
                onBlur={() => setTimeout(() => setShowResults(false), 180)}
              />
              {query && (
                <button className="map-search-clear"
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => { setQuery(''); setResults([]); setShowResults(false); }}>
                  ×
                </button>
              )}
            </div>

            {showResults && (
              <div className="map-search-results">
                {searching ? (
                  <div className="map-search-loading">Ricerca in corso…</div>
                ) : results.length === 0 ? (
                  <div className="map-search-loading">Nessun risultato trovato.</div>
                ) : (
                  results.map((item, i) => {
                    const { name, sub } = buildLabel(item);
                    return (
                      <button key={i} className="map-search-item"
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => selectResult(item)}>
                        <span className="map-search-item-icon">{placeIcon(item)}</span>
                        <div>
                          <div className="map-search-item-name">{name}</div>
                          {sub && <div className="map-search-item-sub">{sub}</div>}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Hint click-to-select ── */}
        {selectable && (
          <div className="map-click-hint">📌 Tocca la mappa per scegliere il punto esatto</div>
        )}

        {/* ── Pulsante posizione ── */}
        <button
          className={"map-geo-btn " + (locating ? 'locating' : '')}
          onClick={goToMyLocation}
          title="Vai alla mia posizione"
          style={{ top: geoTop }}
        >
          🎯
        </button>
      </div>
    </>
  );
}
