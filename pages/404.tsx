import type { NextPage } from 'next'
import Image from 'next/image'

const NotFound: NextPage = () => {
    return(<>
    <div className="about-container">
      <div className="not-found-image">
        <Image
        // loader={myLoader}
        layout="fill"
        src="/obi-wan-meme.jpg"
        alt="Picture of Obi-wan Kenobi"
      />
        <h1></h1>
        <p></p>

      </div>
      
    </div>
    <style jsx>{`
    .about-container {
        min-height: 100vh;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 960px;
        // padding: 250px;
    }
    .not-found-image{
      width: 250px;
      // max-width:960px;
      // width: 100%;
      // height: auto;

    }
    `}</style>
    
    </>)
}
export default NotFound