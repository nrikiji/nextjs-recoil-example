import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuth, useRequireSignin } from "@/state";

export default function Home() {
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  // ログインチェック
  useRequireSignin();

  const onChangeTheme = async () => {
    const newTheme = auth.theme == "dark" ? "light" : "dark";
    const res = await fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: newTheme }),
    });
    if (res.status != 200) {
      return alert("Change Theme Error.");
    }
    setAuth({ theme: newTheme });
  };

  const onSignout = async () => {
    const res = await fetch("/api/signout");
    if (res.status != 200) {
      return alert("Signout Error.");
    }
    setAuth(null);
    await router.push("/signin");
  };

  return (
    <Layout>
      {auth?.theme}
      <button onClick={onChangeTheme}>Change Theme</button>
      <button onClick={onSignout}>Signout</button>
    </Layout>
  );
}

// ただのコンポーネント
function Layout({ children }: { children: ReactNode }) {
  const [auth] = useAuth();

  return (
    <>
      <h1>Member({auth?.theme})</h1>
      {children}
    </>
  );
}

/*
// 普通のレイアウト
Home.getLayout = (page: ReactElement) => {
  return (
    <>
      <h1>Member</h1>
      {page}
    </>
  );
};
*/

/*
// パラメータを受け取るレイアウト
Home.getLayout = (props: { foo: string }): ((page: ReactElement) => ReactNode) => {
  return function getLayout(page) {
    return (
      <>
        <h1>Member</h1>
        {page}
      </>
    );
  };
};
*/
