import { useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import useSWR from "swr";
import { GraphQLClient, gql } from "graphql-request";
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

  if (!data.blog) {
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
  return(
    // <div>The blog you wanna read</div>
    <div>{blog.title}</div>
  );
};