/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../../../layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import FileBase from "react-file-base64";
import { useMutation } from "react-query";
import ButtonLoader from "../../../components/ButtonLoader";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../../../redux/authSlice";

const changePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { resetId } = router.query;

  //--------------------------------------------------------
  const [btnLoading, setBtnLoading] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const handleVisible2 = (e) => {
    e.preventDefault();
    setIsVisible2(!isVisible2);
  };
  const handleVisible3 = (e) => {
    e.preventDefault();
    setIsVisible3(!isVisible3);
  };
  //--------------------------------------------------------

  const initialState = {
    password: "",
    passwordConfirm: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const { password, passwordConfirm } = formValue;

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    toast.success("Password changed Successfully ");
    setFormValue(initialState);
    const profile = data.data;
    localStorage.setItem("profile", JSON.stringify({ ...profile }));
    dispatch(setUser(profile));
    setBtnLoading(false);
    Cookies.set("loggedIn", true);
    // Cookies.set("jwt", profile.token); //in next js you need to manually set the cookies that are sent by the backend server
  };
  const onError = (error) => {
    setBtnLoading(false);
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  };

  const fetcher = async (formData) => {
    return axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/password/reset/${resetId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  };
  const { mutate, data, isError, isLoading, error } = useMutation(fetcher, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    setBtnLoading(true);
    mutate(formValue); //passing input formdata to api call
  };

  return (
    <div>
      <Head>
        <title>Reset Password | MyBlogs</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="right-top flex flex-col items-center w-full  py-4">
          <h3 className="text-center bg-[#6cff47] cg-safron px-10 py-2 text-white my-4">
            Reset Password
          </h3>
          {/* <div>
            <Image
              src={user?.data.user.avatar || "/defaultProfile.png"}
              width={180}
              height={180}
              className="rounded-full"
            ></Image>
          </div> */}
          <form
            className=" px-6 pt-6 pb-4 mb-4 min-w-[300px] sm:w-[400px]  border-[1px] border-[#ffffff] shadow-lg shadow-[#35c292] cg-safron rounded-lg bg-black/20 backdrop-blur-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 relative">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="newPassword"
                type={`${isVisible2 ? "text" : "password"}`}
                placeholder="New Password"
                name="password"
                required
                value={password}
                autoComplete="off"
                onChange={handleChange}
              />
              <div
                className="icon absolute top-2 right-4 cursor-pointer"
                onClick={handleVisible2}
              >
                {isVisible2 ? (
                  <BsEyeFill size={20} color="gray" />
                ) : (
                  <BsEyeSlashFill size={20} color="gray" />
                )}
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                className="shadow appearance-none border focus:border-purple-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="cPassword"
                type={`${isVisible3 ? "text" : "password"}`}
                placeholder="Confirm Password"
                name="passwordConfirm"
                required
                value={passwordConfirm}
                autoComplete="off"
                onChange={handleChange}
              />
              <div
                className="icon absolute top-2 right-4 cursor-pointer"
                onClick={handleVisible3}
              >
                {isVisible3 ? (
                  <BsEyeFill size={20} color="gray" />
                ) : (
                  <BsEyeSlashFill size={20} color="gray" />
                )}
              </div>
            </div>

            <button
              className=" bg-white/20 backdrop-blur-md w-full flex justify-center items-center hover:bg-[#35c2932a] border-white/40 border-2 text-white  py-2 px-10 rounded focus:outline-none focus:shadow-outline  "
              type="submit"
            >
              Reset Password
              {btnLoading ? <ButtonLoader /> : <></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default changePassword;
