//this middleware function runs everytime route changes

import { NextResponse } from "next/server";
// import { useRouter } from "next/router";

export default function middleware(req) {
  // const router = useRouter();
  let verify = req.cookies.get("loggedIn");

  const clientURL =
    req.headers.origin ||
    req.headers.referer ||
    process.env.NEXT_PUBLIC_CLIENT_URL ||
    "";
  let url = req.url;
  if (!verify && url.includes("/account")) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
  if (!verify && url === `${clientURL}/my-posts`) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
  if (!verify && url === `${clientURL}/create-post`) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
  if (!verify && url.includes("/blogs/update")) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }

  if (!verify && url === `${clientURL}/update-password`) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
  if (!verify && url === `${clientURL}/update-profile`) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }

  if (!verify && url === `${clientURL}/dashboard`) {
    return NextResponse.redirect(`${clientURL}/signin`);
  }
}
