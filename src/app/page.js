import CreateBlogForm from "../components/CreateBlogForm";
import BlogList from "../components/BlogList";
export default function Home() {
  return (
    <div className="flex mx-10 h-screen">
      <div className="w-[48%] px-10 py-10 border-r border-gray-300 overflow-y-scroll">
        <BlogList />
      </div>
      <div className="w-[48%] px-10 max-w-xl mx-auto flex flex-col justify-center">
        <CreateBlogForm />
      </div>
    </div>
  );
}
