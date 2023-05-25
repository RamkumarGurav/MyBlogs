import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthorSmall from "./_child/AuthorSmall";
import Spinner from "./Spinner";
import Error from "./Error";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useQuery } from "react-query";
import useSWR from "swr";

const Section2 = ({ initialData }) => {
  // const dispatch = useDispatch();
  const slicedArray = initialData?.data.posts.slice(0, 6);
  const x = {
    ...initialData,
    data: { ...initialData.data, posts: slicedArray },
  };
  const [bData, setBData] = useState(x);

  const [pageIndex, setPageIndex] = useState(1);
  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };

  //--------------using useQuery------------------------------------------

  // const fetcher = async (pageIndex) => {
  //   const instance = axios.create({
  //     withCredentials: true, //adding cookies
  //   });

  //   const res = await instance.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?page=${pageIndex}&limit=6`
  //   );

  //   return res.data;
  // };

  // const { data, isLoading, isError, error } = useQuery(
  //   [`myPosts${pageIndex}`, pageIndex],
  //   () => fetcher(pageIndex),
  //   {
  //     // staleTime: 100000,
  //     keepPreviousData: true,
  //     onSuccess: (data) => {
  //       setBData(data);
  //     },
  //     onError: (err) => {
  //       toast.error("Something Went Wrong");
  //     },
  //   }
  // );
  //--------------------------------------------------------

  //--------------using useSWR------------------------------------------
  const fetcher = async (url) => {
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    const res = await instance.get(`${url}`);
    return res.data;
  };

  //here mutate is equevalent to refetch of useQuery
  const { data, isLoading, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?page=${pageIndex}&limit=6`,
    fetcher,
    {
      keepPreviousData: true,
      onSuccess: (data, key, config) => {
        setBData(data);
      },
      onError: (error, key, config) => {
        toast.error("Something Went Wrong");
      },
    }
  );

  // //advance fetching
  // const {
  //   data: d,
  //   isLoading: iL,
  //   error: e,
  //   mutate: m,
  // } = useSWR(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?page=${pageIndex + 1}&limit=6`,
  //   fetcher,
  //   {
  //     keepPreviousData: true,
  //     onSuccess: (data, key, config) => {},
  //     onError: (error, key, config) => {
  //       toast.error("Something Went Wrong");
  //     },
  //   }
  // );

  const { resultsPerPage, postsCount, filteredPostsCount } = bData?.data;

  return (
    <div>
      <section id="latest" className="container mx-auto md:px-5 py-10">
        <h1 className="font-bold mx-auto w-[60%] text-2xl sm:text-4xl text-gray-900 text-center my-12 pb-2  border-b-gray-300 border-b-2">
          Latest Blogs
        </h1>
        {/* {isLoading && <Spinner />}
      {isError && <Error />} */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {bData &&
            bData.data.posts
              .slice(0, 6)
              .map((value, i) => <Post data={value} key={i} />)}
        </div>
      </section>
      {resultsPerPage < filteredPostsCount && (
        <div className="paginationBox">
          {postsCount && (
            <Pagination
              activePage={pageIndex}
              itemsCountPerPage={Number(resultsPerPage)}
              totalItemsCount={postsCount}
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
  );
};
export default Section2;

function Post({ data }) {
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
    <div className="flex flex-col justify-start items-center shadow-[#35c292] cg-green2 rounded-b-md shadow-md mx-2 bg-gray-50">
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
      </div>
    </div>
  );
}
