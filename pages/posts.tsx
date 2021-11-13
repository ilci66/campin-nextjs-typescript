import type { NextPage } from 'next'
import Head from 'next/head'


const Posts: NextPage = () => {
    return(<>
    <Head>
    <title>Posts | Campin'</title>
        <meta name="description" content="All Posts and Short Descriptions" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
    <div className="posts-container">
        <h1>this page will contain all of the posts and their short descpitions or at least list of the headers along with the thumbnails</h1>
    </div>
        <style jsx>{`
            .posts-container {
                min-height: 100vh;
            }
        `}</style>
    </>)
}
export default Posts