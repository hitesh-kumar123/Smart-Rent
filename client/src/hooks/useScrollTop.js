import { useEffect } from "react";

// Custom hook to scroll to top when a component mounts
const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // Use 'auto' for immediate scroll without animation
    });
  }, []);
};

export default useScrollTop;
