import Styles from "@/components/App/Header/Header.module.scss";
import ButtonStyles from "@/styles/button.module.scss";
import { HeaderMenu } from "@/components/App/Menu/Menu";
import { Logout } from "@/components/App/Header/Logout/Logout";
import { Search } from "@/components/App/Header/Search/Search";
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

type props = {
  className?: string;
};

const MobileHeader = ({ className }: props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    setIsInputActive(false);
  }, [router.asPath]);

  const onSearchButtonClick = () => {
    setIsInputActive(true);
    inputRef.current?.focus();
  };

  const closeSearch = () => setIsInputActive(false);

  return (
    <header className={`${className} ${Styles.container}`}>
      <div className={Styles.leftSideWrapper}>
        <HeaderMenu />
      </div>
      <div className={Styles.rightSideWrapper}>
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={onSearchButtonClick}
        >
          <SearchIcon className={ButtonStyles.button} />
        </div>
        <Logout />
      </div>
      <div
        className={`${Styles.inputWrapper} ${isInputActive && Styles.active}`}
      >
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={closeSearch}
        >
          <ArrowBack className={ButtonStyles.button} />
        </div>
        <Search className={Styles.input} ref={inputRef} />
        <div className={Styles.background} onClick={closeSearch} />
      </div>
    </header>
  );
};

export { MobileHeader };
