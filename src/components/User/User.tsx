import { Avatar, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { FC } from "react";

import { FilteredUser } from "@/@types/v4Api";

import styles from "./User.module.scss";

type Props = {
  user: FilteredUser;
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
};

export const User: FC<Props> = ({ user, size }) => {
  return (
    <Link href={`/users/${user.id}`}>
      <Flex direction={"row"} align={"center"} gap={"2"}>
        <Avatar
          fallback={user.name.slice(0, 1)}
          size={size}
          src={user.avatarUrl || undefined}
        />
        <span className={styles.span}>{user.name}</span>
      </Flex>
    </Link>
  );
};
