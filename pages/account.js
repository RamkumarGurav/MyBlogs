import dynamic from "next/dynamic";
import AccountC from "../components/AccountC";

export default dynamic(() => Promise.resolve(AccountC), { ssr: false });
