import type { GetStaticProps, NextPage } from 'next'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import MapComponent from '../components/Map-component'
import Head from 'next/head'
import MapComponent from '../components/Map-component';
import { useState } from 'react';
// import useSwr from "swr";

// interface IMarker  {
//     description:string;
//     id:string;
//     type: string;
//     lat: number | string;
//     lng: number | string;
//     addedBy: string;
//     createdAt: string;
// }
// interface IMapPageProps {
//     allMarkers: object[]
    
// }

// Well this works and I couldn't figure out the actual type of it
const Map: NextPage = ({ allMarkers }:any) => {
    console.log("all markers in map page==>", typeof allMarkers)

    const [allMarkersState, setAllMarkersState] = useState(allMarkers)
    const renderMarkers = async () => {
        const url:string = process.env.NEXT_PUBLIC_SITE_URL!;

        if(!url)console.log("there's no url mate");
    
        const res = await fetch(`${url}/api/marker`);
        const data = await res.json();

        setAllMarkersState(data.data);
    }
    // const [ randomKey, setRandomKey ] = useState(5)
    // let apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
    // console.log("apiKey", apiKey)

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    return(<>
        <Head>
            <title>Map | Campin'</title>
            <meta name="description" content="Cool Map App" />
            <link rel="icon" href="/favicon-c.ico" />
        </Head>
        <div className="map-page-container">
           <h2 className="map-page-title">Discover new camping spots!</h2>
           <p>You can add your own markers on the map to inform other campers!</p>
            
            <div className="map-component-container">
                <MapComponent
                // tried something
                //  key={randomKey}  
                //  setRandomKey={setRandomKey} 
                renderMarkers={renderMarkers}
                allMarkersState={allMarkersState} />
                {/* <Wrapper 
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} 
                    render={render}
                    >
                        <MapComponent/>
                </Wrapper> */}
            </div>
        </div>
        <style jsx>{`
            .map-page-container{
              height:100vh;  
              max-width:960px;
              margin: 0 auto;
              padding: 50px;
              margin-bottom: 60px;
            }
            .map-component-container{
                postion:relative;
            }
               
            
            
        `}</style>
    </>)
}
export default Map

export const getStaticProps: GetStaticProps = async () => {

    console.log("in get static")

    const url:string = process.env.NEXT_PUBLIC_SITE_URL!;

    if(!url)console.log("there's no url mate");

      const res = await fetch(`${url}/api/marker`);
      const data = await res.json();

    // Well swr caused an error, apparently can't be used this way
    // const fetcher: (fetchFrom:string) => object = async (fetchFrom) => fetch(fetchFrom).then(response => response.json())
    // const { data, error } = useSwr(`${url}/api/marker`, fetcher);

    //   let dataData:IMarker[] = data.data
    // if (!allMarkers) {
    //   console.log("no res data here!")
    //   // return {
    //   //   redirect: {
    //   //     destination: '/',
    //   //     permanent: false,
    //   //   },
    //   // }
    // }

    return {
        props: { 
            allMarkers : data.data
        }, 
        revalidate: 10,
    }
}
