import { AuthButton } from "src/components/App/Header/Auth";

import Styles from "@/components/App/Header/Header.module.scss";
import { Search } from "@/components/App/Header/Search";
import { ToggleTheme } from "@/components/App/Header/Theme";
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
        <ToggleTheme />
        <AuthButton />
      </div>
    </header>
  );
};

export { DesktopHeader };
