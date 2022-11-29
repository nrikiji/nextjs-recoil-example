import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const initialState = {
  theme: "light",
} as Auth;

export interface Auth {
  theme: "light" | "dark";
}

export const authState = atom<Auth | null>({
  key: "authState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export function useAuth() {
  const [isInitial, setIsInitial] = useState(true);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => setIsInitial(false), []);

  return [isInitial ? initialState : auth, setAuth] as const;
}

export function useRequireSignin() {
  const router = useRouter();
  const [auth] = useRecoilState(authState);

  useEffect(() => {
    if (!auth) router.push("/signin");
  }, [auth]);
}
