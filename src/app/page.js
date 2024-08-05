import { blogs } from "@/data/blogs";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">Blogs</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {blogs.map((blog) => {
          return (
            <Link href={`/${blog.id}`} key={blog.id}>
              <div className="max-w-[300px] bg-slate-400 p-4 rounded-lg text-black">
                <h1>{blog.title}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
