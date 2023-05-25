import dynamic from "next/dynamic";
import ManagePostsC from "../../components/ManagePostsC";

export default dynamic(() => Promise.resolve(ManagePostsC), { ssr: false });
