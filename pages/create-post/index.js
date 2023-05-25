import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import ButtonLoader from "@/components/ButtonLoader";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Head from "next/head";
import FileBase from "react-file-base64";
import Cookies from "js-cookie";

const createBlog = () => {
  const { user, isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  const initialState = {
    title: "",
    subtitle: "",
    description: "",
    category: "",
    type: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { title, subtitle, description, category, type } = formValue;
  const [imageURL, setImageURL] = useState("/defaultPost.jpg");

  //-------------------cloudinary-------------------------------------
  const [imageRaw, setImageRaw] = useState("");
  const [cldnryData, setCldnryData] = useState({});

  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (imageRaw) {
      setUploaded(false);
      setUploading(true);
      cldnryUpload();
    }
  }, [imageRaw]);

  const cldnryUpload = async () => {
    try {
      let formData = new FormData();
      formData.append("file", imageRaw);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLDNRY_UPLOAD_PRESET
      );
      formData.append("cloud_name", process.env.NEXT_PUBLIC_CLDNRY_CLOUD_NAME);
      // console.log("formData", formData);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLDNRY_CLOUD_NAME}/image/upload`,
        formData
      );

      setCldnryData(res.data);
      setImageURL(res.data.url);
      setUploaded(true);
      setUploading(false);
      setFormValue({
        ...formValue,
        image: res.data.url,
      });
    } catch (err) {
      setUploaded(false);
      setUploading(false);
      toast.error("Something Went Wrong ,Please Try to select Image again");
      console.log(err.response.data.message);
      // console.log(imageRaw);
      // console.log(err);
    }
  };

  // console.log(cldnryData);
  // console.log(imageURL);
  // console.log(imageRaw);
  // console.log(uploaded);

  //--------------------------------------------------------

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      image: imageURL,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    toast.success("Created Post Successfully");
    setBtnLoading(false);
    setFormValue(initialState);
    setCldnryData({});
    setImageURL("/defaultPost.jpg");
    setImageRaw("");
    setUploaded(false);
  };
  const onError = (error) => {
    setBtnLoading(false);
    toast.error(error.response.data.message);
  };

  const fetcherRegister = async (formValue) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`,
      formValue
    );

    // const res = await axios.post(
    //   `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`,
    //   formValue,
    //   {
    //     withCredentials: true,
    //   }
    // );
    return res.data;
  };
  const { mutate, data, isError, isLoading, error } = useMutation(
    fetcherRegister,
    {
      onSuccess,
      onError,
    }
  ); //here mutate is the function that passes input data to fetcher function directly

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      return toast.error("Please Select Category of the Post");
    }
    if (!type) {
      return toast.error("Please Select Type of the Post");
    }
    if (!imageRaw) {
      return toast.error("Please Select a Image for the Post");
    }
    // console.log(formValue);
    setBtnLoading(true);
    mutate(formValue); //passing input formdata to api call
  };

  return (
    <Layout>
      <Head>
        <title>Create Post | MyBlogs</title>
      </Head>

      <div className=" flex flex-col justify-center items-center w-full min-h-[400px] py-10 bg-wite">
        <h1 className="text-center text-xl  cg-safron text-white  px-6 rounded-lg py-2 my-2 ">
          Create a Blog Post
        </h1>
        <form
          className=" px-6 pt-6 pb-4 mb-4 min-w-[300px] w-[95%] sm:w-[80%]  border-[2px] border-[#ffffff8a] shadow-lg shadow-[#35c292] rounded-lg bg-black/10 backdrop-blur-md"
          onSubmit={registerSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base sm:text-xl font-bold mb-2"
              htmlFor="name"
            >
              Title of the Post
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292] "
              rows={2}
              cols={40}
              id="title"
              placeholder="Enter the Title of the Post"
              name="title"
              required
              value={title}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base sm:text-xl font-bold mb-2"
              htmlFor="subtitle"
            >
              Subtitle of the Post
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292] "
              rows={2}
              cols={40}
              id="subtitle"
              placeholder="Enter the Subtitle of the Post"
              name="subtitle"
              required
              value={subtitle}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base sm:text-xl font-bold mb-2"
              htmlFor="description"
            >
              Description of the Post
            </label>
            <textarea
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292] "
              rows={10}
              cols={40}
              id="description"
              name="description"
              placeholder="Enter the Description of the Post"
              required
              value={description}
              autoComplete="off"
              onChange={handleChange}
            />{" "}
          </div>
          <div className="mb-4">
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className="shadow  border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292] "
            >
              <option value="">Select Category of the Post</option>
              <option value="business">Business</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>
              <option value="cinema">Cinema</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="type"
              value={type}
              onChange={handleChange}
              className="shadow  border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#35c292] "
            >
              <option value="">Select Type of the Post</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="old">Old</option>
            </select>
          </div>
          {/* <div className="flex flex-col gap-4 items-center justify-center px-[2px] mb-4">
            {imageURL && (
              <Image
                src={imageURL}
                alt="avatar"
                width={250}
                height={250}
                className="mx-2 rounded-md h-auto"
                priority
              />
            )}

            <div className="flex">
              <div className="bg-gray-50 p-2 backdrop-blur-lg bg-black/10 ">
              
                <FileBase
                  type="file"
                  className="w-full"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setImageURL(base64);
                    setFormValue({ ...formValue, image: base64 });
                  }}
                />
              </div>
            </div>
          </div> */}
          {/*--------- using  cloudinary ----------*/}
          <div className="flex flex-col gap-4 items-center justify-center px-[2px] mb-4">
            {uploaded && (
              <Image
                src={imageURL}
                alt="avatar"
                width={250}
                height={250}
                className="mx-2 rounded-md h-auto"
                priority
              />
            )}

            <div className="flex relative overflow-hidden w-full">
              <div className="relative bg-white/80 p-2 backdrop-blur-lg border-white  w-full">
                <div className="absolute top-1 left-0 text-center w-full p-2 z-[1] text-base text-gray-700  cursor-pointer">
                  {uploading
                    ? "uploading..."
                    : uploaded
                    ? `${imageRaw.name}`
                    : "Choose a Image for the Post"}
                </div>
                <input
                  type="file"
                  onChange={(e) => setImageRaw(e.target.files[0])}
                  className="opacity-0 relative bg-transparent z-[500] w-full cursor-pointer"
                  required
                />
              </div>
              {/* <button
                className=" bg-blue-400 backdrop-blur-md w-full flex justify-center items-center  border-white/70 border-2 text-white  py-2 px-10 rounded focus:outline-none focus:shadow-outline  "
                disabled={!imageRaw}
                onClick={cldnryUpload}
              >
                {uploaded ? "uploaded" : "upload"}
              </button> */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="cg-purple rounded-lg w-full">
              <button
                className=" bg-white/20 backdrop-blur-md w-full flex justify-center items-center hover:bg-[#35c2932a] border-white/70 border-2 text-white  py-2 px-10 rounded focus:outline-none focus:shadow-outline  "
                type="submit"
              >
                SUBMIT
                {btnLoading ? <ButtonLoader /> : <></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default createBlog;
