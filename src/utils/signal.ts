import { LightPhase, TrafficLight } from '../types';

const cycleLength = (l: TrafficLight) =>
  l.cycle.greenS + l.cycle.yellowS + l.cycle.redS;

/** Phase of a light `t` seconds from now. */
export function phaseAt(l: TrafficLight, t: number): LightPhase {
  const p = (((t + l.offsetS) % cycleLength(l)) + cycleLength(l)) % cycleLength(l);
  if (p < l.cycle.greenS) return 'green';
  if (p < l.cycle.greenS + l.cycle.yellowS) return 'yellow';
  return 'red';
}

/** Seconds until the light turns green (0 when already green). */
export function secondsToGreen(l: TrafficLight, t: number): number {
  const len = cycleLength(l);
  const p = (((t + l.offsetS) % len) + len) % len;
  return p < l.cycle.greenS ? 0 : Math.ceil(len - p);
}

const MIN_KMH = 20;
const MAX_KMH = 50;

/**
 * Highest speed (within city limits) that reaches the next light while it is
 * green, with a 2 s safety margin before the green ends.
 */
export function recommendSpeed(lights: TrafficLight[], t: number) {
  const next = [...lights].sort((a, b) => a.distanceM - b.distanceM)[0];
  if (!next) return { kmh: MAX_KMH, next: undefined };
  for (let v = MAX_KMH; v >= MIN_KMH; v--) {
    const arrival = (next.distanceM * 3.6) / v;
    if (
      phaseAt(next, t + arrival) === 'green' &&
      phaseAt(next, t + arrival + 2) === 'green'
    ) {
      return { kmh: v, next };
    }
  }
  return { kmh: MIN_KMH, next };
}

/** Straight-line distance between two coordinates, in kilometres. */
export function haversineKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLon = rad(b[1] - a[1]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}