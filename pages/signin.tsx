import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Auth, useAuth } from "@/state";

export default function Signin() {
  const [_, setAuth] = useAuth();
  const router = useRouter();

  const onSignin = async () => {
    const res = await fetch("/api/signin");
    if (res.status != 200) {
      return alert("Signin Error.");
    }
    setAuth((await res.json()) as Auth);
    await router.push("/");
  };

  return (
    <Layout>
      <input placeholder="email" />
      <input placeholder="password" />
      <button onClick={onSignin}>Signin</button>
    </Layout>
  );
}

// ただのコンポーネント
function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>Signin</h1>
      {children}
    </>
  );
}
