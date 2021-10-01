import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Campin'</title>
        <meta name="description" content="A website dedicated to relaxing and liberating activity of camping" />
        <link rel="icon" href="/favicon-c.ico" />
      </Head>
      <div className="content">
        <img src='/dear-dawn.jpg' width="100%"/>
        <h1>Some Content Example For Design</h1>
        <p>
          Enim dolor ut sint incididunt anim non magna. Id laborum ex amet fugiat eiusmod nulla veniam dolore aliqua dolore velit duis aliquip. Aliquip laboris sit deserunt nulla eiusmod.<br/>
          Adipisicing ipsum do reprehenderit quis esse ipsum cupidatat Lorem exercitation consequat nisi aliquip. Deserunt consectetur amet eiusmod anim laboris elit incididunt sunt nulla est commodo id eu. Consectetur fugiat et nostrud ipsum cupidatat dolor.<br/>
          Cupidatat sit magna duis irure in irure sunt labore qui commodo dolore. Aute labore commodo Lorem Lorem esse tempor ut sit incididunt. Anim voluptate dolor aute ut consequat Lorem occaecat ad. Occaecat occaecat sint do quis non nisi cillum deserunt exercitation est minim voluptate. Proident aute incididunt ut cupidatat non proident.<br/>
        </p>
      </div>
    </>
  )
}

export default Home
