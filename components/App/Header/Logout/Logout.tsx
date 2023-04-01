import { ExitToAppSharp } from "@mui/icons-material";
import ButtonStyles from "@/styles/button.module.scss";
import { request } from "@/libraries/request";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const logout = () => {
    void (async () => {
      await request("/logout/");
      await router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
    })();
  };
  return (
    <div
      className={`${ButtonStyles.buttonWrapper} ${ButtonStyles.hover}`}
      onClick={logout}
    >
      <ExitToAppSharp className={ButtonStyles.button} />
    </div>
  );
};

export { Logout };
