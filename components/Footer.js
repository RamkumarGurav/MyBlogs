import Link from "next/link";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
  BsGithub,
} from "react-icons/bs";

import { AiFillLinkedin } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import Newslatter from "./_child/Newslatter";

const Footer = () => {
  return (
    <footer className=" py-5 gap-2 flex flex-col justify-center items-center ">
      <style jsx>
        {`
          footer {
            background: linear-gradient(
                rgba(215, 221, 230, 0.8) 0%,
                rgba(215, 221, 230, 0.8) 100%
              ),
              url("https://png.pngtree.com/background/20210709/original/pngtree-sketch-drawing-of-city-building-picture-image_895642.jpg")
                no-repeat center;
            background-size: cover;
          }
        `}
      </style>

      {/* <Newslatter /> */}
      <div
        className=" mt-10 px-12 flex flex-col gap-3  text-center w-full lg:flex-row justify-between items-center"
        id="footer"
      >
        <p className="text-sm text-gray-500  w-[300px]">
          All rights reserved 2023
        </p>
        <div className="flex justify-between w-[300px] items-center">
          <a href="https://www.facebook.com/ram.gurav.79">
            <BsFacebook
              size={20}
              className="text-gray-500 hover:text-teal-500"
            />
          </a>
          <a href="https://twitter.com/Raamathecoder">
            <BsTwitter
              size={20}
              className="text-gray-500 hover:text-teal-500"
            />
          </a>
          <a href="https://www.linkedin.com/in/ramkumar-gurav-645585250">
            <AiFillLinkedin
              size={20}
              className="text-gray-500 hover:text-teal-500"
            />
          </a>
          <a href="https://www.instagram.com/ram.gurav">
            <RiInstagramFill
              size={20}
              className="text-gray-500 hover:text-teal-500"
            />
          </a>
          <a href="https://github.com/RamkumarGurav">
            <BsGithub size={20} className="text-gray-500 hover:text-teal-500" />
          </a>
        </div>
        <p className="text-sm text-gray-500 w-[300px]">
          Designed by: Ramkumar Gurav
        </p>
      </div>
    </footer>
  );
};

export default Footer;
