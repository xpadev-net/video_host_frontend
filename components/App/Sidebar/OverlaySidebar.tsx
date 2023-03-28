import { useAtom } from "jotai";
import { sidebarState } from "@/atoms/SidebarState";
import Styles from "@/components/App/Sidebar/OverlaySidebar.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import Link from "next/link";
import { History, Home } from "@mui/icons-material";

const OverlaySidebar = () => {
  const [isActive, setIsActive] = useAtom(sidebarState);

  return (
    <div className={`${isActive || Styles.disable}`}>
      <div className={Styles.overlay}>
        <div className={Styles.headerMenuWrapper}>
          <HeaderMenu />
        </div>
        <Link className={Styles.overlayItem} href={"/"}>
          <Home className={Styles.icon} />
          <span className={Styles.text}>ホーム</span>
        </Link>
        <Link className={Styles.overlayItem} href={"/history"}>
          <History className={Styles.icon} />
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
