/**
 * Route provider. Mock by default.
 * Real distance + ETA: Nominatim (geocoding) + OSRM (routing) — both free, no key.
 * Real signal *timing* is not public in most cities, so lights stay simulated;
 * OSM (Overpass `highway=traffic_signals`) can give real light *positions*.
 * The live path below is untested — try it once you have the screen running.
 */
import { mockRoute } from '../data/mockRoute';
import { Route } from '../types';

export const USE_MOCK = true;

async function geocode(q: string): Promise<[number, number]> {
  const r = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
    { headers: { 'User-Agent': 'GreenPaceIQ/0.1' } },
  );
  const [hit] = await r.json();
  if (!hit) throw new Error(`Address not found: ${q}`);
  return [parseFloat(hit.lat), parseFloat(hit.lon)];
}

export async function getRoute(from: string, to: string): Promise<Route> {
  if (USE_MOCK) return { ...mockRoute, fromLabel: from || mockRoute.fromLabel, toLabel: to || mockRoute.toLabel };

  const [a, b] = await Promise.all([geocode(from), geocode(to)]);
  const url = `https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=false`;
  const { routes } = await (await fetch(url)).json();
  return {
    ...mockRoute, // lights: simulated for now
    fromLabel: from,
    toLabel: to,
    distanceKm: Math.round((routes[0].distance / 1000) * 10) / 10,
    durationMin: Math.round(routes[0].duration / 60),
  };
}
