/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import FileBase from "react-file-base64";
import { useMutation } from "react-query";
import ButtonLoader from "../components/ButtonLoader";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import Cookies from "js-cookie";
import useSWRMutation from "swr/mutation";

const UpdateProfileC = () => {
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const [userInfo, setUserInfo] = useState(user);
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    name: userInfo?.data.user.name,
    email: userInfo?.data.user.email,
  });
  const { name, email, password, passwordConfirm } = formValue;

  const [imageURL, setImageURL] = useState(userInfo?.data.user.avatar);

  //-------------------cloudinary-------------------------------------
  const [imageRaw, setImageRaw] = useState("");
  const [cldnryData, setCldnryData] = useState({});

  const [uploaded, setUploaded] = useState(false);
  useEffect(() => {
    if (imageRaw) {
      setUploaded(false);
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
      setFormValue({
        ...formValue,
        image: res.data.url,
      });
    } catch (err) {
      setUploaded(false);
      toast.error("Something Went Wrong ,Please Try to select Image again");

      // console.log(imageRaw);
      // console.log(err);
    }
  };

  // console.log(cldnryData);
  // console.log(imageURL);
  // console.log(imageRaw);
  // console.log(uploaded);

  const UpdateDataChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      avatar: imageURL,
    });
  };

  //--------------------------------------------------------

  const onSuccess = (data) => {
    const profile = data;
    const profileWithToken = { ...user, ...profile };
    localStorage.setItem("profile", JSON.stringify({ ...profileWithToken }));
    dispatch(setUser(profileWithToken));
    toast.success("Profile Updated Successfully");
    setBtnLoading(false);
    setUploaded(false);
  };
  const onError = (error) => {
    console.log(error.response.data.message);
    setBtnLoading(false);
    setUploaded(false);
    toast.error("Update Failed, Try agian!");
  };

  const fetcherUpdate = async (formData) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.patch(`/users/me/update`, formData);

    return res.data;

    //--------------------------------------------------------
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me/update`,
    //   {
    //     method: PATCH,
    //     credentials: "include",//this set access-Control-Allow-Credentials: true
    //   }
    // );
    // const xdata = res.json();
    // const data = { data: xdata };
    // return data;

    //--------------------------------------------------------
  };
  const {
    mutate: mutateUpdate,
    data: dataUpdate,
    isError: isErrorUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useMutation(fetcherUpdate, {
    onSuccess,
    onError,
  }); //here mutate is the function that passes input data to fetcher function directly

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    setBtnLoading(true);
    mutateUpdate(formValue); //passing input formdata to api call
  };

  return (
    <Layout>
      <Head>
        <title>{`${user?.data.user.name}'s Profile Update`} | MyBlogs</title>
      </Head>
      <div className="flex flex-col sm:flex-row w-full min-h-[80vh]">
        <div className="right-top flex flex-col items-center w-full  py-4">
          <h3 className="text-center  bg-yellow-400 text-black cg-safron px-10 py-2  my-4">
            Update My Profile
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
            className=" shadow-lg rounded-md shadow-green-400 px-6 py-4 mb-4 min-w-[300px] sm:w-[400px]
            border-[.5px]  border-[#35c291c5]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-[#35c291c5]rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                autoComplete="off"
                onChange={UpdateDataChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border focus:border-[#35c291c5] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-200/60"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                autoComplete="off"
                onChange={UpdateDataChange}
              />
            </div>
            {/* <div
              className="signUpImage flex items-center px-[2px]"
              id="signUpImage"
            >
              <Image
                src={image}
                alt="avatar"
                width={100}
                height={100}
                className="mx-2 rounded-full"
                priority
              />

              <FileBase
                type="file"
                className="w-full"
                multiple={false}
                onDone={({ base64 }) => {
                  setImage(base64);
                  setFormValue({ ...formValue, avatar: base64 });
                }}
              />
            </div> */}
            {/*--------- using  cloudinary ----------*/}
            <div className="flex flex-col gap-4 items-center justify-center px-[2px] mb-4">
              <Image
                src={imageURL}
                alt="avatar"
                width={75}
                height={75}
                className="mx-2 rounded-full"
                priority
              />

              <div className="flex relative overflow-hidden w-full">
                <div className="relative  backdrop-blur-lg border-white bg-gray-500/20  w-full">
                  <div className="absolute top-1 left-0 text-center w-full  z-[1] text-base text-gray-700  cursor-pointer">
                    {uploaded
                      ? `${imageRaw.name}`
                      : "Select a Image for the Post"}
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
      </div>
    </Layout>
  );
};

export default UpdateProfileC;

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
//   return { props: { useInfoX: data } };
// }
