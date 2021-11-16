import { useEffect, useState } from "react";
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
    richText: {
      html:string;
      raw:string;
    };
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

  // console.log("slugs ==>", data);
    
  return {
    paths: data.blogPosts.map((blog: { slug: string; }) => ({ params: { slug: blog.slug } })),
    // fallback: true,
    fallback: "blocking",

  };
};



export const getStaticProps: GetStaticProps = async ({ params }) => {

  const slug = params.slug as string;

  // console.log("slug in getstaticprops ==>", slug)

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
    revalidate: 10,
  };
};


// The steps until this point works  but for some reason not the actual page; still gtting 404 page
export default function Blog ({ blog }:IBlog){

  // console.log("this is the passed down blog ",blog.richText[0].raw);

  const contentText = Array.isArray(blog.richText) ? blog.richText[0].html :  blog.richText.html

  // console.log(blog.richText[0].raw)
  // this one captures the logo too
  // const imagesInText = document.querySelectorAll('img');
  useEffect(() => {
    // document.querySelectorAll('.text-content img').forEach(img => {
    //   console.log("image ==>", parseInt(img.width) <= 490)
    //   if(parseInt(img.width) <= 490) {return img.classList.add("rich-text-small-image")}
    //   else {img.classList.add("rich-text-large-image")}
    // });
    // // console.log(textContent)
  },[])
  // console.log("all images ==>", imagesInText) 
  useEffect(() => {
    // document.querySelectorAll('.text-content p').forEach(p => {
    //   p.classList.add("rich-text-p")
    // })
    // document.querySelectorAll(".text-content h2").forEach(headerTwo => {
    //   headerTwo.classList.add("rich-text-header-two")
    // })
    // document.querySelectorAll(".text-content h1").forEach(headerTwo => {
    //   headerTwo.classList.add("rich-text-header-one")
    // })
  }, [])
  

  return(<>
    <div className="post-page-container">
      <h1>{blog.title}</h1>
      {/* <div>{`${blog.richText[0].html}`}</div> */}
      <div 
        className="text-content"
        // ok ths works
        dangerouslySetInnerHTML={{__html: contentText}}
        >
          {/* This also works  */}
          {/* <div>{ ReactHtmlParser(contentText) }</div> */}
      </div>
    </div>

    <style jsx>{`
      .post-page-container{
        min-height: 100vh;
        max-width: 960px;
        margin:0 auto;
        display: grid;
        grid-template-columns: 100px 1fr 1fr 100px;
        // grid-template-rows: repeat(auto-fit,minmax(auto, 1fr));
      }
      .rich-text-image{
        width: 5%;
      }
      h1{
        margin: 0 auto;
        grid-column: 1 /-1;
      }
      .text-content{
        grid-column: 1 / -1;
        margin-bottom: 100px; 
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(auto-fit, minmax(auto, 1fr));
        justify-items: center;
        // align-items: center;
        grid-gap: 2rem;
      }
      .rich-text-h-2{
        grid-column: 1 /-1;
      }
      
    `}
      
    </style>
  </>);
};