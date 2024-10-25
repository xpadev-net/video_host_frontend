import { useRef } from "react";
import useSWR, {SWRConfiguration} from "swr";

const useStickyResult = <T>(value: T | undefined): T | undefined=> {
  const val = useRef<T>();
  if (value !== undefined) val.current = value;
  return val.current;
};

export const useStickySWR = <T,U,V extends SWRConfiguration>(...args: Parameters<typeof useSWR<T,U,V>>): ReturnType<typeof useSWR<T,U,V>> => {
  const swr = useSWR<T,U,V>(...args);
  return {
    ...swr,
    data: useStickyResult(swr.data) as T,
  };
};
