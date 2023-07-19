import Styles from "@/components/App/Header/Header.module.scss";
import { Logout } from "@/components/App/Header/Logout";
import { Search } from "@/components/App/Header/Search";
import { HeaderMenu } from "@/components/App/Menu";

type props = {
  className?: string;
};

const DesktopHeader = ({ className }: props) => {
  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.centerWrapper}>
        <Search />
      </div>
      <div className={Styles.rightSideWrapper}>
        <Logout />
      </div>
    </header>
  );
};

export { DesktopHeader };
