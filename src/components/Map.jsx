import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ================================================================
// FORNITORE MAPPA: Leaflet + OpenStreetMap (100% gratuito, no API key)
// ================================================================
// Per passare a Google Maps (con investitori):
//   1. console.cloud.google.com → crea progetto → abilita "Maps JavaScript API"
//   2. npm remove leaflet
//   3. npm install @googlemaps/js-api-loader
//   4. Sostituisci SOLO questo file con l'implementazione Google Maps
//      (il resto dell'app non va modificato — usa sempre <MapView pins={...} />)
//
// Guida migrazione: src/docs/google-maps-migration.md
// ================================================================

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
  const html = `
    <div style="
      background:${color};
      color:#fff;
      border:2.5px solid #fff;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      width:30px;height:30px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,.28);
      font-size:13px;
    ">
      <span style="transform:rotate(45deg)">${icon}</span>
    </div>`;
  return L.divIcon({ html, className: '', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -32] });
}

export default function MapView({
  pins    = [],
  center  = [45.4642, 9.1900],
  zoom    = 13,
  style   = {},
}) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const markersRef   = useRef([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, { center, zoom, zoomControl: true });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = pins.map(pin => {
      const marker = L.marker([pin.lat, pin.lng], { icon: makeIcon(pin.type) });
      if (pin.label) {
        marker.bindPopup(
          `<b>${pin.label}</b>${pin.meta ? '<br/><span style="font-size:12px;color:#666">' + pin.meta + '</span>' : ''}`
        );
      }
      return marker.addTo(map);
    });
  }, [pins]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: 360, borderRadius: 'inherit', ...style }}
    />
  );
}
