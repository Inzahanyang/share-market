import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  // [...Array.from(Array(500).keys())].forEach(async (item) => {
  //   await client.stream.create({
  //     data: {
  //       name: String(item),
  //       description: String(item),
  //       price: item,
  //       user: {
  //         connect: {
  //           id: 15,
  //         },
  //       },
  //     },
  //   });
  //   console.log(`${item}/500`);
  // });
  // [...Array.from(Array(100).keys())].forEach(async (item) => {
  //   await client.product.create({
  //     data: {
  //       name: String(item),
  //       price: item,
  //       description: String(item),
  //       image: String(item),
  //       user: {
  //         connect: {
  //           id: 15,
  //         },
  //       },
  //     },
  //   });
  //   console.log(`${item}/500`);
  // });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
