import Link from "next/link";
import { useRouter } from "next/router";
import { MdHistory, MdHomeFilled } from "react-icons/md";

import { OverlaySidebar } from "@/components/App/Sidebar/OverlaySidebar";
import { useIsMobile } from "@/libraries/isMobile";

const Sidebar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const isDisabled = router.pathname.startsWith("/movies/") && !isMobile;

  const wrapperClassName = `relative z-[10001] ${isMobile ? "h-12" : ""}`;

  const containerClassName = isMobile
    ? [
        // mobile bottom bar
        "transition-all duration-500 ease-in-out",
        "fixed left-0 bottom-0 top-auto",
        "w-full h-12 min-h-0",
        "bg-[var(--color-secondary-background)]",
        "p-0",
        "flex flex-row",
      ].join(" ")
    : [
        // desktop sidebar
        "transition-all duration-500 ease-in-out",
        "w-[76px]",
        "bg-[var(--color-secondary-background)]",
        "py-3",
        "fixed left-0 top-14 bottom-0",
        "min-h-[calc(100vh-56px)]",
        isDisabled ? "left-[-76px]" : "left-0",
      ].join(" ");

  const buttonWrapperClassName = [
    "flex flex-col items-center",
    isMobile ? "flex-1 py-[6px]" : "py-[15px]",
    "text-[var(--color-text)]",
  ].join(" ");

  const iconClassName = "w-6 h-6 fill-[var(--color-text)]";
  const textClassName = "text-[10px]";

  const spacerClassName = [
    "transition-all duration-500 ease-in-out",
    isDisabled ? "w-0" : "w-[76px]",
  ].join(" ");

  return (
    <div className={wrapperClassName}>
      <div className={containerClassName}>
        <Link className={buttonWrapperClassName} href={"/"}>
          <MdHomeFilled className={iconClassName} />
          <span className={textClassName}>ホーム</span>
        </Link>
        <Link className={buttonWrapperClassName} href={"/history"}>
          <MdHistory className={iconClassName} />
          <span className={textClassName}>履歴</span>
        </Link>
      </div>
      <div className={spacerClassName}></div>
      <OverlaySidebar />
    </div>
  );
};

export { Sidebar };
