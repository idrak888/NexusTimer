import { useConfettiStore } from "@/store/ConfettiStore";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiDrop() {
  const { isVisible, setIsVisible } = useConfettiStore();
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    updateWindowSize();

    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          className="w-screen h-screen overflow-hidden"
          onConfettiComplete={() => setIsVisible(false)}
        />
      )}
    </>
  );
}
