import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const productCount = await client.product.count();
    const products = await client.product.findMany({
      take: 20,
      skip: (req.query.page ? +req.query.page - 1 : 0) * 20,
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      products,
      pages: Math.ceil(productCount / 20),
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });

    res.status(200).end();
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
