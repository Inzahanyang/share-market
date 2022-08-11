import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  console.log(posts);
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="mt-5 mb-10 text-center text-xl font-semibold">
        Lastest Posts:
      </h1>
      <ul>
        {posts.map((post, idx) => (
          <div key={idx} className="mb-5">
            <Link href={`/blog/${post.slug}`}>
              <a>
                <span className="mb-2 block text-lg text-red-500">
                  {post.title}
                </span>
                <div>
                  <span>
                    {post.date}/ {post.category}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts.reverse(),
    },
  };
};

export default Blog;
