import { useIsMobile } from "@/libraries/isMobile";
import { MobileHeader } from "@/components/App/Header/MobileHeader";
import { DesktopHeader } from "@/components/App/Header/DesktopHeader";

type props = {
  className?: string;
};

const Header = ({ className }: props) => {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileHeader className={className} />;
  return <DesktopHeader className={className} />;
};

export { Header };
