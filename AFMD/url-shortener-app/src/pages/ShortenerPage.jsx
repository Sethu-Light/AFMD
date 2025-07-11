import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import URLForm from "../components/URLForm";
import URLCard from "../components/URLCard";
import { logEvent } from "../utils/loggerMiddleware";

const ShortenerPage = () => {
  const [results, setResults] = useState([]);

  const handleShorten = async (urls) => {
    const created = [];

    for (let url of urls) {
      try {
        const shortCode = url.shortCode || generateRandomCode();
        const expiresAt = new Date(Date.now() + url.validity * 60 * 1000).toISOString();
        const shortUrl = `http://localhost:3000/${shortCode}`;

        created.push({
          original: url.longUrl,
          shortCode,
          shortUrl,
          expiresAt
        });

        await logEvent({
          stack: "frontend",
          level: "info",
          pkg: "component",
          message: `Shortened URL created with shortcode ${shortCode}`
        });
      } catch (err) {
        await logEvent({
          stack: "frontend",
          level: "error",
          pkg: "component",
          message: `Failed to shorten URL: ${err.message}`
        });
      }
    }

    setResults((prev) => [...prev, ...created]);
  };

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <URLForm onSubmit={handleShorten} />

      <Box mt={4}>
        {results.map((item, idx) => (
          <URLCard
            key={idx}
            original={item.original}
            shortUrl={item.shortUrl}
            expiresAt={item.expiresAt}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ShortenerPage;
