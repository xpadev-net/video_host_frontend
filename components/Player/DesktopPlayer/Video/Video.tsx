import { useAtomValue } from "jotai";
import { MovieItemAtom, NiconicommentsConfigAtom } from "@/atoms/Player";
import { useEffect, useRef } from "react";
import { request } from "@/libraries/request";
import { CommentResponse } from "@/@types/api";
import NiconiComments from "@xpadev-net/niconicomments";
import Styles from "@/components/Player/DesktopPlayer/Video/Video.module.scss";

const Video = () => {
  const data = useAtomValue(MovieItemAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const niconicommentsRef = useRef<NiconiComments>();
  const niconicommentsConfig = useAtomValue(NiconicommentsConfigAtom);

  const onPipPause = () => {
    void (async () => {
      if (videoRef.current?.paused) {
        await videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
      await pipVideoRef.current?.play();
    })();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!videoRef.current || !canvas || !pipVideoRef.current) return;
    if (!data) {
      videoRef.current.srcObject = null;
      return;
    }
    void (async () => {
      const res = await request<CommentResponse>(
        `/comments/${data.movie.url}/`
      );
      if (res.status !== "success") return;
      niconicommentsRef.current = new NiconiComments(
        canvas,
        res.comments,
        niconicommentsConfig
      );
    })();
  }, [videoRef.current, canvasRef.current, pipVideoRef.current, data?.source]);

  return (
    <div className={Styles.wrapper}>
      <canvas ref={canvasRef} className={Styles.canvas} />
      <video
        ref={videoRef}
        crossOrigin={"use-credentials"}
        className={Styles.video}
      />
      <video
        className={Styles.pipVideo}
        ref={pipVideoRef}
        autoPlay={true}
        muted={true}
        onPause={onPipPause}
      />
    </div>
  );
};

export { Video };
