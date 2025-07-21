import type { Visibility } from "@/@types/v4Api";

export const visibility2str = (input: Visibility): string => {
  switch (input) {
    case "PRIVATE":
      return "非公開";
    case "PUBLIC":
      return "公開";
    case "UNLISTED":
      return "限定公開";
  }
};
