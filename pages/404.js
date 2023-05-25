import Link from "next/link";
import Head from "next/head";
import { Ramabhadra } from "next/font/google";

const pageNotFound = () => {
  return (
    <div id="notfound">
    <Head>
      <title>Page Not Found | 404</title>
    </Head>
      <div className="notfound">
        <div className="notfound_404">
          <h1 className="title">404</h1>
        </div>
        <h2 className="sub_title" style={{ textTransform: "upperCase" }}>
          We are sorry, Page Not Found!
        </h2>
        <p className="para_small" style={{ textTransform: "upperCase" }}>
          The page you are looking for might have been removed or had its name
          changed or is temporarily unavailable
        </p>
        <Link
          href="/"
          className="bbtn small_txt "
          style={{ textTransform: "upperCase" ,fontSize:'12px'}}
        >
          Back To Homepage
        </Link>
      </div>
    </div>
  );
};

export default pageNotFound;


