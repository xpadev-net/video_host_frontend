import { useSetAtom } from "jotai";
import { MdPerson } from "react-icons/md";

import { AuthModalOpenAtom } from "@/atoms/Auth";
import { useSelf } from "@/hooks/useUser";

import styles from "../Button.module.scss";

const AuthButton = () => {
  const user = useSelf();

  const setAuthModalOpen = useSetAtom(AuthModalOpenAtom);

  if (user.data?.status === "ok" && user.data.data) {
    return (
      <div>
        <button>Logout</button>
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setAuthModalOpen(true);
      }}
      className={`${styles.button} ${styles.textButton}`}
    >
      <MdPerson />
      Sign In
    </button>
  );
};

export { AuthButton };
