import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthButton } from "src/components/App/Header/Auth";

import Styles from "@/components/App/Header/Header.module.scss";
import { Search } from "@/components/App/Header/Search";
import { ToggleTheme } from "@/components/App/Header/Theme";
import { HeaderMenu } from "@/components/App/Menu";
import { ArrowBack, Search as SearchIcon } from "@/components/icons";
import ButtonStyles from "@/styles/button.module.scss";

type props = {
  className?: string;
};

const MobileHeader = ({ className }: props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const _router = useRouter();
  useEffect(() => {
    setIsInputActive(false);
  }, []);

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
          <SearchIcon />
        </div>
        <ToggleTheme />
        <AuthButton />
      </div>
      <div
        className={`${Styles.inputWrapper} ${isInputActive && Styles.active}`}
      >
        <div
          className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
          onClick={closeSearch}
        >
          <ArrowBack />
        </div>
        <Search className={Styles.input} ref={inputRef} />
        <div className={Styles.background} onClick={closeSearch} />
      </div>
    </header>
  );
};

export { MobileHeader };
