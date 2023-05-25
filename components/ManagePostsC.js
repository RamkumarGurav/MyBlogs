import Head from "next/head";
import Layout from "../layout/Layout";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthorSmall from "../components/_child/AuthorSmall";
import fetcher from "../lib/fetcher";
import Error from "../components/Error";
import Spinner from "@/components/Spinner";
import ButtonLoader from "../components/ButtonLoader";
import Pagination from "react-js-pagination";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
var bId;

export default function ManagePostsC() {
  const [btnLoading, setBtnLoading] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };

  const fetcher = async (url) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.get(`${url}`);
    return res.data;
  };

  //here mutate is equevalent to refetch of useQuery
  const { data, isLoading, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?page=${pageIndex}&limit=6`,
    fetcher,
    {
      keepPreviousData: true,
      onSuccess: (data, key, config) => {},
      onError: (error, key, config) => {
        toast.error("Something Went Wrong");
      },
    }
  );

 
  //advance fetching
  // const { trigger } = useSWRMutation(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/mine?page=${
  //     pageIndex + 1
  //   }&limit=6`,
  //   fetcher,
  //   {
  //     keepPreviousData: true,
  //     onSuccess: (data, key, config) => {},
  //     onError: (error, key, config) => {
  //       toast.error("Something Went Wrong");
  //     },
  //   }
  // );

  // //-----------------Dele Post using reactquery--------------------------------------
  // const handleDeletePost = (id) => {
  //   bId = id;
  //   setBtnLoading(true);
  //   setPageIndex((prev) => prev);
  //   return refetchDel();
  // };

  // const deleteFetcher = async (id) => {
  //   const jwt = Cookies.get("jwt");
  //   const instance = axios.create({
  //     withCredentials: true, //adding cookies
  //   });

  //   instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  //   const res = await instance.delete(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${id}`
  //   );

  //   return res.data;
  // };

  // const {
  //   data: dataDel,
  //   isLoading: isLoadingDel,
  //   isError: isErrorDel,
  //   error: errorDel,
  //   refetch: refetchDel,
  // } = useQuery(
  //   "delBlog",
  //   () => deleteFetcher(bId),

  //   {
  //     enabled: false,

  //     onSuccess: (data) => {
  //       setBtnLoading(false);
  //       mutate();

  //       toast.success("Successfully Deleted the Post");
  //     },
  //     onError: (err) => {
  //       setBtnLoading(false);
  //       toast.error("Something Went Wrong");
  //     },
  //   }
  // );

  // --------delete using useSWRMutation----------------------------

  const deleteFetcher = async ([endpoint, xData], { arg: id }) => {
    //
    //passed arguemnt of trigger is available as "arg" inside an object which is the last element of array of arguements of deleteFetcher//we can get it as id usign alias name
    console.log(endpoint, xData, id);
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}/${id}`
    );

    return res.data;
  };
  const {
    data: sdataUpdate,
    error: serrorUpdate,
    isLoading: sisLoading,
    trigger,
  } = useSWRMutation(
    ["/admin/posts", "abc"],
    // ([endpoint, xData]) => deleteFetcher(endpoint, xData)
    deleteFetcher,
    {
      onSuccess: (data) => {
        setBtnLoading(false);
        mutate();
        toast.success("Successfully Deleted the Post");
      },
      onError: (err) => {
        setBtnLoading(false);
        toast.error("Something Went Wrong");
      },
    }
  );

  const handleDeletePost = (id) => {
    setBtnLoading(true);
    setPageIndex((prev) => prev);
    return trigger(id);
  };

  if (error) return <Error />;

  if (!data) return <Spinner />;

  const { resultsPerPage, postsCount, filteredPostsCount } = data && data?.data;
  console.log(filteredPostsCount, postsCount);

  return (
    <>
      <Head>
        <title>Manage Post | Admin | MyBlogs</title>
      </Head>

      <Layout>
        <div className="w-full">
          <div>
            <section id="posts" className="container mx-auto md:px-5 py-2">
              <h1 className="font-bold mx-auto w-[30%] text-xl sm:text-2xl text-gray-900 text-center my-1 pb-2  border-b-gray-300 border-b-2">
                Manage Posts
              </h1>
              {data && data.data.posts.length === 0 ? (
                <div className="flex justify-center items-center p-10 ">
                  <h1 className="text-xl text-gray-700">Empty!</h1>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 py-2 justify-center justify-items-center place-content-center place-items-stretch min-h-[500px] ">
                  {data &&
                    data.data.posts.map((value, i) => (
                      <Post
                        data={value}
                        key={i}
                        handleDeletePost={handleDeletePost}
                        btnLoading={btnLoading}
                      />
                    ))}
                </div>
              )}
            </section>
            {resultsPerPage < filteredPostsCount && (
              <div className="paginationBox">
                {postsCount && (
                  <Pagination
                    activePage={pageIndex}
                    itemsCountPerPage={Number(resultsPerPage)}
                    totalItemsCount={filteredPostsCount}
                    onChange={setPageIndexHandler}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

function Post({ data, handleDeletePost, btnLoading }) {
  const {
    _id,
    title,
    subtitle,
    description,
    authorName,
    authorAvatar,
    image,
    publishedAt,
    type,
    category,
  } = data;

  return (
    <div className="flex flex-col justify-start items-center rounded-b-md shadow-[#35c292] shadow-sm mx-2 bg-gray-50">
      <Link href={`/blogs/${_id}`} className="w-full">
        <div className="relative w-full h-64">
          <Image
            src={image || "/defualtPost.jpg"}
            alt="profile"
            fill
            sizes="(max-width: 640px) 100vw 
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
            // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

            priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
            className="rounded-md object-cover" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
          />
        </div>
      </Link>
      <div className="info flex flex-col justify-between px-2 ">
        <div className="cat mt-3">
          <span className="text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-xs  text-gray-800 hover:text-gray-600">
            -{" "}
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(publishedAt.toString())) || "Unknown"}
          </span>
        </div>
        <div className="head">
          <Link href={`/blogs/${_id}`} legacyBehavior>
            <a className="text font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-xs text-gray-500 py-2">{subtitle || "Unknown"}</p>
        {authorName ? (
          <AuthorSmall authorName={authorName} authorAvatar={authorAvatar} />
        ) : (
          <></>
        )}
        <div className="flex justify-around py-2">
          <button
            className=" bg-[tomato] backdrop-blur-md  flex justify-center items-center hover:bg-[#ff6347be]  text-white  py-1 px-4 rounded-full focus:outline-none focus:shadow-outline  "
            onClick={() => handleDeletePost(_id)}
          >
            Delete {bId === _id && btnLoading ? <ButtonLoader /> : null}
          </button>
          <Link
            href={`/blogs/update/${_id}`}
            className=" bg-green-500 backdrop-blur-md  flex justify-center items-center hover:bg-[#35c293d5]  text-white  py-1 px-4 rounded-full focus:outline-none focus:shadow-outline  "
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
