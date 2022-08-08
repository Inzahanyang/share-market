import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import { Product } from "@prisma/client";
import Skeleton from "react-loading-skeleton";
import { useInfiniteScroll } from "@libs/client/utils";
import { useEffect } from "react";

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}
interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (pageIndex === 0) return `/api/products?page=1`;

  if (pageIndex + 1 > previousPageData.pages) return null;

  return `/api/products?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey, fetcher);
  const products = data ? data.map((item) => item.products).flat() : [];
  const page = useInfiniteScroll();

  console.log(products);

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="홈" hasTabBar seoTitle="상품 리스트">
      <div className="flex flex-col space-y-5 divide-y">
        {isLoading ? (
          <Skeleton count={5} />
        ) : (
          <div>
            {products?.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count.favs}
                image={product.image}
              />
            ))}
          </div>
        )}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
