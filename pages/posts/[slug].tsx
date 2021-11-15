import { useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import useSWR from "swr";
import { GraphQLClient, gql } from "graphql-request";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemote } from "next-mdx-remote";

interface IBlog{
  blog:{
    wideThumbnail: any;
    title:string;
    wideThumnail: object;
    slug:string;
    date: Date | string;
    description: string;
    richText: object;
  }
}

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL!);


export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query BlogPost{
      blogPosts{
        slug
      }
    }
  `;
  const data = await client.request(query);

  console.log("slugs ==>", data);
    
  return {
    paths: data.blogPosts.map((blog: { slug: string; }) => ({ params: { slug: blog.slug } })),
    // fallback: true,
    fallback: "blocking",

  };
};



export const getStaticProps: GetStaticProps = async ({ params }) => {

  const slug = params.slug as string;

  console.log("slug in getstaticprops ==>", slug)

  const query = gql`
  query BlogPost($slug: String!) {
    blogPost(where: { slug: $slug }) {
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
  const data: { blog: IBlog | null } = await client.request(query, { slug });

  // console.log("data.blogPost in get staticprops", data.blogPost);

  if (!data.blogPost) {
    return {
      notFound: true,
    };
  };

  return {
    props: { blog: data.blogPost },
    revalidate: 60 * 60,
  };
};


// The steps until this point works  but for some reason not the actual page; still gtting 404 page
export default function Blog ({ blog }:IBlog){

  console.log("this is the passed down blog ",blog);

  const testHTML = blog.richText[0].html

  return(<>
    <div className="post-page-container">
      <h1>{blog.title}</h1>
      {/* <div>{`${blog.richText[0].html}`}</div> */}
      <div 
        className="text-content"
        // ok ths works
        dangerouslySetInnerHTML={{__html: testHTML}}
        >
          {/* This also works  */}
          {/* <div>{ ReactHtmlParser(testHTML) }</div> */}
      </div>
    </div>

    <style jsx>{`
      .post-page-container{
        min-height: 100vh;
        max-width: 960px;
        margin:0 auto;
        display: grid;
        grid-template-columns: 100px 1fr 100px;
        grid-template-rows: repeat(auto-fit,minmax(auto, 1fr));
      }
      h1{
        margin: 0 auto;
        grid-column: 1 /-1;
      }
      .text-content{
        grid-column: 2 / 3; 
      }
    `}
      
    </style>
  </>);
};