import { ExitToAppSharp } from "@mui/icons-material";
import ButtonStyles from "@/styles/button.module.scss";
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
    <div className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}>
      <ExitToAppSharp className={ButtonStyles.button} onClick={logout} />
    </div>
  );
};

export { Logout };
