import { Menu, OndemandVideoSharp } from "@mui/icons-material";
import { useAtom } from "jotai";
import Link from "next/link";

import { sidebarState } from "@/atoms/SidebarState";
import Styles from "@/components/App/Menu/Menu.module.scss";
import { useIsMobile } from "@/libraries/isMobile";
import ButtonStyles from "@/styles/button.module.scss";

const HeaderMenu = () => {
  const [isSidebarActive, setIsSidebarActive] = useAtom(sidebarState);
  const isMobile = useIsMobile();
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  return (
    <div className={Styles.wrapper}>
      {!isMobile && (
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={toggleSidebar}
        >
          <Menu className={ButtonStyles.button} />
        </div>
      )}
      <Link href={"/"} className={Styles.homeButton}>
        <div className={ButtonStyles.buttonWrapper}>
          <OndemandVideoSharp className={ButtonStyles.button} />
        </div>
      </Link>
    </div>
  );
};

export { HeaderMenu };
