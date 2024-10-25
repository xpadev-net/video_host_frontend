import { useAtom } from "jotai";
import Link from "next/link";

import { sidebarState } from "@/atoms/SidebarState";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import Styles from "@/components/App/Sidebar/OverlaySidebar.module.scss";
import { History, Home } from "@/components/icons";

const OverlaySidebar = () => {
  const [isActive, setIsActive] = useAtom(sidebarState);

  return (
    <div className={`${isActive || Styles.disable}`}>
      <div className={Styles.overlay}>
        <div className={Styles.headerMenuWrapper}>
          <HeaderMenu />
        </div>
        <Link className={Styles.overlayItem} href={"/"}>
          <Home />
          <span className={Styles.text}>ホーム</span>
        </Link>
        <Link className={Styles.overlayItem} href={"/history"}>
          <History />
          <span className={Styles.text}>履歴</span>
        </Link>
      </div>
      <div
        className={Styles.background}
        onClick={() => setIsActive(false)}
      ></div>
    </div>
  );
};

export { OverlaySidebar };
