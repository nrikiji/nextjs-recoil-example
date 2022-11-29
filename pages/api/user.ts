import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = parse(req.headers.cookie);
    const auth = JSON.parse(cookies.auth);
    res.status(200).json(auth);
  } catch (e) {
    res.status(404).json({});
  }
}
