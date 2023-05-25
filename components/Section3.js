import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import AuthorSmall from "./_child/AuthorSmall";
import fetcher from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";
import { useQuery } from "react-query";
import axios from "axios";

const Section3 = ({ initialData }) => {
  const pBlogs = initialData?.data.posts.filter(
    (blog, i) => blog.type === "popular"
  );

  // const { data, isLoading, isError, error } = fetcher(
  //   `/blogs?page=1&limit=100`
  // );
  // console.log(data);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
  // const trendingBlogs = data && data?.data.blogs;
  // const fetcher = async () => {
  //   const instance = axios.create({
  //     withCredentials: true, //adding cookies
  //   });

  //   const res = await instance.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?`
  //   );

  //   return res.data;
  // };

  // const { data, isLoading, isError, error, refetch } = useQuery(
  //   "pupularBlogs",
  //   fetcher,
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  SwiperCore.use([Autoplay]);
  return (
    <section id="popular" className="container mx-auto md:px-5 py-16">
      <h1 className="font-bold mx-auto w-[60%] text-2xl sm:text-4xl text-gray-900 text-center my-12 pb-2  border-b-gray-300 border-b-2">
        Most Popular
      </h1>
      <Swiper
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        autoplay={{ delay: 3000 }}
      >
        {pBlogs &&
          pBlogs?.map((value, i) => (
            <SwiperSlide key={i}>
              <Post data={value} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Section3;

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
    <div className="flex flex-col justify-center items-center rounded-b-md shadow-sm mx-2">
      <Link href={`/blogs/${_id}`} className="w-full">
        <div className="relative w-full h-[210px] md:h-[350px]">
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
      <div className="info flex flex-col justify-center px-2 bg-gray-50">
        <div className="cat mt-3">
          <span className="text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-sm  text-gray-800 hover:text-gray-600">
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
            <a className="text md:text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-xs  text-gray-500 py-2">{subtitle || "Unknown"}</p>
        {authorName ? (
          <AuthorSmall authorName={authorName} authorAvatar={authorAvatar} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
