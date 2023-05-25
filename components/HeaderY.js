import Link from "next/link";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { ImBlog } from "react-icons/im";

// import { GiHamburgerMenu, GiClose } from "react-icons/gi";
// import { BiClose, BiHamburgerMenu } from "react-icons/bi";
// import { AiClose, AiHamburgerMenu ,AiOutlineMenu} from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setLogout,
  setAuthFalse,
  setAuthTrue,
} from "../redux/authSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const HeaderY = ({ home }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (JSON.parse(localStorage.getItem("profile"))) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        dispatch(setUser(profile));
        Cookies.set("jwt", profile.token);
        Cookies.set("loggedIn", true);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get("loggedIn") === true) {
      Cookies.set("jwt", user?.token);
    }
  }, [dispatch, user]);

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const fetcher = async () => {
    const data = await axios.get(`${baseURL}/users/logout`);
    return data;
  };

  const onSuccess = () => {
    router.push("/");

    dispatch(setLogout());
    Cookies.remove("loggedIn");
    Cookies.remove("jwt");
    toast.success("Logged out Successfully");
  };
  const onError = () => {
    toast.error("Logout failed, Something went wrong");
  };

  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    "logout",
    fetcher,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  return (
    <header className="bgx-primary backdrop-blur-md shadow-md border-b-2 border-white/60 w-full relative z-[999] ">
      <div className="relative  px-[2vmax] lg:px-[4vmax]  flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center ">
        <div className="flex py-5 bgx-primary   justify-between items-center  z-[500] ">
          <Link
            href="/"
            className="merriweather lato text-xl  flex items-center rounded-2xl px-2  text-[#fafafa] "
          >
            MyBlogs
            <ImBlog size={29} className="ml-1" />
          </Link>

          {open ? (
            <CgClose
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          ) : (
            <HiMenu
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          )}
        </div>

        <div
          className={`flex pb-5 pl-6 pt-5  bgx-primary w-full text-white duration-500 ease-in-out  flex-col items-start gap-4 absolute lg:static  ${
            !open
              ? "top-[-500%] left-0  items-start w-full shadow-md "
              : "top-16  left-0"
          } lg:flex-row lg:justify-between lg:items-center lg:gap-8 lg:w-fit lg:p-0 lg:shadow-none z-[200]`}
        >
          {/* <div className="flex flex-col gap-5  lg:flex-row  lg:justify-center lg:items-center"> */}
          {/* <input
            type="text"
            placeholder="Search..."
            className="text-sm block w-60 px-3 py-1 mt-2 lg:mt-none bg-white text-gray-600 rounded-full shadow-sm placeholder-slate-500  border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
              
              "
          /> */}

          <Link
            href={"/"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300 "
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              scroll={false}
              href={"/create-post"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            >
              Create Post
            </Link>
          )}
          {isAuthenticated && (
            <Link
              scroll={false}
              href={"/my-posts"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
            >
              My Posts
            </Link>
          )}

          {/* <Link
            href={"/about"}
            className="text-md navlink relative text-white hover:text-gray-200 duration-300"
          
            About
          </Link> */}
          {isAuthenticated ? (
            <div className="flex flex-col items-start lg:flex-row lg:items-center gap-4">
              <button
                onClick={refetch}
                className="text-md bg-[#35c291]  text-[#fff] duration-300 border-2 border-gray-50 px-2 py-1 rounded-2xl hover:bg-[#fff] hover:text-[#35c291]"
              >
                Logout
              </button>
              <Link href={"/account"} className="flex items-center">
                {/* <Image
                  src={`${user?.data.user.avatar}`}
                  width={40}
                  height={40}
                  alt="author"
                  className="rounded-full border-2 border-white"
                ></Image> */}
                <BsFillPersonFill size={30} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-4">
              <Link
                href={"/signin"}
                className=" text-md bg-[#35c291]  text-[#fff] duration-300 border-2 border-gray-50 px-2 py-1 rounded-2xl hover:bg-[#fff] hover:text-[#35c291]"
              >
                SignIn
              </Link>

              <Link
                href={"/signup"}
                className="text-md bg-[#35c291]  text-[#fff] duration-300 border-2 border-gray-50 px-2 py-1 rounded-2xl hover:bg-[#fff] hover:text-[#35c291]"
              >
                SignUp
              </Link>
            </div>
          )}

          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default HeaderY;
