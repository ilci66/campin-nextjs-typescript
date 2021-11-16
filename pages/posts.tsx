// import { gql } from '@apollo/client'
import { GraphQLClient, gql } from "graphql-request";
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
// import client from '../lib/apolloClient';

// itereate through the colours to create a background for the posts
// const postBGColors = ["var(--secondary-blue-1), var(--secondary-blue-2), var(--secondary-blue-1)"]

interface IBlog{
    wideThumbnail: any;
    title:string;
    wideThumnail: object;
    slug:string;
    date: Date | string;
    description: string;
    richText: object;
}

// will change the type later
const Posts: NextPage = ( { blogs }:any ) => {
    // console.log("blogs ==>",blogs)
    return(<>
    <Head>
    <title>Posts | Campin'</title>
        <meta name="description" content="All Posts and Short Descriptions" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
    <div className="posts-page-container">
        <h1 className="posts-page-title">All the Posts</h1>
        <div className="content-container">
            <div className="blogs-container">
                {blogs.map((blog: IBlog, i: number) => {return(
                    <div className={`blog-post color-${i%3}`}key={i}>
                            <img src={`${blog.wideThumbnail.url}`} alt="" className="blog-post-thumbnail" />
                            <div className="blog-post-info">
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p> 
                                <button className="see-more-button"><Link href={`/posts/${blog.slug}`}><a><span className="see-more-text">See More</span></a></Link></button>
                            </div>
                    </div>
                )})} 
            </div>
              
        </div>

    </div>
        <style jsx>{`
            .posts-page-container {
                display: flex;
                flex-direction: column;
            }
            .posts-page-title{
               padding: 20px;
               margin: 0 auto;
            }
            .content-container{
                max-width: 960px;
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: repeat(auto-fit,minmax(50px, 1fr));
                grid-gap: 50px;
                // align-items: center;
                // justify-items:center;
            }
            .blog-post{
                padding:20px;
                display: grid;
                border-top: 3px solid green;
                margin-top: 20px;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;
                justify-content: auto;
            }
            @media screen and (max-width: 600px){
                .blog-post{
                    grid-template-columns: 1fr;
                }
                .blog-post-thumbnail{
                    padding: 5px;
                }
            }
            .blog-post-info{
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
            }
            .blog-post-thumbnail{
                padding: 20px;
                width:100%;
                object-fit: cover;
            }
            .see-more-button{
                font-size:1.4rem;
                border: none;
                width: 100%;
                background: var(--main-footer-color);
                padding: 10px;
                margin-top: 20px;
                padding-bottom: 13px;
                border-radius: 10px;
            }
            .see-more-text{
                color: var(--main-text-color);
            }
            .color-0{background: var(--post-bg-1);}
            .color-1{background: var(--post-bg-2);}
            .color-2{background: var(--post-bg-3);}

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
        //forgot to add this
        revalidate: 10,
    };
}