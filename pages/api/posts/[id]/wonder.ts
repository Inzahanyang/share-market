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
  } = req;

  const post = await client.post.findUnique({
    where: { id: +id.toString() },
    select: {
      id: true,
    },
  });

  if (!post) res.status(404).json({ ok: false, error: "Post not found" });

  const alreadyExists = await client.wondering.findFirst({
    where: { userId: user?.id, postId: +id.toString() },
    select: { id: true },
  });

  if (alreadyExists) {
    await client.wondering.delete({
      where: { id: alreadyExists.id },
    });
  } else {
    await client.wondering.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id: +id.toString() } },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
