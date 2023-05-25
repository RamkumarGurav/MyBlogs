
import React from "react";
import AuthorSmall from "./AuthorSmall";
import Image from "next/image";
import Link from "next/link";


const Related = () => {
  return (
    <div className="w-full mt-10">
    <h2 className="font-semibold text-2xl text-gray-700">Related</h2>
    <div className="flex flex-col items-start gap-4 py-8 w-full">
      {rPost()}
      {rPost()}
      {rPost()}
    </div>
  </div>
  )
}

export default Related


function rPost() {
  return (
    <div className="flex flex-col sm:flex-row rounded-sm shadow-sm bg-rose-50/20 w-full">
      <Link href={"/"} className="w-full  sm:w-[20%]">
        <div className="relative w-full h-[200px] sm:h-full">
          <Image
            src={"/images/img5.png"}
            alt="profile"
            objectFit="cover"
            fill
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="info flex flex-col px-2">
        <div className="cat">
          <Link
            href={"/"}
            className="text-xs sm:text-sm text-orange-500 hover:text-orange-900"
          >
            Business, Travel
          </Link>
          <Link
            href={"/"}
            className="text-xs sm:text-sm  text-gray-800 hover:text-gray-600"
          >
            - Jan 3,2023
          </Link>
        </div>
        <div className="head">
          <Link href={"/"} legacyBehavior>
            <a className="text-sm sm:text-sm font-bold text-gray-800 hover:text-gray-600">
              Your most unhappy customers are your greatest source of learning
            </a>
          </Link>
        </div>

        <AuthorSmall />
      </div>
    </div>
  );
}
