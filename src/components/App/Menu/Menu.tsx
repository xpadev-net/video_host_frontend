import { useSetAtom } from "jotai";
import Link from "next/link";
import { MdMenu, MdOndemandVideo } from "react-icons/md";

import { sidebarState } from "@/atoms/SidebarState";
import Styles from "@/components/App/Menu/Menu.module.scss";
import { useIsMobile } from "@/libraries/isMobile";
import ButtonStyles from "@/styles/button.module.scss";

const HeaderMenu = () => {
  const setIsSidebarActive = useSetAtom(sidebarState);
  const isMobile = useIsMobile();
  const toggleSidebar = () => {
    setIsSidebarActive((pv) => !pv);
  };
  return (
    <div className={Styles.wrapper}>
      {!isMobile && (
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={toggleSidebar}
        >
          <MdMenu />
        </div>
      )}
      <Link href={"/"} className={Styles.homeButton}>
        <div className={ButtonStyles.buttonWrapper}>
          <MdOndemandVideo />
        </div>
      </Link>
    </div>
  );
};

export { HeaderMenu };
