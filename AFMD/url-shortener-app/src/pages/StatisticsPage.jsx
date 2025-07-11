import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import StatCard from "../components/StatCard";
import { logEvent } from "../utils/loggerMiddleware";

const StatisticsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("shortenedLinks");
    if (stored) {
      setData(JSON.parse(stored));
    }

    logEvent({
      stack: "frontend",
      level: "info",
      pkg: "page",
      message: "StatisticsPage loaded and links retrieved"
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {data.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        data.map((item, idx) => (
          <StatCard
            key={idx}
            shortUrl={item.shortUrl}
            createdAt={item.createdAt}
            expiresAt={item.expiresAt}
            clickCount={item.clickDetails.length}
            clickDetails={item.clickDetails}
          />
        ))
      )}
    </Container>
  );
};

export default StatisticsPage;
