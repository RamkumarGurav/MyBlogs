import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { RiPagesFill, RiDashboardFill } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import Spinner from "./Spinner";
import Error from "./Error";

const AccountC = () => {
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(user);
  useEffect(() => {
    refetch();
  }, []);
  const fetcher = async () => {
    const jwt = Cookies.get("jwt");
    // const instance = axios.create({
    //   withCredentials: true, //adding cookies
    // });

    // instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    // const res = await instance.get(
    //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`
    // );
    const res = axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "profile",
    fetcher,
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setUserInfo({ ...userInfo, ...data });
        // toast.success("success");
      },
      onError: (err) => {
        toast.error("Something Went Wrong");
      },
    }
  );

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
  return (
    <Layout>
      <Head>
        <title>{`${userInfo?.data.user.name || "Your"}'s Profile`}</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="left-bottom w-full sm:w-[300px] cg-primary text-white  pt-4 flex flex-col gap-4">
          <div className="flex justify-center items-center">
            <h3 className="text-black text-center font-semibold text-lg">
              My Account
            </h3>
          </div>

          <Link
            href={"/update-profile"}
            className="flex justify-between items-center text-black text-base px-2  p-2 hover:bg-yellow-500 h-cg-safron"
          >
            <span className="flex">
              <AiTwotoneSetting
                size={20}
                color="black"
                className="mr-[1vmax]"
              />{" "}
              Update Profile{" "}
            </span>

            <IoIosArrowForward color="black" size={20} />
          </Link>
          <Link
            href={"/password/change"}
            className="flex justify-between items-center text-black text-base px-2  p-2 hover:bg-yellow-500 h-cg-safron"
          >
            <span className="flex">
              <BsShieldLockFill
                size={20}
                color="black"
                className="mr-[1vmax] inline-block"
              />{" "}
              <span className="blackspace-nowrap">Change Password</span>
            </span>

            <IoIosArrowForward color="black" size={20} />
          </Link>
          <Link
            href={"/create-post"}
            className="flex justify-between items-center text-black text-base px-2  p-2 hover:bg-yellow-500 h-cg-safron"
          >
            <span className="flex">
              <BsFillChatSquareQuoteFill
                size={20}
                color="black"
                className="mr-[1vmax]"
              />{" "}
              Create Post
            </span>

            <IoIosArrowForward color="black" size={20} />
          </Link>
          <Link
            href={"/my-posts"}
            className="flex justify-between items-center text-black text-base px-2  p-2 hover:bg-yellow-500 h-cg-safron"
          >
            <span className="flex">
              <RiPagesFill size={20} color="black" className="mr-[1vmax]" /> My
              Posts
            </span>

            <IoIosArrowForward color="black" size={20} />
          </Link>
          <Link
            href={"/admin/manage-posts"}
            className="flex justify-between items-center text-black text-base px-2  p-2 hover:bg-yellow-500 h-cg-safron"
          >
            <span className="flex">
              <RiDashboardFill size={20} color="black" className="mr-[1vmax]" />
              Manage Posts
            </span>

            <IoIosArrowForward color="black" size={20} />
          </Link>
        </div>
        <div className="right-top flex flex-col items-center w-full   py-4">
          <h1 className="text-center text-xl  cg-safron text-white  px-6 rounded-lg py-2 bg-white/60 my-2 backdrop-blur-lg">
            My Profile
          </h1>
          <div>
            <Image
              src={userInfo?.data.user.avatar || "/Profile6.jpg"}
              width={180}
              height={180}
              alt="avatar"
              className="rounded-full"
            ></Image>
          </div>
          <div className="my-4">
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Name :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {userInfo?.data.user.name}
              </span>
            </h2>
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Email :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {userInfo?.data.user.email}
              </span>
            </h2>
            <h2 className="my-4">
              <span className="font-semibold text-base text-gray-800">
                Joined At :
              </span>
              <span className="text-gray-800 text-base mx-2">
                {String(userInfo?.data.user.createdAt).substring(0, 10)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountC;

// export async function getServerSideProps(context) {
//   //in ssr or ssg we need to manually add the cookie in the headers ,cookie state is alreadey stored in browser can be accessed using 'context.req.cookies' method
//   const { jwt } = context.req.cookies;
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
//     {
//       headers: { Cookie: `jwt=${jwt};` }, //'withCredentials:true' doesnt work inside getServerSideProps
//     }
//   );
//   const data = res.data;

//   // Pass data to the page via props
//   return { props: { userInfo: data } };
// }
