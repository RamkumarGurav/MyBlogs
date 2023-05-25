import Layout from "../layout/Layout";
import React from "react";
import Image from "next/image";
import Head from "next/head";

const about = () => {
  return (
    <Layout>
      <Head>
        <title>About | RBlogs</title>
      </Head>
      <div className="grid lg:grid-cols-2 gap-6 mx-5 py-10">
        <div className="image flex justify-center ">
          <Image
            src={"/images/author/author2.jpg"}
            height={500}
            width={500}
            alt="post"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 p-5">
          <h2 className="text sm:text-xl text-teal-900">
            <span className="text sm:text-xl font-bold text-gray-700">
              Name
            </span>{" "}
            : Ramkumar Gurav
          </h2>
          <p className="text sm:text-xl text-teal-900">
            <span className="text sm:text-xl font-bold text-gray-700">
              Email{" "}
            </span>{" "}
            : raamthecoder@gmail.com
          </p>
          <p className="text sm:text-xl text-teal-900">
            <span className="text sm:text-xl font-bold text-gray-700">
              Phone
            </span>{" "}
            : 8549065626
          </p>
          <p className="text sm:text-xl text-teal-900">
            <span className="text sm:text-xl font-bold text-gray-700">
              About Me
            </span>
            : Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            delectus, velit illo unde, hic voluptate nostrum non cumque vero in
            culpa commodi dolorem ullam corporis illum repellat enim assumenda
            vel exercitationem possimus magni voluptates, asperiores totam?
            Facilis asperiores nemo voluptatem modi expedita et vel voluptate
            nobis, autem corporis sed natus deleniti exercitationem iste dolorum
            officiis officia quae excepturi voluptatibus? Minus.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default about;
