import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsMobile(
      /android|ipod|ipad|iphone|macintosh/.test(ua) && "ontouchend" in document,
    );
  }, []);
  return isMobile;
};

export { useIsMobile };
