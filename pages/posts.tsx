// import { gql } from '@apollo/client'
import { GraphQLClient, gql } from "graphql-request";
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import client from '../lib/apolloClient';


const Posts: NextPage = ( { blogs } ) => {
    return(<>
    <Head>
    <title>Posts | Campin'</title>
        <meta name="description" content="All Posts and Short Descriptions" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
    <div className="posts-container">
        <h1>this page will contain all of the posts and their short descpitions or at least list of the headers along with the thumbnails</h1>
        <ul>
            {blogs.map((blog: {title: string}, i: number | string) => <li key={i}>{blog.title}</li> )}
        </ul>
    </div>
        <style jsx>{`
            .posts-container {
                min-height: 100vh;
            }
        `}</style>
    </>)
}
export default Posts;


export const getStaticProps: GetStaticProps = async () => {

    const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL!);
    const query = gql`
        query {
            blogPosts {
                title
                slug
            }
        }
    `;
    const data = await client.request(query);

    return {
        props: { blogs: data },
    };

    // This looks strange and I wouldn't be able to remember in a million years so gonna use another module
    // const { data: blogs } = await client.query({
    //     query : gql`
    //     query blogPosts{
    //         title
    //         wideThumbnail
    //         slug
    //         description
    //         date
    //         inPostImages
    //         richText
    //         }
    //     ` 
    // })
        
    // console.log(blogs);


    
}