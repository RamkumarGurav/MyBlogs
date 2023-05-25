import React from "react";
import Link from "next/link";
import Image from "next/image";
import AuthorSmall from "./_child/AuthorSmall";
import globalFetcherEmtf from "../lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";
const Section4 = () => {
  const { data, isLoading, isError, error } = globalFetcherEmtf(
    "/posts?page=1&limit=1000",
    "get"
  );
  console.log(error);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  const businessBlogs =
    data &&
    data?.data?.posts
      .filter((item) => item.category === "business")
      .slice(0, 10);
  const travelBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "travel")
      .slice(0, 10);
  const technologyBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "technology")
      .slice(0, 10);
  // console.log(technologyBlogs);
  const lifeStyleBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "lifeStyle")
      .slice(0, 10);
  const educationBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "education")
      .slice(0, 10);
  const sportsBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "sports")
      .slice(0, 10);
  const cinemaBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "cinema")
      .slice(0, 10);
  const healthBlogs =
    data &&
    data?.data?.posts
      ?.filter((item) => item.category === "health")
      .slice(0, 10);

  // console.log(healthBlogs);
  return (
    <section className="bg-white/60 backdrop-blur-lg ">
      {(businessBlogs.length !== 0 || travelBlogs.length !== 0) && (
        <div
          id="popular_posts"
          className="container mx-auto px-2 grid lg:grid-cols-2  gap-6 py-16 "
        >
          {businessBlogs.length !== 0 && (
            <div className="left-or-top">
              <h2 className="text-left text-xl  cg-safron text-white  px-6 py-2 my-2 ">
                Business
              </h2>
              {isLoading && <Spinner />}
              {isError && <Error />}
              <div className="flex flex-col items-start gap-4 py-8">
                {businessBlogs.length !== 0 &&
                  businessBlogs.map((value, i) => (
                    <Post data={value} key={i} />
                  ))}
              </div>
            </div>
          )}
          {travelBlogs.length !== 0 && (
            <div className="righ-or-bottom">
              <h2 className="text-left text-xl  cg-safron text-white  px-6 py-2 my-2 ">
                Travel
              </h2>
              <div className="flex flex-col items-start gap-4 py-8">
                {travelBlogs.length !== 0 &&
                  travelBlogs.map((value, i) => <Post data={value} key={i} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {(sportsBlogs.length !== 0 || cinemaBlogs.length !== 0) && (
        <div
          id="popular_posts"
          className="container mx-auto px-2 grid lg:grid-cols-2  gap-6 py-16"
        >
          {sportsBlogs.length !== 0 && (
            <div className="left-or-top">
              <h2 className="text-left text-xl  cg-green text-white  px-6 py-2 my-2 ">
                Sports
              </h2>
              {isLoading && <Spinner />}
              {isError && <Error />}
              <div className="flex flex-col items-start gap-4 py-8">
                {sportsBlogs &&
                  sportsBlogs.map((value, i) => <Post data={value} key={i} />)}
              </div>
            </div>
          )}
          {cinemaBlogs.length !== 0 && (
            <div className="righ-or-bottom">
              <h2 className="text-left text-xl  cg-green text-white  px-6 py-2 my-2 ">
                {" "}
                Cinema
              </h2>
              <div className="flex flex-col items-start gap-4 py-8">
                {cinemaBlogs.length !== 0 &&
                  cinemaBlogs.map((value, i) => <Post data={value} key={i} />)}
              </div>
            </div>
          )}
        </div>
      )}
      {(healthBlogs.length !== 0 || educationBlogs.length !== 0) && (
        <div
          id="popular_posts"
          className="container mx-auto px-2 grid lg:grid-cols-2  gap-6 py-16"
        >
          {healthBlogs.length !== 0 && (
            <div className="left-or-top">
              <h2 className="text-left text-xl  cg-purple text-white  px-6 py-2 my-2 ">
                Health
              </h2>
              {isLoading && <Spinner />}
              {isError && <Error />}
              <div className="flex flex-col items-start gap-4 py-8">
                {healthBlogs.length !== 0 &&
                  healthBlogs.map((value, i) => <Post data={value} key={i} />)}
              </div>
            </div>
          )}
          {educationBlogs.length !== 0 && (
            <div className="righ-or-bottom">
              <h2 className="text-left text-xl  cg-purple text-white  px-6 py-2 my-2 ">
                Education
              </h2>
              <div className="flex flex-col items-start gap-4 py-8">
                {educationBlogs.length !== 0 &&
                  educationBlogs.map((value, i) => (
                    <Post data={value} key={i} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
      {(lifeStyleBlogs.length !== 0 || technologyBlogs.length !== 0) && (
        <div
          id="popular_posts"
          className="container mx-auto px-2 grid lg:grid-cols-2  gap-6 py-16"
        >
          {lifeStyleBlogs.length !== 0 && (
            <div className="left-or-top">
              <h2 className="text-left text-xl  cg-purple text-white  px-6 py-2 my-2 ">
                Lifestyle
              </h2>
              {isLoading && <Spinner />}
              {isError && <Error />}
              <div className="flex flex-col items-start gap-4 py-8">
                {lifeStyleBlogs.length !== 0 &&
                  lifeStyleBlogs.map((value, i) => (
                    <Post data={value} key={i} />
                  ))}
              </div>
            </div>
          )}
          {technologyBlogs.length !== 0 && (
            <div className="righ-or-bottom">
              <h2 className="text-left text-xl  cg-purple text-white  px-6 py-2 my-2 ">
                Technology
              </h2>
              <div className="flex flex-col items-start gap-4 py-8">
                {technologyBlogs.length !== 0 &&
                  technologyBlogs.map((value, i) => (
                    <Post data={value} key={i} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Section4;

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
    <div className="flex justify-start rounded-md shadow-md shadow-[#020202a6] bg-white w-full ">
      <Link href={`/blogs/${_id}`} className="w-[40%] ">
        {/*IMP for width management*/}
        <div className="relative w-full h-full">
          <Image
            src={image || "/defualtPost.jpg"}
            alt="profile"
            fill
            sizes="(max-width: 640px) 100vw 
              (max-width: 1024px) 50vw,
              33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
            // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

            priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
            className="rounded-md object-cover " //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
          />
        </div>
      </Link>
      <div className="info flex flex-col px-2 w-[60%]">
        {/*IMP for width management*/}
        <div className="cat">
          <span className="text-xs sm:text-sm text-orange-500 hover:text-orange-900">
            {category || "Unknown"}{" "}
          </span>
          <span className="text-xs sm:text-sm  text-gray-800 hover:text-gray-600">
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
            <a className="text-sm sm:text-sm font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}{" "}
            </a>
          </Link>
        </div>
        {authorName ? (
          <AuthorSmall authorName={authorName} authorAvatar={authorAvatar} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
