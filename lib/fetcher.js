import useSWR from "swr";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import axios from "axios";

//--------------------------------------------------------

const fetcherAll = async (url, method, token, formData) => {
  const instance = axios.create({
    withCredentials: true, //adding cookies
  });

  if (token !== "_" && token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  let res;

  switch (method) {
    case "get":
      res = await instance.get(`${url}`);
      break;
    case "post":
      res = await instance.post(`${url}`, formData);
      break;
    case "patch":
      res = await instance.patch(`${url}`, formData);
      break;
    case "put":
      res = await instance.put(`${url}`, formData);
      break;
    case "delete":
      res = await instance.delete(`${url}`);
      break;
    default:
      res = null;
  }

  // if (method === "get") {
  //   res = await instance.get(`${url}`);
  // }
  // if (method === "post") {
  //   res = await instance.post(`${url}`, formData);
  // }
  // if (method === "patch") {
  //   res = await instance.patch(`${url}`, formData);
  // }
  // if (method === "put") {
  //   res = await instance.put(`${url}`, formData);
  // }
  // if (method === "delete") {
  //   res = await instance.delete(`${url}`);
  // }

  return res.data;
};

export default function globalFetcherEmtf(endpoint, method, token, formData) {
  const { data, error } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
      method,
      token,
      formData,
    ],
    ([url, method, token, formData]) =>
      fetcherAll(url, method, token, formData),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    error,
  };
}

//--------------------------------------------------------

export function globalFetcherUmtf(url, method, token, formData) {
  const { data, error } = useSWR(
    [`${url}`, method, token, formData],
    ([url, method, token, formData]) =>
      fetcherAll(url, method, token, formData),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    error,
  };
}

//--------------------------------------------------------
//--------------------------------------------------------

const fetcher = async (url) => {
  const jwt = Cookies.get("jwt");
  const instance = axios.create({
    withCredentials: true, //adding cookies
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  const res = await instance.get(`${url}`);
  return res.data;
};

// console.log(process.env.NEXT_PUBLIC_SERVER_URL);
export function getData(endpoint, token) {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, token],
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    error,
  };
}

//--------------------------------------------------------

//--------------------------------------------------------
const fetcherWithToken = async (url, token) => {
  const instance = axios.create({
    withCredentials: true, //adding cookies
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await instance.get(`${url}`);
  return res.data;
};

export function getDataWithToken(endpoint, token) {
  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, token],
    ([url, token]) => fetcherWithToken(url, token),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    error,
  };
}
//--------------------------------------------------------
const fetcherPoster = async (url, token, method) => {
  const instance = axios.create({
    withCredentials: true, //adding cookies
  });

  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const res = await instance.get(`${url}`);
  return res.data;
};

export function postData(endpoint, token) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
    fetcherPoster,
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    error,
  };
}
