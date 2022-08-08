import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    let page =
      req.query.page && req.query.page !== "undefined"
        ? +req.query?.page?.toString()
        : 1;

    let skip: number = (page - 1) * 10;

    if (!skip) skip = 0;

    const rowCnt = await client.stream.count({ select: { _all: true } });

    const streams = await client.stream.findMany({
      take: 10,
      skip,
      orderBy: { createdAt: "asc" },
    });
    res.json({ ok: true, streams, rowCnt });
  }

  if (req.method === "POST") {
    const {
      session: { user },
      body: { name, price, description },
    } = req;

    const {
      result: {
        uid,
        rtmps: { url, streamKey },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        }
      )
    ).json();

    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareUrl: url,
        cloudflareKey: streamKey,
        name,
        price,
        description,
        user: { connect: { id: user?.id } },
      },
    });
    res.json({ ok: true, stream });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
