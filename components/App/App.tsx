import Styles from "./App.module.scss";
import { ReactElement } from "react";
import { Header } from "@/components/App/Header/Header";
import { useRouter } from "next/router";

type props = {
  children: ReactElement;
};

const App = ({ children }: props) => {
  const router = useRouter();
  if (router.pathname === "/login") {
    return children;
  }

  return (
    <>
      <Header className={Styles.header} />
      <div className={Styles.main}>
        <div className={Styles.sidebar}>sidebar</div>
        <div className={Styles.container}>{children}</div>
      </div>
    </>
  );
};

export { App };
