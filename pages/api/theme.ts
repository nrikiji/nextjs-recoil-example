import type { NextApiRequest, NextApiResponse } from "next";
import { Auth } from "@/state";
import { setCookie } from "@/utils/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCookie(res, { theme: req.body["theme"] } as Auth);
  res.status(200).json({});
}
