import { Search as SearchIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";

import { SuggestRes, SuggestResponse } from "@/@types/api";
import Styles from "@/components/App/Header/Search/Search.module.scss";
import { useIsMobile } from "@/libraries/isMobile";
import { request } from "@/libraries/request";
import { useForwardRef } from "@/libraries/useForwardRef";

type props = {
  className?: string;
};

const Search_ = ({ className }: props, ref: ForwardedRef<HTMLInputElement>) => {
  const [input, setInput] = useState("");
  const [suggest, setSuggest] = useState<SuggestRes | undefined>();
  const inputRef = useForwardRef<HTMLInputElement>(ref);
  const isMobile = useIsMobile();

  const router = useRouter();
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const key = e.keyCode || e.charCode || 0;
    if (!e.nativeEvent.isComposing && key === 13) {
      void router.push(`/search/` + encodeURIComponent(input));
      inputRef.current?.blur();
    }
  };
  const onSearchClick = () => {
    if (input && input.length > 1) {
      void router.push(`/search/` + encodeURIComponent(input));
    }
  };

  useEffect(() => {
    void (async () => {
      if (input.length < 2) return;
      const suggest: SuggestResponse = await request(
        `/suggest/${encodeURIComponent(input)}`,
      );
      if (suggest.status === "fail") {
        await router.push(
          `/login?callback=${encodeURIComponent(router.asPath)}`,
        );
        return;
      }
      setSuggest(suggest);
    })();
  }, [input]);

  return (
    <div
      className={`${isMobile && Styles.mobile} ${Styles.wrapper} ${className}`}
    >
      <div className={Styles.inputWrapper}>
        <input
          type="text"
          ref={inputRef}
          className={Styles.input}
          placeholder={"検索"}
          onKeyDown={onKeyDown}
          value={input}
          id={"headerSearchInput"}
          onChange={(e) => setInput(e.target.value)}
        />

        {suggest?.status === "success" && suggest.data.length > 0 && (
          <label htmlFor={"headerSearchInput"} className={Styles.suggest}>
            {suggest.data.map((item) => {
              return (
                <Link
                  href={`/search/${encodeURIComponent(item.title)}`}
                  key={item.title}
                  className={Styles.suggestItem}
                >
                  <div>{item.title}</div>
                </Link>
              );
            })}
          </label>
        )}
      </div>
      <button className={Styles.button} onClick={onSearchClick}>
        <SearchIcon className={Styles.icon} />
      </button>
    </div>
  );
};

const Search = forwardRef(Search_);

export { Search };
