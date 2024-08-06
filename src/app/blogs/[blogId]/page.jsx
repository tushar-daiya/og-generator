import React from "react";
import Image from "next/image";

async function getBlog({ id }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/?id=${id}`,
      {
        method: "GET",
        next: {
          revalidate: 10,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlog({ id: params.blogId });
  if (!blog) return { title: 'Blog not found' };
  
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.opengraph,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const blog = await getBlog({ id: params.blogId });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl py-10">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="my-5 text-xl font-bold">By: {blog.author}</p>
      <Image src={blog.opengraph} alt={blog.title} width={1200} height={630} />
      <p className="text-center mt-5">Open Graph Image</p>
      <p className="mt-10 text-xl">{blog.description}</p>
    </div>
  );
}