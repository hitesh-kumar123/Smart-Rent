import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop component that scrolls the window to the top on route change
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ensure DOM is fully loaded
    const scrollToTopHandler = () => {
      // First reset the scroll position using all available methods
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (document.querySelector("html")) {
        document.querySelector("html").scrollTop = 0;
      }

      if (document.querySelector("body")) {
        document.querySelector("body").scrollTop = 0;
      }
    };

    // Immediate scroll
    scrollToTopHandler();

    // Also attach to all link clicks in the footer for direct handling
    const footerLinks = document.querySelectorAll("footer a");
    footerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(scrollToTopHandler, 0);
      });
    });

    // Cleanup listeners
    return () => {
      footerLinks.forEach((link) => {
        link.removeEventListener("click", scrollToTopHandler);
      });
    };
  }, [pathname]);

  return null;
}
