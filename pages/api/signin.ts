import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "@/utils/cookie";
import { Auth } from "@/state";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = { theme: "dark" } as Auth;
  setCookie(res, auth);
  res.status(200).json(auth);
}
