import { useAtomValue } from "jotai";
import { MovieItemAtom } from "@/atoms/Player";
import { useEffect, useRef } from "react";
import { request } from "@/libraries/request";
import { CommentResponse } from "@/@types/api";

const Video = () => {
  const data = useAtomValue(MovieItemAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

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
    if (!videoRef.current || !canvasRef.current || !pipVideoRef.current) return;
    if (!data) {
      videoRef.current.srcObject = null;
      return;
    }
    void (async () => {
      const res = await request<CommentResponse>(
        `/comments/${data.movie.url}/`
      );
      if (res.status !== "success") return;
    })();
  }, [videoRef.current, canvasRef.current, pipVideoRef.current, data?.source]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <video ref={videoRef} crossOrigin={"use-credentials"} />
      <video
        ref={pipVideoRef}
        autoPlay={true}
        muted={true}
        onPause={onPipPause}
      />
    </div>
  );
};

export { Video };
