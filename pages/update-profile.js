import dynamic from "next/dynamic";
import UpdateProfileC from "../components/UpdateProfileC";

export default dynamic(() => Promise.resolve(UpdateProfileC), { ssr: false });
