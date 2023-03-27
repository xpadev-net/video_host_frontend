import Styles from "@/components/App/Header/Header.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import { Logout } from "@/components/App/Header/Logout/Logout";
import { Search } from "@/components/App/Header/Search/Search";

type props = {
  className?: string;
};

const Header = ({ className }: props) => {
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

export { Header };
