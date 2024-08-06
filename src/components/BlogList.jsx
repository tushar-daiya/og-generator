import Link from "next/link";
import React from "react";

async function getBlogs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      method: "GET",
      next: {
        tags: ["blogs"],
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <>
      <h1 className="text-4xl font-bold">Latest Blogs</h1>
      <p className="mt-2 text-gray-400">Here are some of the latest blogs</p>
      <div className="flex flex-col gap-4 mt-10">
        {blogs?.length === 0 && (
          <div className="text-center">
            <p className="text-gray-400">No blogs found</p>
          </div>
        )}
        {blogs?.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`}>
            <div className="bg-white rounded-lg p-4 border shadow-md">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600 mt-2 text-balance ">
                {blog?.description.slice(0, 200)}...
              </p>
              <p className="text-black mt-2 text-balance ">-{blog?.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}