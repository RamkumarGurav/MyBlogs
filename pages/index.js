import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Layout from "../layout/Layout";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import axios from "axios";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import useSWR from "swr";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const fetcher = async () => {
  //   const instance = axios.create({
  //     withCredentials: true, //adding cookies
  //   });

  //   const res = await instance.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`
  //   );

  //   return res.data;
  // };

  // const { data, isLoading, isError, error } = useQuery("posts", fetcher, {
  //   keepPreviousData: true,
  //   staleTime: 6000000,
  // });

  const fetcher = async (url) => {
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    const res = await instance.get(`${url}`);
    return res.data;
  };

  //here mutate is equevalent to refetch with withoout enalbe=false of useQuery
  const { data, isLoading, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts`,
    fetcher,
    {
      keepPreviousData: true,
      onSuccess: (data, key, config) => {},
      onError: (error, key, config) => {
        toast.error("Something Went Wrong from HOmepage");
      },
    }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <>
      <Layout home>
        <Head>
          <title>Home | MyBlogs.com </title>
        </Head>
        <div className="w-full">
          <Section1 initialData={data}></Section1>
          <Section2 initialData={data}></Section2>
          <Section3 initialData={data}></Section3>
          <Section4></Section4>
        </div>
      </Layout>
    </>
  );
}

// export async function getServerSideProps() {
//   const res = await axios.get(
//     "https://talented-ant-loincloth.cyclic.app/api/v1/blogs",
//     { withCredentials: true }
//   );

//   const data = res.data;

//   return {
//     props: {
//       data,
//     },
//   };
// }
