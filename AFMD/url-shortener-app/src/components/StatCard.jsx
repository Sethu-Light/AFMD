import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

const StatCard = ({ shortUrl, createdAt, expiresAt, clickCount, clickDetails }) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">Short URL: 
          <Link href={shortUrl} target="_blank" underline="hover" ml={1}>
            {shortUrl}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Created At: {new Date(createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Expires At: {new Date(expiresAt).toLocaleString()}
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Total Clicks: {clickCount}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <List dense>
          {clickDetails.map((click, idx) => (
            <ListItem key={idx} alignItems="flex-start">
              <ListItemText
                primary={`Click ${idx + 1}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Time: {new Date(click.timestamp).toLocaleString()}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Source: {click.source}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Location: {click.location}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StatCard;
