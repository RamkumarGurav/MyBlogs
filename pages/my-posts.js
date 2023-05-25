import dynamic from "next/dynamic";
import MyPostsC from "../components/MyPostsC";

export default dynamic(() => Promise.resolve(MyPostsC), { ssr: false });
