import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Campin'</title>
        <meta name="description" content="A website dedicated to relaxing and liberating activity of camping" />
        <link rel="icon" href="/favicon-c.ico" />
      </Head>
    </div>
  )
}

export default Home
