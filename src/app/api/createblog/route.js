import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import crypto from "crypto";
import { revalidateTag } from "next/cache";
export const runtime = "edge";
export async function POST(request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");
  let image = formData.get("image");
  if (image && image.size == 0) {
    image = null;
  }
  // const { title, description, author, image } = await request.json();
  if (!title) {
    return new Response("Title is required", { status: 400 });
  }
  if (!description) {
    return new Response("Description is required", { status: 400 });
  }
  if (!author) {
    return new Response("Author is required", { status: 400 });
  }
  try {
    const blog = {
      title,
      description,
      author,
      image: null,
    };
    const id = crypto.randomUUID();
    if (image) {
      const blob = await put(`blogs/${id}.png`, image, {
        access: "public",
      });
      blog.image = blob.url;
    }
    const ogRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/generate`,
      {
        method: "POST",
        body: JSON.stringify(blog),
      }
    );
    const ogUrl = await ogRes.text();
    blog.opengraph = ogUrl;
    await prisma.blog.create({
      data: blog,
    });
    revalidateTag("blogs");
    return new Response("Blog created successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
export async function GET(request) {
  return new Response("Hello world", { status: 200 });
}
