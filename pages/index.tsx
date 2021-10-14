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
          <img src='/dear-dawn.jpg'/>
          <div className="content-text">
            <h1>Some Content Example For Design</h1>
            <p>
              Enim dolor ut sint incididunt anim non magna. Id laborum ex amet fugiat eiusmod nulla veniam dolore aliqua dolore velit duis aliquip. Aliquip laboris sit deserunt nulla eiusmod.<br/>
            </p>
          </div>
        </div>
        <div className="content-box row">
          <div className="content-text">
            <h1>Some Content Example For Design</h1>
            <p>
              Enim dolor ut sint incididunt anim non magna. Id laborum ex amet fugiat eiusmod nulla veniam dolore aliqua dolore velit duis aliquip. Aliquip laboris sit deserunt nulla eiusmod.<br/>
            </p>
          </div>
          <img src='/dear-dawn.jpg'/>
        </div>
      </div>
        
    </>
  )
}

export default Home
