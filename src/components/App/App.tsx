import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import { Header } from "@/components/App/Header";
import { Sidebar } from "@/components/App/Sidebar";
import { useIsMobile } from "@/libraries/isMobile";

type props = {
  children: ReactElement;
};

const App = ({ children }: props) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (pathname === "/login" || pathname === "/register") {
    return children;
  }

  return (
    <>
      <Header className="fixed top-0 left-0 h-14 w-screen bg-[var(--color-secondary-background)] z-[10000]" />
      <div
        className={`flex pt-14 w-screen h-full overflow-y-scroll ${isMobile ? "flex-col-reverse" : ""}`}
      >
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </>
  );
};

export { App };
