import { notFound } from "next/navigation";
import React from "react";
import fs from "fs";
import { blogs } from "@/data/blogs";
import Image from "next/image";
export async function generateMetadata({ params }) {
  const blog = blogs.find((blog) => blog.id == params.blogId);
  if (!blog) return notFound();
  if (!fs.existsSync(`./public/opengraph/${blog.id}.png`)) {
    await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify(blog),
      cache: "no-store",
    });
  }
  return {
    title: blog.title,
    description: blog.desc,
    openGraph: {
      title: blog.title,
      description: blog.desc,
      images: [
        {
          url: `/opengraph/${blog.id}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
export default function page({params}) {
    const blog = blogs.find((blog) => blog.id == params.blogId);
    if (!blog) return notFound();
    return (
      <div className="mx-auto max-w-7xl py-10">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="my-5 text-xl font-bold">By: {blog.author}</p>
        <Image src={`/opengraph/${blog.id}.png`} alt={blog.title} width={1200} height={630} />
        <p className="text-center mt-5">Open Graph Image</p>
        <p className="mt-10 text-xl">{blog.desc}</p>
      </div>
    );
}
