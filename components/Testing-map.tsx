import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const TestingMap = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      width="500px"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(nextViewport: React.SetStateAction<{ width: number; height: number; latitude: number; longitude: number; zoom: number; }>) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    />
  );
}

export default TestingMap;