import React, { useRef, useState, useEffect } from 'react';
// // import ReactMapGL from 'react-map-gl';
// // import {
// //   withScriptjs,
// //   withGoogleMap,
// //   GoogleMap,
// //   Marker
// // } from "react-google-maps";
// import mapboxgl from 'mapbox-gl'; 
// import ReactDOM from 'react-dom';


// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

// // using this for now later i will include my database
// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [-77.032, 38.913] },
//       properties: { title: 'Mapbox', description: 'Washington, D.C.' }
//     },
//     {
//       type: 'Feature', geometry: { type: 'Point', coordinates: [-122.414, 37.776] },
//       properties: {title: 'Mapbox', description: 'San Francisco, California' }
//     },
//     {
//       type: 'Feature', geometry: { type: 'Point', coordinates: [30.5037, 36.8740] },
//       properties: {title: 'Mapbox', description: 'My marker' }
//     }
//   ]
// };


// const MapComponent:NextComponentType = () => {

//   // mapboxgl.accessToken = proces.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN


//   const mapContainer = useRef(null);

//   const map = useRef(null);
//   const [lng, setLng] = useState(30.5037);
//   const [lat, setLat] = useState(36.8740);
//   const [zoom, setZoom] = useState(1);

//   useEffect(() => {

//     if (map.current) return; // initialize map only once

//     console.log("map initialized")

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });

//     let el;

//      geojson.features.forEach(feature => {
//       console.log("feature ==>", feature)
//       el = document.createElement('div');
//       el.className = 'marker';
//       new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);

//      }) 
      
//       console.log(el)
    
//   });


//   useEffect(() => {

//     if (!map.current) return; // wait for map to initialize

//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });



//   return (<>
//     <div>
//       <div className="sidebar">
//       Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//     </div>




//     <style jsx>{`
//       .map-container{
//         position: relative;
//         width:100%;
//         height:400px;
//       }
//       .sidebar {
//         background-color: rgba(35, 55, 75, 0.9);
//         color: #fff;
//         padding: 6px 12px;
//         font-family: monospace;
//         z-index: 1;
//         position: absolute;
//         top: 100;
//         left: 100;
//         margin: 12px;
//         border-radius: 4px;
//       }
//       .marker {
//         background-image: url('mapbox-icon.png');
//         background-size: cover;
//         width: 50px;
//         height: 50px;
//         border-radius: 50%;
//         cursor: pointer;
//       }
      
//     `}</style>

//   </>);

// }

// export default MapComponent;






// import { NextComponentType } from 'next';