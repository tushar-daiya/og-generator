"use client";
import React, { useRef } from "react";
import { toast } from "sonner";

export default function CreateBlogForm() {
  const formRef = useRef();
  const handleFormSubmit = async (formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const author = formData.get("author");
    let image = formData.get("image");
    if (image && image.size == 0) {
      image = null;
    }
    console.log(image);
    if (image && image.size > 1024 * 1024) {
      throw new Error("Image size should be less than 1MB");
    }
    if (image && image.type !== "image/png") {
      throw new Error("Image should be png");
    }
    if (!title) {
      throw new Error("Title is required");
    }
    if (!description) {
      throw new Error("Description is required");
    }
    if (!author) {
      throw new Error("Author is required");
    }
    if (description.length < 50) {
      throw new Error("Description should be at least 50 characters");
    }
    try {
      const blog = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/createblog`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (blog.status != 200) {
        throw new Error("Something went wrong");
      }
      formRef.current.reset();
      return {
        message: "Blog created successfully",
      };
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold">Create new Blog</h1>
      <p className="mt-2 text-gray-800">
        Create a new blog by filling out the form below
      </p>
      <form
        ref={formRef}
        action={async (e) => {
          toast.promise(handleFormSubmit(e), {
            loading: "Creating Blog...",
            success: "Blog created successfully",
            error: (e) => `Error: ${e.message}`,
            richColors: true,
          });
        }}
        className="mt-10 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            required
            rows={5}
            name="description"
            id="description"
            className="border-2 border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-medium">
            Blog Image <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="h-10 w-full rounded-md border-2 border-gray-300 items-center py-[5px] px-3  file:border-0 file:bg-transparent file:font-medium  "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author" className="font-medium">
            Author
          </label>
          <input
            required
            type="text"
            id="author"
            name="author"
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white font-bold rounded-md p-2 mt-5"
        >
          Create Blog
        </button>
      </form>
    </>
  );
}
