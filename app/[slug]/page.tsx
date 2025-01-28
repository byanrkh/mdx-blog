import { getAllPosts, getPostBySlug, mdxOptions } from "@/libs/getPost";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function page({ params }: Props) {
  if (!params || !(await params).slug) {
    notFound();
  }
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <>
      <header>
        <Link className="hover:underline" href={"/"}>
          &#8592; back
        </Link>
        <h1 className="text-4xl font-black">{post.title}</h1>
      </header>
      <div className="flex justify-between items-center mt-5">
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
        <ul className="text-xs flex gap-2">
          <li>{post.date}</li>·<li>{post.readTime} min read</li>
        </ul>
      </div>
      <hr className="my-20 border-t border-t-black" />
      <article className="prose">
        <MDXRemote source={post.content} options={mdxOptions} />
      </article>
    </>
  );
}
