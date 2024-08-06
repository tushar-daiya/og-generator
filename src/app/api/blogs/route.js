import prisma from "@/lib/prisma";
export async function GET(req) {
  const id = await req.nextUrl.searchParams.get("id");
  try {
    if (id) {
      const blog = await prisma.blog.findUnique({
        where: {
          id: id,
        },
      });
      if (!blog) return new Response("Blog not found", { status: 404 });
      return new Response(JSON.stringify(blog), { status: 200 });
    }
    const blogs = await prisma.blog.findMany();
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
