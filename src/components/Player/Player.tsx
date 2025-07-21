import type { FilteredMovie } from "@/@types/v4Api";
import { DesktopPlayer } from "@/components/Player/DesktopPlayer";
import { MobilePlayer } from "@/components/Player/MobilePlayer";
import { useIsMobile } from "@/libraries/isMobile";

type props = {
  data: FilteredMovie;
  className?: string;
};

const Player = ({ data, className }: props) => {
  const isMobile = useIsMobile();

  if (isMobile) return <MobilePlayer className={className} data={data} />;
  return <DesktopPlayer className={className} data={data} />;
};

export { Player };
