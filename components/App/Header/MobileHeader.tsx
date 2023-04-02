import Styles from "@/components/App/Header/Header.module.scss";
import ButtonStyles from "@/styles/button.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import { Logout } from "@/components/App/Header/Logout/Logout";
import { Search } from "@/components/App/Header/Search/Search";
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type props = {
  className?: string;
};

const MobileHeader = ({ className }: props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsInputActive(false);
  }, [router.asPath]);

  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.rightSideWrapper}>
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={() => setIsInputActive(true)}
        >
          <SearchIcon className={ButtonStyles.button} />
        </div>
        <Logout />
      </div>
      {isInputActive && (
        <div className={Styles.inputWrapper}>
          <div
            className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
            onClick={() => setIsInputActive(false)}
          >
            <ArrowBack className={ButtonStyles.button} />
          </div>
          <Search className={Styles.input} />
        </div>
      )}
    </header>
  );
};

export { MobileHeader };
