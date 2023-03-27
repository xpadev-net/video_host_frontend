import Styles from "@/components/App/Header/Search/Search.module.scss";
import { Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { request } from "@/libraries/request";
import { SuggestResponse } from "@/@types/api";
import { useRouter } from "next/router";
import Link from "next/link";

type SuggestState = {
  query: string;
  suggest: string[];
};

const Search = () => {
  const [input, setInput] = useState("");
  const [suggest, setSuggest] = useState<SuggestState | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (input === suggest?.query || input.length < 2) {
      return;
    }
    const search = async (query: string) => {
      const form = new FormData();
      form.append("query", query);
      const req = await request(`/suggest/`, {
        method: "POST",
        body: form,
      });
      const res = (await req.json()) as SuggestResponse;
      if (res.status === "fail") {
        await router.push("/login");
        return;
      }
      setSuggest({
        query,
        suggest: res.data.map((item) => item.title),
      });
    };
    void search(input);
  }, [input, router, suggest?.query]);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.inputWrapper}>
        <input
          type="text"
          className={Styles.input}
          placeholder={"検索"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {suggest && suggest.suggest.length > 0 && (
          <div className={Styles.suggest}>
            {suggest.suggest.map((title) => {
              return (
                <Link
                  href={`/search/${encodeURI(title)}`}
                  key={title}
                  className={Styles.suggestItem}
                >
                  <div>{title}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <button className={Styles.button}>
        <SearchIcon className={Styles.icon} />
      </button>
    </div>
  );
};

export { Search };
