import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box
} from "@mui/material";

const URLCard = ({ original, shortUrl, expiresAt }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            Original URL:
          </Typography>
          <Typography variant="body1" noWrap>
            {original}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            Shortened URL:
          </Typography>
          <Link href={shortUrl} target="_blank" rel="noopener" underline="hover">
            {shortUrl}
          </Link>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Expires At: {new Date(expiresAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default URLCard;
