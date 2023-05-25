import Layout from "../../layout/Layout";
import React from "react";
import Author from "../../components/_child/Author";
import AuthorSmall from "../../components/_child/AuthorSmall";
import Image from "next/image";
import Link from "next/link";
import Related from "../../components/_child/Related";
import fetcher from "../../lib/fetcher";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { getBlogs } from "../../lib/helper";
import Head from "next/head";
import axios from "axios";

const Post = ({ blogData }) => {
  // const Post = ({ fallback }) => {

  const router = useRouter();
  const { blogId } = router.query;
  // const { data, isLoading, isError, error } = fetcher(`/posts/${blogId}`);
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
  // const blogData = data && data?.data?.blog;

  return (
    // <SWRConfig value={fallback}>
    blogData && <Article {...blogData} />
    // </SWRConfig>
  );
};

export default Post;

function Article({
  title,
  subtitle,
  description,
  image,
  authorName,
  authorAvatar,
}) {
  return (
    <Layout>
      <Head>
        <title>Blog Post | MyBlogs</title>
      </Head>
      <div className="container mx-auto sm:px-20 lg:px-[200px] py-16 flex flex-col items-center gap-5 ">
        {authorName ? (
          <AuthorSmall authorName={authorName} authorAvatar={authorAvatar} />
        ) : (
          <></>
        )}
        <h1 className="text-2xl sm:text-3xl text-black font-bold text-center">
          {" "}
          {title}
        </h1>
        <p className="text text-gray-500 text-center ">{subtitle}</p>
        <div>
          <Image src={image} height={550} width={700} alt="post" />
        </div>
        <p className="text text-gray-700 text-left enable-spacing">
          {description}
        </p>
        {/* <Related /> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // got it from dynamic route
  const { blogId } = context.params;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${blogId}`
  );
  const data = res.data;

  return {
    props: {
      blogData: data.data.post, //this will be available as props in this pages component
    },
  };
}
export async function getStaticPaths() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts`);
  const data = res.data;
  const paths = data.data.posts.map((value) => {
    return {
      params: {
        blogId: value._id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
