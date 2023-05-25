/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import FileBase from "react-file-base64";
import { useMutation } from "react-query";
import ButtonLoader from "../../components/ButtonLoader";
import axios from "axios";

const forgotPassword = () => {
  const dispatch = useDispatch();

  //--------------------------------------------------------
  const [btnLoading, setBtnLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);

  const handleVisible = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };
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
    email: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const { email } = formValue;

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    toast.success("PasswordReset Link is Sent ,Please Check your Email.");
    setFormValue(initialState);

    setBtnLoading(false);
  };
  const onError = (error) => {
    setBtnLoading(false);
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  };

  const fetcher = (formData) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/password/forgot`,
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
    <Layout>
      <Head>
        <title>Forgot Password | MyBlogs</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="right-top flex flex-col items-center w-full  py-4">
          <h3 className="text-center  bg-yellow-400 cg-safron px-10 py-2 text-black my-4">
            Forgot Password
          </h3>

          <form
            className=" px-6 pt-6 pb-4 mb-4 min-w-[300px] sm:w-[400px]  border-[1px] border-[#ffffff] shadow-lg shadow-[#35c292] cg-safron rounded-lg bg-black/20 backdrop-blur-md"
            onSubmit={handleSubmit}
          >
            <div className=" relative mb-8">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  border-[#35c292] leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292]  "
                id="email"
                type="email"
                placeholder="Enter your Email"
                name="email"
                required
                value={email}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="cg-purple rounded-lg">
              <button
                className=" bg-white/20 backdrop-blur-md w-full flex justify-center items-center hover:bg-[#35c2932a] border-white/70 border-2 text-white  py-2 px-10 rounded focus:outline-none focus:shadow-outline  "
                type="submit"
              >
                {btnLoading ? "Sending Link to Email" : "SUBMIT"}
                {btnLoading ? <ButtonLoader /> : <></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default forgotPassword;
