// import { gql } from '@apollo/client'
import { GraphQLClient, gql } from "graphql-request";
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
// import client from '../lib/apolloClient';

// itereate through the colours to create a background for the posts
const postBGColors = ["var(--secondary-blue-1), var(--secondary-blue-2), var(--secondary-blue-1)"]

// will change the type later
const Posts: NextPage = ( { blogs }:any ) => {
    console.log("blogs ==>",blogs)
    return(<>
    <Head>
    <title>Posts | Campin'</title>
        <meta name="description" content="All Posts and Short Descriptions" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
    <div className="posts-page-container">
        <div className="content-container">
            <h1 >All the Posts</h1>
            <div className="blogs-container">
                {blogs.map((blog: {title: string}, i: number) => {return(
                    <div 

                        className={`blog-post color-${i%3}`}
                        key={i}>
                            {blog.title}
                    </div>
                )})} 
            </div>
              
        </div>

    </div>
        <style jsx>{`
            .posts-page-container {
                min-height: 100vh;
            }
            .content-container{
                max-width: 960px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content:center;
            }
            .color-0{background: var(--secondary-blue-1);}
            .color-1{background: var(--secondary-blue-2);}
            .color-2{background: var(--secondary-blue-3);}

        `}</style>
    </>)
}
export default Posts;


export const getStaticProps: GetStaticProps = async () => {
    const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL!);
    
    const query = gql`
        query BlogPost{
            blogPosts{
                title
                slug
                date
                description
                wideThumbnail{
                    url
                    size
                    width
                    height
                    fileName
                    mimeType
                }
                richText{
                    raw
                    html
                    markdown
                    text
                }

            }
        }
    `;
    const data:{blogPosts:[]} = await client.request(query);

    return {
        props: { blogs: data.blogPosts },
    };
}