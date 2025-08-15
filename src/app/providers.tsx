"use client";

import { useAtomValue } from "jotai";
import type { ReactNode } from "react";

import { AuthTokenAtom } from "@/atoms/Auth";
import { Theme } from "@/components/Theme";
import { useIsomorphicEffect } from "@/libraries/IsomorphicEffect";
import { requests } from "@/libraries/requests";

export function Providers({ children }: { children: ReactNode }) {
  const token = useAtomValue(AuthTokenAtom);
  const isomorphicEffect = useIsomorphicEffect();

  isomorphicEffect(() => {
    if (token) {
      requests.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return <Theme>{children}</Theme>;
}
