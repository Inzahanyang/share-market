import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "../../components/floating-button";
import Layout from "../../components/layout";

const Live: NextPage = () => {
  return (
    <Layout hasTabBar title="라이브">
      <div className=" space-y-4 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link key={i} href={`/live/${i}`}>
            <a className="block px-4  pt-4">
              <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                Galaxy S50
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href={`/live/create`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;
