import Styles from "@/components/App/Header/Search/Search.module.scss";
import { Search as SearchIcon } from "@mui/icons-material";
import { useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import { request } from "@/libraries/request";
import { SuggestResponse } from "@/@types/api";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { useForwardRef } from "@/libraries/useForwardRef";
import { useIsMobile } from "@/libraries/isMobile";

type props = {
  className?: string;
};

const Search_ = ({ className }: props, ref: ForwardedRef<HTMLInputElement>) => {
  const [input, setInput] = useState("");
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

  const { data: suggest } = useSWR<SuggestResponse>(
    `/suggest/${encodeURIComponent(input)}`,
    request
  );

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
