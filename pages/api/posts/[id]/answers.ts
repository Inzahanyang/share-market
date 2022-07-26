import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const post = await client.post.findUnique({
    where: { id: +id.toString() },
    select: {
      id: true,
    },
  });

  if (!post) res.status(404).json({ ok: false, error: "Post not found" });

  const newAnswer = await client.answer.create({
    data: {
      user: { connect: { id: user?.id } },
      post: { connect: { id: +id.toString() } },
      answer,
    },
  });

  console.log(newAnswer);

  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
