export type TrafficLightState = 'green' | 'amber' | 'red';

export interface Intersection {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distanceMeters: number;
  trafficLight: TrafficLightState;
  secondsRemaining: number;
  recommendedSpeed: number;
  congestionLevel: number;
}

export const mockDriver = {
  currentSpeed: 42,
  recommendedSpeed: 47,
  destination: 'Kraków Main Square',
  etaMinutes: 18,
  distanceKm: 7.4,

  latitude: 50.0647,
  longitude: 19.945,
};

export const mockIntersections: Intersection[] = [
  {
    id: 'intersection-1',
    name: 'Mogilska / Lema',
    latitude: 50.0645,
    longitude: 19.9725,
    distanceMeters: 120,
    trafficLight: 'green',
    secondsRemaining: 18,
    recommendedSpeed: 47,
    congestionLevel: 22,
  },
  {
    id: 'intersection-2',
    name: 'Mogilska / Meissnera',
    latitude: 50.0702,
    longitude: 19.9811,
    distanceMeters: 450,
    trafficLight: 'amber',
    secondsRemaining: 7,
    recommendedSpeed: 42,
    congestionLevel: 48,
  },
  {
    id: 'intersection-3',
    name: 'Mogilska / Jana Pawła II',
    latitude: 50.0708,
    longitude: 19.9922,
    distanceMeters: 780,
    trafficLight: 'red',
    secondsRemaining: 31,
    recommendedSpeed: 38,
    congestionLevel: 72,
  },
];
