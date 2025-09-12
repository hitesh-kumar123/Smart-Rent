import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Reset scroll position on page load
if (typeof window !== "undefined") {
  window.onload = () => {
    window.scrollTo(0, 0);
  };

  // Add event listener for all internal link clicks
  document.addEventListener("click", (e) => {
    // Check if the clicked element is a link or has a link parent
    const link = e.target.closest("a");
    if (
      link &&
      link.getAttribute("href") &&
      !link.getAttribute("href").startsWith("http")
    ) {
      // Force scroll to top on all internal link clicks
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
