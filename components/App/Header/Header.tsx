import Styles from "@/components/App/Header/Header.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import { Logout } from "@/components/App/Header/Logout/Logout";

type props = {
  className?: string;
};

const Header = ({ className }: props) => {
  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.centerWrapper}></div>
      <div className={Styles.rightSideSpacer}>
        <Logout />
      </div>
    </header>
  );
};

export { Header };
