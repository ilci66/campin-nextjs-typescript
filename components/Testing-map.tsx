import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import d3 from 'd3-ease';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature', geometry: { type: 'Point', coordinates: [-77.032, 38.913] },
      properties: { title: 'Mapbox', description: 'Washington, D.C.' }
    },
    {
      type: 'Feature', geometry: { type: 'Point', coordinates: [-122.414, 37.776] },
      properties: {title: 'Mapbox', description: 'San Francisco, California' }
    },
    {
      type: 'Feature', geometry: { type: 'Point', coordinates: [30.5037, 36.8740] },
      properties: {title: 'Mapbox', description: 'My marker' }
    }
  ]
};


const TestingMap = () => {

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: 30.4376,
    zoom: 8
  });
  
  const goToNYC = () => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    });
  }

  return (<>
    <ReactMapGL
      {...viewport}
      width="80%"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={(nextViewport: React.SetStateAction<{ width: number; height: number; latitude: number; longitude: number; zoom: number; }>) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    />
    <button onClick={goToNYC}>Go to NYC</button>
  </>);
}

export default TestingMap;