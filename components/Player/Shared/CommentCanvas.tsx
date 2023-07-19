import NiconiComments from "@xpadev-net/niconicomments";
import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";

import { CommentResponse } from "@/@types/api";
import { NiconicommentsConfigAtom, PlayerConfigAtom } from "@/atoms/Player";
import { request } from "@/libraries/request";

type props = {
  url?: string;
  videoRef?: HTMLVideoElement | null;
  pipVideoRef?: HTMLVideoElement | null;
  className?: string;
};

const CommentCanvas = ({ url, videoRef, pipVideoRef, className }: props) => {
  const playerConfig = useAtomValue(PlayerConfigAtom);
  const niconicommentsConfig = useAtomValue(NiconicommentsConfigAtom);
  const niconicommentsRef = useRef<NiconiComments | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const commentSmoothingRef = useRef({ offset: 0, timestamp: 0 });

  useEffect(() => {
    const onVideoPlay = () => {
      commentSmoothingRef.current = {
        offset: videoRef?.currentTime || 0,
        timestamp: performance.now(),
      };
    };
    const onTimeUpdate = () => {
      commentSmoothingRef.current = {
        offset: videoRef?.currentTime || 0,
        timestamp: performance.now(),
      };
    };
    videoRef?.addEventListener("play", onVideoPlay);
    videoRef?.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      videoRef?.removeEventListener("play", onVideoPlay);
      videoRef?.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [videoRef]);

  useEffect(() => {
    void (async () => {
      if (!canvasRef.current || !url) return;
      niconicommentsRef.current = undefined;
      const res = await request<CommentResponse>(`/comments/${url}/`);
      if (res.status !== "success") return;
      const video = playerConfig.isPipEnable
        ? videoRef || undefined
        : undefined;
      niconicommentsRef.current = new NiconiComments(
        canvasRef.current,
        [
          {
            comments: res.data.comments,
            id: "0",
            fork: "main",
            commentCount: 0,
          },
        ],
        { ...niconicommentsConfig, video }
      );
    })();
    return () => {
      niconicommentsRef.current = undefined;
    };
  }, [url]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const vposMs = videoRef?.paused
        ? Math.floor(videoRef.currentTime * 1000)
        : (performance.now() - commentSmoothingRef.current.timestamp) *
            playerConfig.playbackRate +
          commentSmoothingRef.current.offset * 1000;
      niconicommentsRef.current?.drawCanvas(Math.floor(vposMs / 10));
    }, 1);
    return () => {
      window.clearInterval(interval);
    };
  }, [niconicommentsRef.current, videoRef?.paused, playerConfig.playbackRate]);

  useEffect(() => {
    if (!niconicommentsRef.current || !canvasRef.current || !pipVideoRef)
      return;
    niconicommentsRef.current.video = playerConfig.isPipEnable
      ? videoRef || undefined
      : undefined;
    pipVideoRef.srcObject = canvasRef.current.captureStream(60);
  }, [
    playerConfig.isPipEnable,
    niconicommentsRef.current,
    videoRef,
    pipVideoRef,
  ]);

  return (
    <canvas ref={canvasRef} className={className} width={1920} height={1080} />
  );
};

export { CommentCanvas };
