// I decided to handle the logout request here, this will delete cookie set by api/login

import type { NextApiRequest, NextApiResponse } from 'next'
const cookie = require('cookie')

type Response = {
  success?: boolean;
  token?: object;
  message?: string;
  expiresIn?: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
}
