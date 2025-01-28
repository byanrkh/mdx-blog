import { getAllPosts } from "@/libs/getPost";
import Link from "next/link";
import React from "react";

export default function page() {
  const generatePost = getAllPosts();
  return (
    <section>
      <h1 className="text-2xl font-black">Blogs</h1>
      <div className="grid grid-cols-1 gap-3 mt-5">
        {generatePost.map((post) => {
          return (
            <Link
              className="border rounded-md p-3 hover:scale-[1.01] duration-75 group"
              href={`/${post.slug}`}
              key={post.slug}
            >
              <h1 className="group-hover:underline">{post.title}</h1>
              <div className="flex justify-between items-center mt-2">
                <ul className="flex gap-1">
                  {post.tags.map((tags) => {
                    return (
                      <li
                        key={tags}
                        className="text-sm border border-gray-300 bg-gray-50 px-1 rounded text-gray-500"
                      >
                        # {tags}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-xs">{post.date}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
