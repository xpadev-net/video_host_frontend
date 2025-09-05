import { useSetAtom } from "jotai";
import { Menu, Tv } from "lucide-react";
import Link from "next/link";
import { sidebarState } from "@/atoms/SidebarState";
import { Button } from "@/components/ui/button";
import { SiteName } from "@/contexts/env";
import { useIsMobile } from "@/libraries/isMobile";

const HeaderMenu = () => {
  const setIsSidebarActive = useSetAtom(sidebarState);
  const isMobile = useIsMobile();
  const toggleSidebar = () => {
    setIsSidebarActive((pv) => !pv);
  };
  return (
    <div className={"flex flex-row gap-2"}>
      {!isMobile && (
        <Button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          type="button"
          variant={"ghost"}
          className="w-10 h-10 p-0 cursor-pointer"
        >
          <Menu />
        </Button>
      )}
      <Button
        variant={"ghost"}
        className="cursor-pointer text-left h-10"
        asChild
      >
        <Link href={"/"}>
          <Tv />
          {SiteName}
        </Link>
      </Button>
    </div>
  );
};

export { HeaderMenu };
