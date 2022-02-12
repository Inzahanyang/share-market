import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <div className="grid grid-cols-10 gap-2">
        <div className=" aspect-square bg-sky-50 shadow-lg"></div>
        <div className=" aspect-square bg-sky-100 shadow-lg"></div>
        <div className=" aspect-square bg-sky-200 shadow-lg"></div>
        <div className=" aspect-square bg-sky-300 shadow-lg"></div>
        <div className=" aspect-square bg-sky-400 shadow-lg"></div>
        <div className=" aspect-square bg-sky-500 shadow-lg"></div>
        <div className=" aspect-square bg-sky-600 shadow-lg"></div>
        <div className=" aspect-square bg-sky-700 shadow-lg"></div>
        <div className=" aspect-square bg-sky-800 shadow-lg"></div>
        <div className=" aspect-square bg-sky-900 shadow-lg"></div>
      </div>

      <div className=" box-border flex h-screen items-center justify-center bg-red-600">
        <h1 className="rounded-full border-2 border-blue-400 p-20 text-center text-9xl text-white">
          it works?
        </h1>
        <p className=" ml-4 mr-4 text-5xl text-cyan-500  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          exercitationem itaque obcaecati quo soluta repellendus commodi, in
          libero dolorem neque molestiae quidem reiciendis nobis ut repudiandae
          hic consectetur tempora corrupti.
        </p>
      </div>
    </div>
  );
};

export default Home;
