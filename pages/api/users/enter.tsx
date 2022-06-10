import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import twilio from "twilio";
import mailgun from "mailgun-js";

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_SID_B,
    //   to: process.env.TWILIO_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const mg = mailgun({
    //   apiKey: process.env.MAILGUN_APIKEY!,
    //   domain: process.env.MAILGUN_DOMAIN!,
    // });
    // const data = {
    //   from: "share@market.co",
    //   to: "ywguys@naver.com",
    //   subject: "Your Share Market Verification Email",
    //   template: `anyonecan`,
    //   "v:code": payload,
    //   "v:username": `토큰값을 입력하세요 ${payload}`,
    // };
    // mg.messages().send(data, function (error, body) {
    //   console.log(body);
    // });
  }
  return res.status(200).json({ ok: true });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
