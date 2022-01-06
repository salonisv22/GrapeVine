import React, { useState } from "react";
import List from "@mui/material/List";
import { ListItem, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Person, Email } from "@material-ui/icons";
import { Avatar, Tab } from "@mui/material";
import { Box, Divider } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Question from "./../questions/questionByID";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const summary = (
  <>
    <Typography variant="h4">Stats</Typography>
    <Paper sx={{ width: "100%" }}>
      <Typography sx={{ opacity: 0.8, padding: "5px" }} variant="subtitle2">
        <div>These are the statistics of your account</div>
      </Typography>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Questions</TableCell>
              <TableCell align="center">Answers</TableCell>
              <TableCell align="center">Upvotes</TableCell>
              <TableCell align="center">Downvotes</TableCell>
              <TableCell align="center">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">0</TableCell>
            <TableCell align="center">0</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
);
const question = (
  <>
    <Typography sx={{ opacity: 0.8, padding: "5px" }} variant="subtitle2">
      <div>These are the questions you have asked</div>
    </Typography>
    <Divider />
    <Question />
  </>
);
export default function MyProfile() {
  const [value, setValue] = useState("10");

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          minHeight: "300px",
        }}
      >
        <TabContext value={value}>
          <TabList
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Summary" value="10" />
            <Tab label="My Questions" value="11" />
            <Tab label="My Answers" value="12" />
            <Tab label="My Comments" value="13" />
            <Tab label="My Upvotes" value="14" />
            <Tab label="My Downvotes" value="15" />
          </TabList>
          <TabPanel value="10">{summary}</TabPanel>
          <TabPanel value="11">{question}</TabPanel>
          <TabPanel value="12">My Answers</TabPanel>
          <TabPanel value="13">My Comments</TabPanel>
          <TabPanel value="14">My Upvotes</TabPanel>
          <TabPanel value="15">My Downvotes</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
