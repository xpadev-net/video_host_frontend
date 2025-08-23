import { useCallback, useState } from "react";

export const useTemporaryVisible = (duration: number = 1500) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { visible, show };
};
