import Image from "next/image";
import Link from "next/link";
import React from "react";

const Author = ({ authorName, authorAvatar }) => {
  return (
    <div className="author flex py-5 ">
      <Image
        src={authorAvatar} //remote url
        width={65} //always bigger or equal to controlling image sizes
        height={65} //always bigger or equal to controlling image sizes
        alt="author"
        className="rounded-full h-[60px] w-[60px]" //controlling image size
      ></Image>
      <div className="flex flex-col justify-center px-4 ">
        <div className="text-md font-bold text-gray-800 hover:text-gray-600">
          {authorName}
        </div>
        {/* <span className="text-md text-gray-500">{designation}</span> */}
      </div>
    </div>
  );
};

export default Author;
