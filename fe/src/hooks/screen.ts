import { useCallback, useEffect, useState } from "react";

type ScreenSize = {
  width: number,
  height: number
};

function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ width: window.innerWidth, height: window.innerHeight });
  const resizeHandler = useCallback(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight })
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
        window.removeEventListener("resize", resizeHandler);
    };
  })

  return screenSize;
}

export default useScreenSize;