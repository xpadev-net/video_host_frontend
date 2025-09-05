import { ArrowLeft, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthButton } from "src/components/App/Header/Auth";
import Styles from "@/components/App/Header/Header.module.scss";
import { Search } from "@/components/App/Header/Search";
import { ToggleTheme } from "@/components/App/Header/Theme";
import { HeaderMenu } from "@/components/App/Menu";
import { Button } from "@/components/ui/button";

type props = {
  className?: string;
};

const MobileHeader = ({ className }: props) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
        <Button variant="ghost" size="icon" onClick={onSearchButtonClick}>
          <SearchIcon size={16} />
        </Button>
        <ToggleTheme />
        <AuthButton />
      </div>
      <div
        className={`${Styles.inputWrapper} ${isInputActive && Styles.active}`}
      >
        <Button variant="ghost" onClick={closeSearch} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Search className={Styles.input} ref={inputRef} />
      </div>
      {isInputActive && (
        <button
          className={Styles.background}
          onClick={closeSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              closeSearch();
            }
          }}
          type="button"
          tabIndex={0}
        />
      )}
    </header>
  );
};

export { MobileHeader };
