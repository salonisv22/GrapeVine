import * as React from "react";
import { Avatar, Stack, Tab, List } from "@mui/material";
import { Box, Card, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AccountCircleOutlined,
  SettingsOutlined,
  NotificationsActiveOutlined,
} from "@material-ui/icons";
import MyProfile from "./profile";
import Notification from "./notification";
import Setting from "./setting";

import { ListItem, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Cake, Email, AccessTime } from "@material-ui/icons";

const Profile = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" my={2}>
              <Avatar
                sx={{ backgroundColor: "#3f51b5", width: 120, height: 120 }}
                alt="Cindy Baker"
                variant="square"
              >
                {" "}
                <h2>S</h2>
              </Avatar>
              <Stack direction="column" spacing={1}>
                <div>
                  <Typography variant="h4">Saloni</Typography>
                  <Typography sx={{ opacity: 0.8 }} variant="subtitle2">
                    Student
                  </Typography>
                </div>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    opacity: 0.6,
                  }}
                >
                  <Stack alignContent={"center"} direction="row" spacing={1}>
                    <Email />
                    <div>salonisv22@gmail.com</div>
                  </Stack>
                  <Stack alignContent={"center"} direction="row" spacing={1}>
                    <Cake />
                    <div>Member from 1 december, 2020</div>
                  </Stack>
                  <Stack alignContent={"center"} direction="row" spacing={1}>
                    <AccessTime />
                    <div>Last Active 5 december, 2020</div>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box display="inline-block">
            <Card variant="outlined">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ width: "90vw", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          icon={<AccountCircleOutlined />}
                          label="Profile"
                          value="1"
                        />
                        <Tab
                          icon={<NotificationsActiveOutlined />}
                          label="Notifications"
                          value="2"
                        />
                        <Tab
                          icon={<SettingsOutlined />}
                          label="Settings"
                          value="3"
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <MyProfile />
                    </TabPanel>
                    <TabPanel value="2">
                      <Notification />
                    </TabPanel>
                    <TabPanel value="3">
                      <Setting />
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
