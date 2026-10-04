import { Route } from '../types';

const cycle = { greenS: 30, yellowS: 3, redS: 37 };

export const mockRoute: Route = {
  fromLabel: 'Your location',
  toLabel: 'Work',
  distanceKm: 12,
  durationMin: 24,
  greenLights: 3,
  lights: [
    { id: 'l1', distanceM: 120, cycle, offsetS: 52 },
    { id: 'l2', distanceM: 450, cycle, offsetS: 38 },
    { id: 'l3', distanceM: 780, cycle, offsetS: 60 },
  ],
};