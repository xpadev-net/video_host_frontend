import { ExitToApp } from "@mui/icons-material";
import Styles from "@/styles/button.module.scss";
import { request } from "@/libraries/request";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const logout = () => {
    void (async () => {
      await request("/logout/");
      await router.push("/login");
    })();
  };
  return (
    <div className={`${Styles.buttonWrapper} ${Styles.hover}`}>
      <ExitToApp className={Styles.button} onClick={logout} />
    </div>
  );
};

export { Logout };
