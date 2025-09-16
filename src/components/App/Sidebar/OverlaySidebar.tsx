import { useAtom } from "jotai";
import Link from "next/link";
import { MdHistory, MdHomeFilled } from "react-icons/md";

import { sidebarState } from "@/atoms/SidebarState";
import { HeaderMenu } from "@/components/App/Menu/Menu";

const OverlaySidebar = () => {
  const [isActive, setIsActive] = useAtom(sidebarState);

  const handleBackgroundKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsActive(false);
    }
  };

  return (
    <div>
      <div
        className={[
          "fixed top-0 h-screen w-[240px] z-[101] transition-all px-4 flex flex-col bg-[var(--color-secondary-background)]",
          isActive ? "left-0" : "-left-[240px]",
        ].join(" ")}
      >
        <div className="py-2">
          <HeaderMenu />
        </div>
        <Link
          className="py-2 my-2 flex gap-2 items-center text-[var(--color-text)]"
          href={"/"}
        >
          <MdHomeFilled className="w-6 h-6" />
          <span className="leading-6 h-6">ホーム</span>
        </Link>
        <Link
          className="py-2 my-2 flex gap-2 items-center text-[var(--color-text)]"
          href={"/history"}
        >
          <MdHistory className="w-6 h-6" />
          <span className="leading-6 h-6">履歴</span>
        </Link>
      </div>
      {/* Background overlay that closes sidebar when clicked */}
      <button
        className={[
          "fixed inset-0 h-screen w-screen z-[100] bg-black/50 transition-opacity duration-200",
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setIsActive(false)}
        onKeyDown={handleBackgroundKeyDown}
        type="button"
        tabIndex={0}
        aria-label="Close sidebar"
      />
    </div>
  );
};

export { OverlaySidebar };
