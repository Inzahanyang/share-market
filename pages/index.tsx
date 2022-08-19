import type { NextPage } from "next";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWRInfinite from "swr/infinite";
import { Product } from "@prisma/client";
import Skeleton from "react-loading-skeleton";
import { useInfiniteScroll } from "@libs/client/utils";
import { useEffect } from "react";
import client from "@libs/server/client";
import { SWRConfig, unstable_serialize } from "swr";

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
  if (previousPageData && !previousPageData.products.length) return null;

  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {
  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);

  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="홈" hasTabBar seoTitle="상품 리스트">
      <div className="flex flex-col space-y-5 divide-y">
        {data ? (
          data.map((result) => {
            return result.products.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count?.favs}
                image={product.image}
              />
            ));
          })
        ) : (
          <Skeleton count={10} />
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

const Page: NextPage<ProductsResponse> = ({ products, pages }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(getKey)]: [
            {
              ok: true,
              products,
              pages,
            },
          ],
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
    take: 10,
    skip: 0,
  });

  const productCount = await client.product.count();

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    props: {
      ok: true,
      products: JSON.parse(JSON.stringify(products)),
      pages: Math.ceil(productCount / 10),
    },
  };
}

export default Page;
