import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../utils/loggerMiddleware";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shortenedLinks");
    const list = stored ? JSON.parse(stored) : [];

    const match = list.find((item) => item.shortCode === shortcode);

    if (match) {
      const now = new Date();
      const expiry = new Date(match.expiresAt);

      if (now > expiry) {
        logEvent({
          stack: "frontend",
          level: "warn",
          pkg: "page",
          message: `Shortcode ${shortcode} expired`
        });

        alert("This short link has expired.");
        navigate("/");
        return;
      }

      match.clickDetails.push({
        timestamp: new Date().toISOString(),
        source: "shortUrl",
        location: "Unknown"
      });

      localStorage.setItem("shortenedLinks", JSON.stringify(list));

      logEvent({
        stack: "frontend",
        level: "info",
        pkg: "page",
        message: `Redirecting to ${match.original}`
      });

      window.location.href = match.original;
    } else {
      logEvent({
        stack: "frontend",
        level: "error",
        pkg: "page",
        message: `Shortcode ${shortcode} not found`
      });

      alert("Short URL not found.");
      navigate("/");
    }
  }, [shortcode, navigate]);

  return null;
};

export default RedirectHandler;
