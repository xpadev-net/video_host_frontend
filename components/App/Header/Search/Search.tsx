import Styles from "@/components/App/Header/Search/Search.module.scss";
import { Search as SearchIcon } from "@mui/icons-material";
import { useRef, useState, KeyboardEvent } from "react";
import { request } from "@/libraries/request";
import { SuggestResponse } from "@/@types/api";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

const Search = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <div className={Styles.wrapper}>
      <div className={Styles.inputWrapper}>
        <input
          type="text"
          ref={inputRef}
          className={Styles.input}
          placeholder={"検索"}
          onKeyDown={onKeyUp}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {suggest?.status === "success" && suggest.data.length > 0 && (
          <div className={Styles.suggest}>
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
          </div>
        )}
      </div>
      <button className={Styles.button} onClick={onSearchClick}>
        <SearchIcon className={Styles.icon} />
      </button>
    </div>
  );
};

export { Search };
