import Styles from "@/components/App/Menu/Menu.module.scss";
import ButtonStyles from "@/styles/button.module.scss";
import Link from "next/link";
import { Menu, OndemandVideoSharp } from "@mui/icons-material";
import { useAtom } from "jotai";
import { sidebarState } from "@/atoms/SidebarState";

const HeaderMenu = () => {
  const [isSidebarActive, setIsSidebarActive] = useAtom(sidebarState);
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  return (
    <div className={Styles.wrapper}>
      <div className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}>
        <Menu className={ButtonStyles.button} onClick={toggleSidebar} />
      </div>
      <Link href={"/"} className={Styles.homeButton}>
        <div className={ButtonStyles.buttonWrapper}>
          <OndemandVideoSharp className={ButtonStyles.button} />
        </div>
      </Link>
    </div>
  );
};

export { HeaderMenu };
