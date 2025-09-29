import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const winScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
      setIsVisible(winScroll > 100); // Show after scrolling 100px
    };

    // Initial calculation
    calculateProgress();

    // Add scroll event listener
    window.addEventListener("scroll", calculateProgress);

    // Cleanup
    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-primary-500"
        style={{ width: `${progress}%`, transition: "width 0.1s ease-out" }}
      />
    </div>
  );
};

export default ScrollProgress;
