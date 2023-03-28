import { useRouter } from "next/router";
import { History, Home } from "@mui/icons-material";
import Styles from "@/components/App/Sidebar/Sidebar.module.scss";
import Link from "next/link";
import { OverlaySidebar } from "@/components/App/Sidebar/OverlaySidebar";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div
      className={`${Styles.wrapper} ${
        router.pathname.startsWith("/episode/") && Styles.disable
      }`}
    >
      <div className={Styles.container}>
        <Link className={Styles.buttonWrapper} href={"/"}>
          <Home className={Styles.icon} />
          <span className={Styles.text}>ホーム</span>
        </Link>
        <Link className={Styles.buttonWrapper} href={"/history"}>
          <History className={Styles.icon} />
          <span className={Styles.text}>履歴</span>
        </Link>
      </div>
      <div className={Styles.spacer}></div>
      <OverlaySidebar />
    </div>
  );
};

export { Sidebar };
