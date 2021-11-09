import * as React from 'react';
import { useState, useMemo, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, SVGOverlay, AttributionControl, FullscreenControl, GeolocateControl, Layer, Popup, MapContext } from 'react-map-gl';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import axios from 'axios';





const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      id: "1", type: 'Feature', geometry: { type: 'Point', coordinates: [-77.032, 38.913] },
      properties: { title: 'Mapbox', description: 'Washington, D.C.' }
    },
    {
      id:"2", type: 'Feature', geometry: { type: 'Point', coordinates: [-122.414, 37.776] },
      properties: {title: 'Mapbox', description: 'San Francisco, California' }
    },
    {
      id: "3", type: 'Feature', geometry: { type: 'Point', coordinates: [30.5037, 36.8740] },
      properties: {title: 'Mapbox', description: 'My marker' }
    }
  ]
};

const fullscreenControlStyle= {
  right: 10,
  top: 10
};

const geolocateControlStyle= {
  font:7,
  right: 10,
  top: 50
};

const TestingMap = () => {

  // console.log("all markers ==>", resData);

  const [viewport, setViewport] = useState({
    // width: "100vw",
    // height: "100vh",
    latitude: 37.7577,
    longitude: 30.4376,
    zoom: 1
  });

  const [showPopup, togglePopup] = useState(false);
  const [ session, loading ] = useSession();

  const [clickedPoint, setClickedPoint] = useState<{
    x:number,
    y:number,
    lng:number
    lat:number
    }>();

  const [markerToAdd, setMarkerToAdd] = useState<{lng?:number, lat?:number, type?:string, description?:string, addedBy:string}>({
    lng: 35,
    lat: 35,
    type: "camp",
    description: "nice spot",
    addedBy:"Happy Camper"
  });

  useEffect(() => {
    console.log("clicked here ==>", clickedPoint)
    console.log("session ==>", session)
    togglePopup(true);
  }, [clickedPoint])

  useEffect(() => {
    if(session?.user!.name !== ""){
      setMarkerToAdd({...markerToAdd, addedBy: session?.user?.name!})
    }else{console.log("no user name here")}
  },[session?.user]);

  const handleAddMarker = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log("gonna send this data ==>", markerToAdd)
    
    const url:string = process.env.NEXT_PUBLIC_SITE_URL!;
    if(!url)console.log("there's no url mate")
    console.log(url)

    axios.post(`${url}/api/marker`, markerToAdd)
      .then(res => console.log("here be the res ==>", res))

  }

  const markers = useMemo(() => geojson.features.map(
    city => (
      <Marker 
        offsetTop={-10} 
        offsetLeft={-10} 
        key={city.id} 
        longitude={city.geometry.coordinates[0]} 
        latitude={city.geometry.coordinates[1]} 
      >
        <img style={{width:"20px"}} className="map-icons" src="camp.png" />
      </Marker>
    )
  ), [geojson]);

  const CurrentZoomLevel = () => {
    const context = useContext(MapContext);
    const { longitude, latitude} = context.viewport!;

    return <div style={{background:"rgb(66, 66, 66)", color:"white",padding:"1px 2px"}}>
      Center Lat: {latitude.toFixed(3)}<br/> 
      Center Lng: {longitude.toFixed(3)}
    </div>;
  }

  const displayPopup = () => {
      return(
      <Popup
        latitude={clickedPoint ? clickedPoint.lat : 36.78}
        longitude={clickedPoint ? clickedPoint.lng : 30.521}
        closeButton={true}
        closeOnClick={false}
        onClose={() => togglePopup(false)}
        anchor="top" >
        {session ?
        <div>Create A Marker
          <form className="add-marker-form" action="" onSubmit={handleAddMarker}>
          <label htmlFor="markers">Marker Type:</label><br/>
          <select onChange={e => setMarkerToAdd({...markerToAdd, type: e.target.value})} name="markers" id="marker-selections">
            <option value="camp">Camp Site</option>
            <option value="bear">Bear Signting</option>
            <option value="boar">Boar Sighting</option>
            <option value="wolf">Wolf Sighting</option>
          </select><br/>
          <label  htmlFor="description">Wanna describe?</label><br/>
          <input 
            type="text"
            onChange={e => setMarkerToAdd({...markerToAdd, description: e.target.value})}
            name="description"
            placeholder="description"
            maxLength={20}
            /><br/>
            <button onSubmit={handleAddMarker}>Submit</button>
          </form>
        </div> : <div><p>Please <Link href="/sign-in"><a>sign in</a></Link> to create markers</p></div>}
      </Popup>
    )
  }
  
  
  return (<>
    <ReactMapGL 
      {...viewport} 
      width="100%" 
      height="500px" 
      onClick={ (e) => { 
        setClickedPoint(
          {...clickedPoint,
            x:e.center.x,
            y:e.center.y,
            lng: parseFloat((e.lngLat[0]).toFixed(7)),
            lat: parseFloat((e.lngLat[1]).toFixed(7))
          }
        );
        setMarkerToAdd({...markerToAdd, lng: parseFloat((e.lngLat[0]).toFixed(7)), lat: parseFloat((e.lngLat[1]).toFixed(7))});
      }
      }
      onViewportChange={setViewport} 
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      attributionControl={false}
    >
      
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
      {markers}
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
    .map-icon-container>div>div{
      // position:relative;
    }
    // .sidebar-map-icons{
    //   width: 20px;
    // }
    `}</style>

  </>);
}

export default TestingMap;

// export async function getStaticProps() {

//   console.log("in get static")

//   const url:string = process.env.NEXT_PUBLIC_SITE_URL!;
//   if(!url)console.log("there's no url mate");

//   // let resData: undefined | object = undefined

//   // let resData = await axios.get(`${url}/api/marker`)
//   //   // .then(res => resData = res)
//   // console.log("res Data ==> " ,resData)

//   const res = await fetch(`${url}/api/marker`)
//   const posts = await res.json()


//   if (!posts) {
//   // if (!resData) {
//     console.log("no res data here!")
//     // return {
//     //   redirect: {
//     //     destination: '/',
//     //     permanent: false,
//     //   },
//     // }
//   }

//   return {
//     props: { posts, }, // will be passed to the page component as props
//   }
// }