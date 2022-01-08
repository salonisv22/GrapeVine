import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tab,
  TableRow,
  styled
} from "@mui/material";
import { useSelfQuery } from "../services/authenticationApi";
import QuestionList from "../questions/components/questionList";
import { Box, Divider } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useUserQuestionQuery } from "../services/QuestionsService";


const summary = (
  <>
    <Typography variant="h4">Stats</Typography>
    <Divider />
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: "10px",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={4} />
      <Paper elevation={4} />
      <Paper elevation={4} />
    </Box>
  </>
);

export default function MyProfile() {
  const [value, setValue] = useState("10");
  let { id } = useParams();
  const {data}= useUserQuestionQuery(id);
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
          <TabPanel value="11">
            <Typography
              sx={{ opacity: 0.8, padding: "5px" }}
              variant="subtitle2"
            >
              <div>These are the questions you have asked</div>
            </Typography>
            <QuestionList questions={data} />
          </TabPanel>
          <TabPanel value="12">My Answers</TabPanel>
          <TabPanel value="13">My Comments</TabPanel>
          <TabPanel value="14">My Upvotes</TabPanel>
          <TabPanel value="15">My Downvotes</TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
