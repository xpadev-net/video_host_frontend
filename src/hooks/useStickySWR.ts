import { useRef } from "react";
import useSWR, { type SWRConfiguration } from "swr";

const useStickyResult = <T>(value: T | null): T | null => {
  const val = useRef<T | null>(null);
  if (value !== null) val.current = value;
  return val.current;
};

export const useStickySWR = <T, U, V extends SWRConfiguration>(
  ...args: Parameters<typeof useSWR<T, U, V>>
): ReturnType<typeof useSWR<T, U, V>> => {
  const swr = useSWR<T, U, V>(...args);
  return {
    ...swr,
    data: useStickyResult(swr.data) as T,
  };
};
