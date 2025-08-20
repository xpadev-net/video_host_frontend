import { useRef, useState } from "react";

import { useIsomorphicEffect } from "@/libraries/IsomorphicEffect";

export const useWindowWidth = (containerRef: React.RefObject<HTMLElement>) => {
  const [containerWidth, setContainerWidth] = useState(1920);
  const observer = useRef<ResizeObserver>();
  const isomorphicEffect = useIsomorphicEffect();

  const handleResize = () => {
    const width = containerRef.current?.clientWidth || 1920;
    setContainerWidth(width);
  };

  isomorphicEffect(() => {
    if (!observer.current) observer.current = new ResizeObserver(handleResize);
    if (!containerRef.current) return;
    handleResize();
    observer.current?.observe(containerRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [containerRef.current]);

  return containerWidth;
};
