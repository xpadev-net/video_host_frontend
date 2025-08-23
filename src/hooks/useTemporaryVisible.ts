import { useCallback, useEffect, useState } from "react";

export const useTemporaryVisible = (duration: number = 1500) => {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const show = useCallback(() => {
    setCount((pv) => pv + 1);
  }, []);

  useEffect(() => {
    setVisible(true);
    console.debug(`Showing temporary element (count: ${count})`);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, count]);

  return { visible, show };
};
