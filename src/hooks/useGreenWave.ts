import { useEffect, useState } from 'react';
import { Route, TrafficLight } from '../types';
import { phaseAt, recommendSpeed, secondsToGreen } from '../utils/signal';

type State = {
  t: number;
  travelledM: number;
  progress: number;
  greenAhead: number;
  lights: TrafficLight[];
};

const LOOP_GAP_M = 330;

function advance(s: State): State {
  const { kmh } = recommendSpeed(s.lights, s.t);
  const step = kmh / 3.6; // metres per second
  let { progress, greenAhead } = s;
  const farthest = Math.max(...s.lights.map((l) => l.distanceM));

  const lights = s.lights.map((l) => {
    const d = l.distanceM - step;
    if (d > 8) return { ...l, distanceM: d };
    // Passed this light: score it, then recycle it at the far end for the demo.
    if (phaseAt(l, s.t) === 'green') progress = Math.min(100, progress + 2);
    else progress = Math.max(0, progress - 3);
    greenAhead = Math.max(0, greenAhead - 1);
    return { ...l, distanceM: farthest + LOOP_GAP_M - step };
  });

  return { t: s.t + 1, travelledM: s.travelledM + step, progress, greenAhead, lights };
}

export function useGreenWave(route: Route) {
  const [s, setS] = useState<State>(() => ({
    t: 0,
    travelledM: 0,
    progress: 72,
    greenAhead: route.greenLights,
    lights: route.lights.map((l) => ({ ...l })),
  }));

  useEffect(() => {
    const id = setInterval(() => setS(advance), 1000);
    return () => clearInterval(id);
  }, []);

  const { kmh } = recommendSpeed(s.lights, s.t);
  const remainingKm = Math.max(route.distanceKm - s.travelledM / 1000, 0);
  const etaMin = Math.ceil((route.durationMin * remainingKm) / route.distanceKm);
  const nearestFirst = [...s.lights].sort((a, b) => a.distanceM - b.distanceM);

  return {
    speedKmh: kmh,
    progress: Math.round(s.progress),
    remainingKm,
    etaMin,
    greenLights: s.greenAhead,
    // far → near, the order they appear on screen top to bottom
    lights: [...nearestFirst].reverse().map((l) => ({
      id: l.id,
      distanceM: Math.round(l.distanceM / 10) * 10,
      greenInS: secondsToGreen(l, s.t),
      phase: phaseAt(l, s.t),
      isNext: l.id === nearestFirst[0].id,
    })),
  };
}