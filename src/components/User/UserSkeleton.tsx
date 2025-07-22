import { Flex, Skeleton } from "@radix-ui/themes";
import type { FC } from "react";

import styles from "./User.module.scss";

type Props = {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
};

export const UserSkeleton: FC<Props> = ({ size = "3" }) => {
  const avatarSize = {
    "1": "24px",
    "2": "28px",
    "3": "32px",
    "4": "40px",
    "5": "48px",
    "6": "56px",
    "7": "64px",
    "8": "80px",
  }[size];

  return (
    <Flex direction={"row"} align={"center"} gap={"2"}>
      <Skeleton
        width={avatarSize}
        height={avatarSize}
        style={{ borderRadius: "var(--radius-full)" }}
      />
      <Skeleton width="80px" height="20px" className={styles.span} />
    </Flex>
  );
};
