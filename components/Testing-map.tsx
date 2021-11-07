import * as React from 'react';
// nice hook for chaching, i don't wanna cause a re-render my markers on viewport changes 
import { useState, useMemo, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, SVGOverlay, AttributionControl, FullscreenControl, GeolocateControl, Layer, Popup, MapContext } from 'react-map-gl';
// import MapGL from 'react-map-gl';

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

const fullscreenControlStyle= {
  right: 10,
  top: 10
};

const geolocateControlStyle= {
  right: 10,
  top: 50
};

// const parkLayer = {
//   id: 'landuse_park',
//   type: 'fill',
//   source: 'mapbox',
//   'source-layer': 'landuse',
//   filter: ['==', 'class', 'park']
// };

// const waterLayer = {
//   id: 'water',
//   type: 'fill',
//   source: 'mapbox',
//   'source-layer': 'water',
//   filter: ['==', 'class', 'water']
// }
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
  

  // const [parkColor, setParkColor] = React.useState('#8fa');
  // const [waterColor, setWaterColor] = React.useState('#00ffff');
  const [showPopup, togglePopup] = React.useState(false);
  
  useEffect(() => {
    console.log("show pop up ==> ", showPopup)
    // window.onclick = (e) => { console.log(e)}
    // map.on('click', (e) => {
    //   var coordinates = e.lngLat;
    //   console.log("coordinates ==>", coordinates)
    // })

  },[showPopup])

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

  const CurrentZoomLevel = () => {
    const context = useContext(MapContext);
    console.log("context ==>",context)
    return <div style={{background:"rgb(66, 66, 66)", color:"white",padding:"1px 2px"}}>Center Lat: {context.viewport.latitude.toFixed(3)}<br/> Center Lon: {context.viewport.longitude.toFixed(3)}</div>;
  }

  const displayPopup = () => {
    return(
      <Popup
          latitude={37.78}
          longitude={-122.41}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
          <div>You are here</div>
        </Popup>
    )
  }
  
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
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}

    >
      {/* <Marker latitude={57.1} longitude={30} offsetLeft={-20} offsetTop={-10}>
        <div>You are here</div>
      </Marker> */}
      {/* gonna keep this one */}
      <FullscreenControl label={"Full Screen"}style={fullscreenControlStyle} />
      <div style={{position: 'absolute', right: 10, bottom: 10}}>
        <CurrentZoomLevel />
      </div>
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={false}
        auto
      />
      {showPopup && displayPopup()}
      {/* <Layer {...parkLayer} paint={{'fill-color': parkColor}} />
      <Layer {...waterLayer} paint={{'fill-color': waterColor}} /> */}

      {markers}
      {/* <AttributionControl compact={true} style={attributionStyle} /> */}
      {/* <SVGOverlay redraw={redraw} /> */}
    </ReactMapGL>
    <button onClick={() => togglePopup(!showPopup)}>Toggle pop-up</button>

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