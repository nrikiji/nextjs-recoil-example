import type { NextApiRequest, NextApiResponse } from "next";
import { clearCookie } from "@/utils/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  clearCookie(res);
  res.status(200).json({});
}
