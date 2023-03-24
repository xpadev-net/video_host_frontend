import Styles from "@/components/App/Menu/Menu.module.scss";
import Link from "next/link";
import { Home, Menu } from "@mui/icons-material";
import { useAtom } from "jotai";
import { sidebarState } from "@/atoms/SidebarState";

const HeaderMenu = () => {
  const [isSidebarActive, setIsSidebarActive] = useAtom(sidebarState);
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  return (
    <>
      <div className={`${Styles.buttonWrapper} ${Styles.hover}`}>
        <Menu className={Styles.button} onClick={toggleSidebar} />
      </div>
      <Link href={"/"} className={Styles.homeButton}>
        <div className={Styles.buttonWrapper}>
          <Home className={Styles.button} />
        </div>
      </Link>
    </>
  );
};

export { HeaderMenu };
