import * as React from 'react';
import { useState, useMemo, useEffect, useContext } from 'react';
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ReactMapGL, { Marker, SVGOverlay, AttributionControl, FullscreenControl, GeolocateControl, Layer, Popup, MapContext } from 'react-map-gl';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import axios from 'axios';

const fullscreenControlStyle= {
  right: 10,
  top: 10
};

const geolocateControlStyle= {
  font:7,
  right: 10,
  top: 50
};

const TestingMap = ({ allMarkers }) =>  {

  // console.log("all markers ==>", allMarkers);

  const [viewport, setViewport] = useState({
    // width: "100vw",
    // height: "100vh",
    latitude: 37.7577,
    longitude: 30.4376,
    zoom: 1
  });

  const [showPopup, togglePopup] = useState(false);
  const [ session, loading ] = useSession();
  const [showMarkers, setShowMarkers] = useState(true);
  const [count, setCount] = useState(allMarkers.length)
  const [showAlert, setShowAlert] = useState(false);
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
  useEffect(() =>{
    window.onclick = (event) => { 
      console.log(event.target.id,"x==>", event.x, "y==>", event.y, "target==>", event.target!.className ==="map-icons") 
      let infoBox = document.createElement('div')
      let infoText = document.createElement('p')
      allMarkers.map((marker: { _id: any; }) => {
        if(marker._id === event.target.id){

          // ok leaving here, continue after breakfast
          console.log("fount the marker",marker)
        }
      })

    }
  },[])
  useEffect(() => {
    // console.log("clicked here ==>", clickedPoint)
    // console.log("session ==>", session)
    togglePopup(true);
  }, [clickedPoint])

  useEffect(() => {
    console.log(showAlert)
    const alertDiv = document.querySelector(".map-alert-container");
    console.log(alertDiv);
    if(showAlert){
      // Gonna return after my break
      alertDiv!.style!.display = "flex"
    }else{
      alertDiv!.style!.display = "none"
    }
    
  },[showAlert]);


  useEffect(() => {
    if(session?.user!.name !== ""){
      setMarkerToAdd({...markerToAdd, addedBy: session?.user?.name!})
    }else{console.log("no user name here")}
  },[session?.user]);

  const handleAddMarker = async (e:React.FormEvent) => {
    e.preventDefault();
    // console.log("gonna send this data ==>", markerToAdd)
    
    const url:string = process.env.NEXT_PUBLIC_SITE_URL!;
    if(!url)console.log("there's no url mate")
    // console.log(url)

    axios.post(`${url}/api/marker`, markerToAdd)
      .then(res => console.log("here be the res ==>", res))
      .catch(error =>{
        setShowAlert(true);
        console.log(error.request.status)
        if(error.request.status){
          let msg = document.querySelector(".map-alert-message")
          msg.innerText = "A marker already exists in the same spot. Please reload your page to see the most recent changes. Thanks"
        }
        console.log(Object.keys(error))})
        // console.log(error.Error)

  }

  const markers = useMemo(() => allMarkers.map(
    marker => (
      <Marker 
        offsetTop={-10} 
        offsetLeft={-10} 
        key={marker._id} 
        longitude={marker.lng} 
        latitude={marker.lat} 
      >
        <img style={{width:"20px"}} id={marker._id} className="map-icons" src={`${marker.type}.png`} />
      </Marker>
    )
  ), [allMarkers]);

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
            placeholder="nice spot"
            maxLength={20}
            /><br/>
            <button onSubmit={handleAddMarker}>Submit</button>
          </form>
        </div> : <div><p>Please <Link href="/sign-in"><a>sign in</a></Link> to create markers</p></div>}
      </Popup>
    )
  }
  
  
  return (<>
    <div className="map-alert-container">
      <div className="map-alert-box">
        <p className="map-alert-message"></p>
        <button onClick={
          () => {
            setShowAlert(false)
            location.reload();
          }
        } className="map-alert-confirm-btn">Confirm & Reload</button>
      </div>
    </div>
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
      {showMarkers && markers}
    </ReactMapGL>
    <div>Icon count: {count}</div>
    <button onClick={() => togglePopup(!showPopup)}>Toggle pop-up</button>
    <button onClick={() => setShowMarkers(!showMarkers)}>Show / Hide Markers</button> 
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
    .map-alert-container{
      width: 100%;
      height: 100vh;
      background: rgb(66,66,66,0.7); 
      position: fixed;
      top: 0;
      left: 0;
      margin:0 auto;
      z-index: 120;
      padding: 10px;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .map-alert-box{
      background: var(--secondary-red);
      padding: 10px 20px;
      width:50%;
      min-width: 240px;
      max-width: 500px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

    }
    // .map-alert-show{
    //   display:flex;
    // }
    .map-alert-message{
      color: var(--main-text-color);
      font-size: 1.2rem;
    }
    .map-alert-confirm-btn{
      max-width: 50%;
      border: none;
      padding: 10px 15px;
      font-size: 1.2rem;
      border-radius:5px;
      margin-bottom: 20px;
      background: var(--main-footer-color);
      color: var(--main-text-color);
    }
    .map-alert-confirm-btn:hover{
      cursor:pointer;
    }
    `}</style>

  </>);
}

export default TestingMap;



// export async function getStaticProps() {

//   console.log("in get static")

//   const url:string = process.env.NEXT_PUBLIC_SITE_URL!;

//   if(!url)console.log("there's no url mate");

//   const res = await fetch("https://jsonplaceholder.typicode.com/users/");
//   const data = await res.json()

  
//   // // const res = await axios.get(`${url}/api/marker`);
//   // const res = await axios.get("http://localhost:3000/api/marker");
//   // const { data } = res.data

//   // if (!allMarkers) {
//   //   console.log("no res data here!")
//   //   // return {
//   //   //   redirect: {
//   //   //     destination: '/',
//   //   //     permanent: false,
//   //   //   },
//   //   // }
//   // }

//   return {
//     props: { allMarkers: data }, // will be passed to the page component as props
//   }
// }

// export async function getStaticProps() {
//   const url = process.env.NEXT_PUBLIC_SITE_URL

//   const response = await fetch(`${url}/api/marker`);
//   const data = await response.json()

//   console.log(data[0]);

//   return {
//     props: {
//       allMarkers: data.data
//     }
//   }
// }