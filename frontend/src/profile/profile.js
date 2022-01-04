import React, { useState } from "react";
import List from "@mui/material/List";
import { ListItem, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Person, Email } from "@material-ui/icons";
import { Avatar, Stack, Tab, Tabs } from "@mui/material";
import { Box, Card, Grid, Divider } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AccountCircleOutlined,
  SettingsOutlined,
  NotificationsActiveOutlined,
} from "@material-ui/icons";
export default function MyProfile() {
  const [value, setValue] = useState("9");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          fontWeight: 10,
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="saloni" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Email />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="salonisv22@gmail.com" />
        </ListItem>
      </List>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 200,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Item One" value="01" />
          <Tab label="Item Two" value="02" />
          <Tab label="Item Three" value="03" />
        </Tabs>
        <TabPanel value="01" index={0}>
          Item One sdfghjkjhgfdsfghjhgfdfghj hgfghj
        </TabPanel>
        <TabPanel value="02" index={1}>
          Item Two
        </TabPanel>
        <TabPanel value="03" index={2}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}
