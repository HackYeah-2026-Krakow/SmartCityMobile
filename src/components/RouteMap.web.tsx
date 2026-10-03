import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import type { RouteMapProps } from './RouteMap';

const frameStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  border: 0,
};

export function RouteMap({ driver }: RouteMapProps) {
  const mapUrl =
    'https://www.openstreetmap.org/export/embed.html' +
    '?bbox=19.93%2C50.055%2C20.005%2C50.085' +
    '&layer=mapnik' +
    `&marker=${driver.latitude}%2C${driver.longitude}`;

  return (
    <View style={styles.container}>
      <iframe
        title="Map of the current route in Kraków"
        src={mapUrl}
        loading="lazy"
        style={frameStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
