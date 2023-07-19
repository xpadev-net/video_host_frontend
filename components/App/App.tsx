import Styles from "./App.module.scss";
import { ReactElement } from "react";
import { Header } from "@/components/App/Header";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/App/Sidebar";
import { useIsMobile } from "@/libraries/isMobile";

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
    </>
  );
};

export { App };
