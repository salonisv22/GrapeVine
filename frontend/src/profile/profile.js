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
  styled,
  Stack,
} from "@mui/material";
import { useSelfQuery } from "../services/authenticationApi";
import QuestionList from "../questions/components/questionList";
import { Box, Divider } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useUserQuestionQuery } from "../services/QuestionsService";

const StyledTabPanel = styled(TabPanel)({
  width: "100%",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 100,
  width: 100,
  lineHeight: "60px",
}));
const summary = (
  <>
    {/* <Typography variant="h4">Stats</Typography>
    <Divider /> */}
    {/* <Box
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
    > */}
    <Stack direction="row" spacing={3}>
      <StyledPaper elevation={4}>Hello Charlie</StyledPaper>
      <StyledPaper elevation={4}>Hello Charlie</StyledPaper>
      <StyledPaper elevation={4}>Hello Charlie</StyledPaper>
    </Stack>
    {/* </Box> */}
  </>
);

export default function MyProfile() {
  const [value, setValue] = useState("10");
  let { id } = useParams();
  const { data } = useUserQuestionQuery(id);
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
          <StyledTabPanel value="10">{summary}</StyledTabPanel>
          <StyledTabPanel value="11">
            <Typography
              sx={{ opacity: 0.8, padding: "5px" }}
              variant="subtitle2"
            >
              <div>These are the questions you have asked</div>
            </Typography>
            <QuestionList questions={data} />
          </StyledTabPanel>
          <StyledTabPanel value="12">My Answers</StyledTabPanel>
          <StyledTabPanel value="13">My Comments</StyledTabPanel>
          <StyledTabPanel value="14">My Upvotes</StyledTabPanel>
          <StyledTabPanel value="15">My Downvotes</StyledTabPanel>
        </TabContext>
      </Box>
    </>
  );
}
