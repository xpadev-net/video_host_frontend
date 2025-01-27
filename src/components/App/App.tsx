import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Header } from "@/components/App/Header";
import { Sidebar } from "@/components/App/Sidebar";
import { Auth } from "@/components/Auth";
import { useIsMobile } from "@/libraries/isMobile";

import Styles from "./App.module.scss";

type props = {
  children: ReactElement;
};

const App = ({ children }: props) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (router.pathname === "/login") {
    return children;
  }

  return (
    <>
      <Header className={Styles.header} />
      <div className={`${Styles.main} ${isMobile && Styles.mobile}`}>
        <div className={Styles.sidebar}>
          <Sidebar />
        </div>
        <div className={Styles.container}>{children}</div>
      </div>
      <Auth />
    </>
  );
};

export { App };
