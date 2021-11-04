import type { NextPage } from 'next'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from '../components/Map-component'
import Head from 'next/head'


const Map: NextPage = () => {

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
           <h2 className="map-page-title">The title of this page</h2>
            
            <div className="map-component-container">
                <Wrapper 
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} 
                    render={render}
                    >
                        <MapComponent/>
                </Wrapper>
            </div>
        </div>
        <style jsx>{`
            .map-page-container{
              height:100vh;  
              max-width:960px;
              margin: 0 auto; 
            }
               
            
            
        `}</style>
    </>)
}
export default Map