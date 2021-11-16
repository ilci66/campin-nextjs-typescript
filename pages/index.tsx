import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Campin'</title>
        <meta name="description" content="A website dedicated to relaxing and liberating activity of camping" />
        <link rel="icon" href="/favicon-c.ico" />
      </Head>
      <div className="content-container">
      <div className="content-box row">
          <img src='/map-pins.jpg'/>
          <div className="content-text">
            <h1>Check Out The Map!</h1>
            <p>
              Check out the map to tell other campers about the camping spots you found, rr warn them about a wild animal you have encountered.<br/>
            </p>
          </div>
        </div>
        <div className="content-box row">
          <div className="content-text">
            <h1>Read about interesting and useful camping tips.</h1>
            <p>There are some blog posts I'm sure you will find interesting. Who knows some of them even can save your life in a tricky situation.<br/>
            </p>
          </div>
          <img src='/dear-dawn.jpg'/>
        </div>
        <div className="content-box row">
          <img src='/table-coffee-laptop.jpg'/>
          <div className="content-text">
            <h1>Who Am I?</h1>
            <p>
              I create this website for a few reasons. I wanted to be more confortable with next.js, maps, next auth and graphcms. I have had the idea for a website for campers to warn eachother or just let eachother now about the beautiful hidden spots. Now that I can code, here we are! <br/>
            </p>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default Home
