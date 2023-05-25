import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthorSmall = ({ authorName, authorAvatar }) => {
  return (
    <div className="author flex py-3">
      <Image
        src={authorAvatar || "/images/author/author1.jpg"}
        width={45}
        height={45}
        alt="author"
        className="rounded-full h-[45px] w-[45px]"
      ></Image>
      <div className="flex flex-col justify-center px-2 ">
        <div className="text-xs md:text-sm font-bold text-gray-800 hover:text-gray-600">
          {authorName || "Unknown"}
        </div>
        {/* <span className="text-xs md:text-sm text-gray-500">
          {designation || "Unknown"}
        </span> */}
      </div>
    </div>
  );
};

export default AuthorSmall;
