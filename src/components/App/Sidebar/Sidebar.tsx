import Link from "next/link";
import { useRouter } from "next/router";
import { MdHistory, MdHomeFilled } from "react-icons/md";

import { OverlaySidebar } from "@/components/App/Sidebar/OverlaySidebar";
import Styles from "@/components/App/Sidebar/Sidebar.module.scss";
import { useIsMobile } from "@/libraries/isMobile";

const Sidebar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div
      className={`${Styles.wrapper} ${isMobile && Styles.mobile} ${
        router.pathname.startsWith("/movies/") && Styles.disable
      }`}
    >
      <div className={Styles.container}>
        <Link className={Styles.buttonWrapper} href={"/"}>
          <MdHomeFilled className={Styles.icon} />
          <span className={Styles.text}>ホーム</span>
        </Link>
        <Link className={Styles.buttonWrapper} href={"/history"}>
          <MdHistory className={Styles.icon} />
          <span className={Styles.text}>履歴</span>
        </Link>
      </div>
      <div className={Styles.spacer}></div>
      <OverlaySidebar />
    </div>
  );
};

export { Sidebar };
