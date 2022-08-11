import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  title: string;
  data: string;
  category: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  console.log(posts);
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="mb-10 mt-5">Lastest Posts:</h1>
      <ul>
        {posts.map((post, idx) => (
          <div key={idx} className="mb-5">
            <span className="mb-2 block text-lg text-red-500">
              {post.title}
            </span>
            <div>
              <span>
                {post.data}/ {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
};

export default Blog;
