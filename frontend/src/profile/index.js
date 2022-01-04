import * as React from "react";
import { Avatar, Stack, Tab } from "@mui/material";
import { Box, Card, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AccountCircleOutlined,
  SettingsOutlined,
  NotificationsActiveOutlined,
} from "@material-ui/icons";
import MyProfile from "./profile";
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
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              my={2}
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Cindy Baker"
                src="/assets/avatar.svg"
              />{" "}
            </Stack>
          </Box>
          <Box display="inline-block">
            <Card variant="outlined">
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ width: "80vw", height: "70vh", typography: "body1" }}
                >
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
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
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
