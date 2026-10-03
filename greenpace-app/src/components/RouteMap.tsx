import React from 'react';

import MapView, {
  Marker,
  Polyline,
} from 'react-native-maps';

export interface RouteMapPoint {
  latitude: number;
  longitude: number;
}

export interface RouteMapIntersection extends RouteMapPoint {
  id: string;
  name: string;
  distanceMeters: number;
}

export interface RouteMapProps {
  driver: RouteMapPoint;
  intersections: RouteMapIntersection[];
  routeCoordinates: RouteMapPoint[];
}

export function RouteMap({
  driver,
  intersections,
  routeCoordinates,
}: RouteMapProps) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 50.067,
        longitude: 19.97,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      }}
    >
      <Marker coordinate={driver} title="You" />

      {intersections.map((intersection) => (
        <Marker
          key={intersection.id}
          coordinate={intersection}
          title={intersection.name}
          description={`${intersection.distanceMeters} m`}
        />
      ))}

      <Polyline
        coordinates={routeCoordinates}
        strokeColor="#36F58A"
        strokeWidth={6}
      />
    </MapView>
  );
}
