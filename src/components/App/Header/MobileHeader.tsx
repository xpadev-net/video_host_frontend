import { ArrowLeft, SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthButton } from "src/components/App/Header/Auth";
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
    <header
      className={`${className} px-4 flex flex-row items-center justify-between`}
    >
      <div className="w-[169px]">
        <HeaderMenu />
      </div>
      <div className="w-[225px] flex justify-end gap-1">
        <Button variant="ghost" size="icon" onClick={onSearchButtonClick}>
          <SearchIcon size={16} />
        </Button>
        <ToggleTheme />
        <AuthButton />
      </div>
      <div
        className={`absolute left-0 top-0 h-full w-full flex bg-[var(--color-background)] px-2 opacity-0 pointer-events-none z-[1] items-center ${
          isInputActive ? "opacity-100 pointer-events-auto" : ""
        }`}
      >
        <Button variant="ghost" onClick={closeSearch} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Search className="flex-1 my-1" ref={inputRef} />
      </div>
      {isInputActive && (
        <button
          className="fixed z-[-1] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)]"
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
