import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { List, ListItem, ListItemText, Stack } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        grapevine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          position: "sticky",
          marginTop:3,
          marginBottom: 0,
          width:"100%",
          backgroundColor: "#3f51b5",
        }}
      >
        <Container>
          {/* <Typography variant="body1" color="white">
            My sticky footer can be found here.
          </Typography> */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={1}>
              <List>
                <ListItem>
                  <ListItemText primary="ABOUT"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="About"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="About"></ListItemText>
                </ListItem>
              </List>
            </Stack>
            <Stack spacing={1}>
              <List>
                <ListItem>
                  <ListItemText primary="ABOUT"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="About"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="About"></ListItemText>
                </ListItem>
              </List>
            </Stack>
            <Stack spacing={1}>
              <List>
                <ListItem>
                  <ListItemText primary="ABOUT"></ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="About"></ListItemText>
                </ListItem>
                <ListItem>
                  <Copyright />
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
