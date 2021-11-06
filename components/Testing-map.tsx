import * as React from 'react';
// nice hook for chaching, i don't wanna cause a re-render my markers on viewport changes 
import { useState, useMemo, useEffect } from 'react';
import ReactMapGL, { Marker, SVGOverlay, AttributionControl } from 'react-map-gl';

// gonna use another way to name these in the future with my database of course
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      name: "washington-1", type: 'Feature', geometry: { type: 'Point', coordinates: [-77.032, 38.913] },
      properties: { title: 'Mapbox', description: 'Washington, D.C.' }
    },
    {
      name:"san-fransisco-1", type: 'Feature', geometry: { type: 'Point', coordinates: [-122.414, 37.776] },
      properties: {title: 'Mapbox', description: 'San Francisco, California' }
    },
    {
      name: "antalya-1", type: 'Feature', geometry: { type: 'Point', coordinates: [30.5037, 36.8740] },
      properties: {title: 'Mapbox', description: 'My marker' }
    }
  ]
};

const attributionStyle= {
  right: 0,
  top: 0
};

const TestingMap = () => {

  const [viewport, setViewport] = useState({
    // width: "100vw",
    // height: "100vh",
    latitude: 37.7577,
    longitude: 30.4376,
    zoom: 1
  });

  useEffect(() =>{
    const mapbox = document.querySelector("mapboxgl-map")
    console.log(ReactMapGL)
  },[])
  

  

  const markers = useMemo(() => geojson.features.map(
    city => (
      <Marker 
        offsetTop={-20} 
        offsetLeft={-20} 
        key={city.name} 
        // captureDoubleClick={true}
        // draggable={true}
        longitude={city.geometry.coordinates[0]} 
        latitude={city.geometry.coordinates[1]} 
      >
        <img style={{width:"40px"}} className="map-icons" src="campin-logo.png" />
      </Marker>
    )
  ), [geojson]);
  
  // const goToNYC = () => {
  //   setViewport({
  //     ...viewport,
  //     longitude: -74.1,
  //     latitude: 40.7,
  //     zoom: 14,
  //   });
  // }

  // function redraw({project}) {
  //   const [cx, cy] = project([37, 37]);
  //   return <circle cx={cx} cy={cy} r={4} fill="blue" />;
  // }
  return (<>

    <ReactMapGL 
      {...viewport} 
      width="100%" 
      height="400px" 
      onViewportChange={setViewport} 
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}

    >
      {/* <Marker latitude={57.1} longitude={30} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
      </Marker> */}
      {markers}
      {/* <AttributionControl compact={true} style={attributionStyle} /> */}
      {/* <SVGOverlay redraw={redraw} /> */}
    </ReactMapGL>
    <div className="map-icon-container">
      <div className="sidebar-map-icons"><img src="wolf.png" alt=""/></div>
      <div className="sidebar-map-icons"><img src="boar.png" alt="" /></div>
      <div className="sidebar-map-icons"><img src="bear.png" alt="" /></div>
      <div className="sidebar-map-icons"><img src="camp.png" alt="" /></div>
    </div>
  

    <style jsx>{`
    .map-icon-container{
      display: grid;
      width: 100px;
      grid-template-columns repeat(4, 1fr);
      grid-gap: 5px;
    }
    // .sidebar-map-icons{
    //   width: 20px;
    // }
    `}</style>

  </>);
}

export default TestingMap;