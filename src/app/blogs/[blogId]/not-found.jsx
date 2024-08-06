import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <p className="font-bold text-center text-6xl">Not Found</p>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
}
