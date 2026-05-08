import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ================================================================
// FORNITORE MAPPA: Leaflet + OpenStreetMap (100% gratuito, no API key)
// ================================================================
// Per passare a Google Maps (con investitori):
//   1. console.cloud.google.com → crea progetto → abilita "Maps JavaScript API"
//   2. npm remove leaflet
//   3. npm install @googlemaps/js-api-loader
//   4. Sostituisci SOLO questo file — il resto dell'app usa sempre <MapView pins={...} />
// ================================================================

const MILAN = [45.4642, 9.1900];

const PIN_COLORS = {
  sos:     '#FF5C4D',
  warn:    '#F5A623',
  success: '#34C759',
  user:    '#007AFF',
};
const PIN_ICONS = {
  sos:     '🐾',
  warn:    '⚠️',
  success: '✓',
  user:    '📍',
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
    bottom: 80px; right: 10px;
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
`;

export default function MapView({
  pins   = [],
  center,
  zoom   = 13,
  style  = {},
}) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const markersRef   = useRef([]);
  const userMarkerRef = useRef(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Chiedi subito la geolocalizzazione per centrare la mappa
    const defaultCenter = center || MILAN;

    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Geolocalizzazione automatica all'apertura
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
        () => {} // silenzioso se negato
      );
    }

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Aggiorna i pin quando cambiano
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = pins.map(pin => {
      const marker = L.marker([pin.lat, pin.lng], { icon: makeIcon(pin.type) });
      if (pin.label) {
        marker.bindPopup(
          `<b>${pin.label}</b>${pin.meta ? '<br/><span style="font-size:12px;color:#666">${pin.meta}</span>' : ''}`
        );
      }
      return marker.addTo(map);
    });
  }, [pins]);

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

  return (
    <>
      <style>{MAP_STYLE}</style>
      <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:'inherit', ...style }}>
        <div
          ref={containerRef}
          style={{ width:'100%', height:'100%', minHeight:360, borderRadius:'inherit' }}
        />
        <button
          className={"map-geo-btn " + (locating ? 'locating' : '')}
          onClick={goToMyLocation}
          title="Vai alla mia posizione"
        >
          🎯
        </button>
      </div>
    </>
  );
}
