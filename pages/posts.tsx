// import { gql } from '@apollo/client'
import { GraphQLClient, gql } from "graphql-request";
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import client from '../lib/apolloClient';

// will change the type later
const Posts: NextPage = ( { blogs }:any ) => {
    console.log("blogs ==>",blogs)
    return(<>
    <Head>
    <title>Posts | Campin'</title>
        <meta name="description" content="All Posts and Short Descriptions" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
    <div className="posts-container">
        <h1>this page will contain all of the posts and their short descpitions or at least list of the headers along with the thumbnails</h1>
        <ul>
            {/* {blogs.map((blog: {title: string}, i: number | string) => <li key={i}>{blog.title}</li> )} */}
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
    console.log("graphcms url", process.env.NEXT_PUBLIC_GRAPHCMS_URL)
    const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL!);
    console.log("client ==>", client)
    // well the query worked in api playground but still getting the same error, looking into it
    const query = gql`
        query BlogPost{
            blogPosts{
                title
            }
        }
    `;
    const data:{blogPosts:[]} = await client.request(query);

    return {
        props: { blogs: data.blogPosts },
    };
    // return { props: { blogs:  [{title : "test"}]}}
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