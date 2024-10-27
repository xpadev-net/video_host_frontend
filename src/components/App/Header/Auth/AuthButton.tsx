import { useSetAtom } from "jotai";
import { MdLogout, MdPerson } from "react-icons/md";

import { AuthModalOpenAtom, AuthTokenAtom } from "@/atoms/Auth";
import { useSelf } from "@/hooks/useUser";
import { deleteAuth } from "@/service/deleteAuth";

import styles from "../Button.module.scss";

const AuthButton = () => {
  const user = useSelf();

  const setAuthModalOpen = useSetAtom(AuthModalOpenAtom);
  const setAuthToken = useSetAtom(AuthTokenAtom);

  if (user.data?.status === "ok" && user.data.data) {
    return (
      <button
        onClick={() => {
          void deleteAuth().then(() => {
            setAuthToken(null);
            location.reload();
          });
        }}
        className={`${styles.button}`}
      >
        <MdLogout className={styles.icon} />
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        setAuthModalOpen(true);
      }}
      className={`${styles.button} ${styles.textButton}`}
    >
      <MdPerson className={styles.icon} />
      Sign In
    </button>
  );
};

export { AuthButton };
