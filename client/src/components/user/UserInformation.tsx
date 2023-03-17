import React, { useEffect, useState } from "react";
import { Users } from "../../../../types/type";
import axios from "axios";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function UserInformation() {
  const url = `http://localhost:8001/users/1`;

  const [user, setUser] = useState<Users[]>([]);

  function fetchData() {
    axios.get(url).then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(user, "user");
  return (
    <div>
      <Box style={{ marginTop: "10%", marginLeft: "40%" }}>
        {user.map((user) => {
          return (
            <Card key={user.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: "300px" }}
                image={user.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.maidenName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
