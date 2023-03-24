import Styles from "@/components/App/Header/Header.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";

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
      <div className={Styles.rightSideSpacer}></div>
    </header>
  );
};

export { Header };
