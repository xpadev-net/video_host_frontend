import Styles from "@/components/Player/DesktopPlayer/DesktopPlayer.module.scss";
import { Video } from "@/components/Player/DesktopPlayer/Video/Video";

const DesktopPlayer = () => {
  return (
    <div className={Styles.wrapper}>
      <Video />
    </div>
  );
};

export { DesktopPlayer };
