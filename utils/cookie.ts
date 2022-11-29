import { NextApiResponse } from "next";
import { serialize } from "cookie";
import { Auth } from "@/state";

export const setCookie = (res: NextApiResponse, auth: Auth) => {
  const opts = { path: "/", maxAge: 2592000, httpOnly: true, secure: false };
  res.setHeader("Set-Cookie", serialize("auth", JSON.stringify(auth), opts));
};

export const clearCookie = (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", serialize("auth", "", { maxAge: -1, path: "/" }));
};
