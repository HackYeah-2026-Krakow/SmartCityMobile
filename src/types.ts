export type SignalCycle = { greenS: number; yellowS: number; redS: number };

export type TrafficLight = {
  id: string;
  /** metres from the vehicle along the route */
  distanceM: number;
  cycle: SignalCycle;
  /** where in the cycle the light is at t = 0 (seconds) */
  offsetS: number;
};

export type Route = {
  fromLabel: string;
  toLabel: string;
  distanceKm: number;
  durationMin: number;
  lights: TrafficLight[];
  greenLights: number;
};

export type LightPhase = 'green' | 'yellow' | 'red';