import { Flex, Skeleton } from "@radix-ui/themes";
import type { FC } from "react";

import styles from "./User.module.scss";

type Props = {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
};

export const UserSkeleton: FC<Props> = ({ size = "3" }) => {
  const avatarSize = {
    "1": "24px",
    "2": "32px",
    "3": "40px",
    "4": "48px",
    "5": "64px",
    "6": "80px",
    "7": "96px",
    "8": "128px",
  }[size];

  return (
    <Flex direction={"row"} align={"center"} gap={"2"} className="w-full">
      <Skeleton
        width={avatarSize}
        height={avatarSize}
        style={{ borderRadius: "max(var(--radius-2), var(--radius-full))" }}
      />
      <Skeleton height="20px" className={`${styles.span} w-3/4`} />
    </Flex>
  );
};
