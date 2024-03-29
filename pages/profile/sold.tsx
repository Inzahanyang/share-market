import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack seoTitle="판매내역">
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
