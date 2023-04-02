import { useRouter } from "next/router";
import { History, Home } from "@mui/icons-material";
import Styles from "@/components/App/Sidebar/Sidebar.module.scss";
import Link from "next/link";
import { OverlaySidebar } from "@/components/App/Sidebar/OverlaySidebar";
import { useIsMobile } from "@/libraries/isMobile";

const Sidebar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div
      className={`${Styles.wrapper} ${isMobile && Styles.mobile} ${
        router.pathname.startsWith("/movie/") && Styles.disable
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
