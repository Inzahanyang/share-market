import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;

  const exists = await client.token.findUnique({
    where: { payload: token },
    // include: { user: true },
  });

  if (!exists) res.status(400).end();
  req.session.user = {
    id: exists?.userId,
  };

  await req.session.save();

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "sharemarket",
  password:
    "jnwefonwefoiwef3f2hj03hf03f0h3f0h30fh320fh302fh309fh039hf039hjoeiwdsncvdson",
});
