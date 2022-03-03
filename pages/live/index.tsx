import type { NextPage } from "next";
import Layout from "../../components/layout";

const Live: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-4 divide-y-[1px] py-10">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div className="px-4  pt-4" key={i}>
            <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              Galaxy S50
            </h1>
          </div>
        ))}
        <button className="fixed bottom-20 right-5 cursor-pointer  rounded-full border-transparent bg-orange-400 p-4 text-white shadow-xl transition-colors hover:bg-orange-500">
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
        </button>
      </div>
    </Layout>
  );
};

export default Live;
