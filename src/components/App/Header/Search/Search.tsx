import Link from "next/link";
import { useRouter } from "next/router";
import {
  type ForwardedRef,
  forwardRef,
  type KeyboardEvent,
  useState,
} from "react";
import { MdSearch } from "react-icons/md";

import Styles from "@/components/App/Header/Search/Search.module.scss";
import { useSeriesSuggest } from "@/hooks/useSeriesSuggest";
import { useIsMobile } from "@/libraries/isMobile";
import { useForwardRef } from "@/libraries/useForwardRef";

type props = {
  className?: string;
};

const Search_ = ({ className }: props, ref: ForwardedRef<HTMLInputElement>) => {
  const [input, setInput] = useState("");
  const suggest = useSeriesSuggest({ query: input });
  const inputRef = useForwardRef<HTMLInputElement>(ref);
  const isMobile = useIsMobile();

  const router = useRouter();
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const key = e.keyCode || e.charCode || 0;
    if (!e.nativeEvent.isComposing && key === 13) {
      void router.push(`/search/${encodeURIComponent(input)}`);
      inputRef.current?.blur();
    }
  };
  const onSearchClick = () => {
    if (input && input.length > 1) {
      void router.push(`/search/${encodeURIComponent(input)}`);
    }
  };

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

        {suggest.data?.status === "ok" && suggest.data.data.length > 0 && (
          <label htmlFor={"headerSearchInput"} className={Styles.suggest}>
            {suggest.data.data.map((item) => {
              return (
                <Link
                  href={`/search/${encodeURIComponent(item.title)}`}
                  key={item.id}
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
        <MdSearch className={Styles.icon} />
      </button>
    </div>
  );
};

const Search = forwardRef(Search_);

export { Search };
