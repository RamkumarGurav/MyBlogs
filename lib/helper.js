
export async function getBlogs(blogId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs`);
  const blogs = await res.json();
  if (blogId) {
    return blogs.find((value) => value._id == blogId);
  }
  return blogs;
}

// export async function getBlog(blogId) {
//   const res = await fetch(`${baseURL}/${blogId}`);
//   const blog = await res.json();
//   return blog;
// }
