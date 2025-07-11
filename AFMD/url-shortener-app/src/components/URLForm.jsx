import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography
} from "@mui/material";
import { isValidUrl, isValidShortcode } from "../utils/validators";
import { logEvent } from "../utils/loggerMiddleware";

const URLForm = ({ onSubmit }) => {
  const [urls, setUrls] = useState([{ longUrl: "", shortCode: "", validity: 30 }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", shortCode: "", validity: 30 }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = [];
    for (let i = 0; i < urls.length; i++) {
      const entry = urls[i];
      if (!isValidUrl(entry.longUrl)) {
        await logEvent({
          stack: "frontend",
          level: "error",
          pkg: "component",
          message: `Invalid URL at index ${i}`
        });
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }

      if (entry.shortCode && !isValidShortcode(entry.shortCode)) {
        await logEvent({
          stack: "frontend",
          level: "error",
          pkg: "component",
          message: `Invalid shortcode at index ${i}`
        });
        alert(`Invalid shortcode at row ${i + 1}`);
        return;
      }

      valid.push({
        longUrl: entry.longUrl,
        shortCode: entry.shortCode || "",
        validity: parseInt(entry.validity) || 30
      });
    }

    await onSubmit(valid);
    setUrls([{ longUrl: "", shortCode: "", validity: 30 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {urls.map((url, idx) => (
          <Grid item xs={12} key={idx}>
            <Typography variant="subtitle1">URL #{idx + 1}</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                label="Long URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
                required
              />
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={url.shortCode}
                onChange={(e) => handleChange(idx, "shortCode", e.target.value)}
              />
              <TextField
                label="Validity (minutes)"
                type="number"
                fullWidth
                value={url.validity}
                onChange={(e) => handleChange(idx, "validity", e.target.value)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        {urls.length < 5 && (
          <Button variant="outlined" onClick={handleAddField} sx={{ mr: 2 }}>
            + Add Another
          </Button>
        )}
        <Button variant="contained" type="submit">
          Shorten
        </Button>
      </Box>
    </form>
  );
};

export default URLForm;
