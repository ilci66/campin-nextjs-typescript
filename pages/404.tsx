import type { NextPage } from 'next'
import Router from 'next/router';
import { useEffect, useState } from 'react'
// didn't use it 
// import Image from 'next/image'

const NotFound: NextPage = () => {

  // const [countDown, setCountDown] = useState(5);

  useEffect(() =>{
    setTimeout(() => {Router.push('/')}, 5000);
  },[])

  return(<>
  <div className="not-found-container">
    <div className="not-found-image">
      {/* <Image
      // loader={myLoader}
      layout="responsive"
      src="/obi-wan-meme-darker.jpg"
      alt="Picture of Obi-wan Kenobi"
      width={150}
      height={100}
    /> */}
    <div className="not-found-text">
      <h1>This is not the page you are looking for</h1>
      <p>You will be redirected to the Home Page in 5 seconds.</p>

    </div>
      
    </div>
    
  </div>
  <style jsx>{`
  .not-found-container {

    // justify-content: center;

    // max-width: 960px;
    // padding: 250px;
  }
  // .not-found-image{
  //   max-width:960px;
  //   // opacity: 0.5;
  //   // width: 100%;
  //   // height: auto;
  // }

  `}</style>
  
  </>)
}
export default NotFound