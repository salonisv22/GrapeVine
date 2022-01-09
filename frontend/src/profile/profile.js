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
import QuestionList from "../questions/components/questionList";
import { Box, Divider } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useUserQuestionQuery } from "../services/QuestionsService";
import { useUserAnswerQuery } from "../services/answerService"
import AnswerList from "../questions/components/myAnswers";

const StyledTabPanel = styled(TabPanel)({
  width: "100%",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  height: 100,
  width: 100,
  lineHeight: "60px",
}));
const summary = (
  <>
    <Stack
      direction="row"
      spacing={5}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <StyledPaper elevation={6}>
        <Typography variant="body1" marginTop={2}>
          Questions
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={6}>
        <Typography variant="body1" marginTop={2}>
          Answers
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={6}>
        <Typography variant="body1" marginTop={2}>
          Comments
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={6}>
        <Typography variant="body1" marginTop={2}>
          Upvotes
        </Typography>
      </StyledPaper>
      <StyledPaper elevation={6}>
        <Typography variant="body1" marginTop={2}>
          Downvotes
        </Typography>
      </StyledPaper>
    </Stack>
    {/* </Box> */}
  </>
);

export default function MyProfile({ id }) {
  const [value, setValue] = useState("10");
  const { data } = useUserQuestionQuery(id);
  const { data:answerdata } = useUserAnswerQuery(id);
  console.log(answerdata);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          lexWrap: "wrap",
          bgcolor: "background.paper",
          display: "flex",
          minHeight: "300px",
          width: "100%",
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
          <StyledTabPanel value="12">
            <Typography
              sx={{ opacity: 0.8, padding: "5px" }}
              variant="h6"
            >
              <div>These are the answers you have answered</div>
            </Typography>
            <AnswerList answers={answerdata} />
          </StyledTabPanel>
          <StyledTabPanel value="13">My Comments</StyledTabPanel>
          <StyledTabPanel value="14">My Upvotes</StyledTabPanel>
          <StyledTabPanel value="15">My Downvotes</StyledTabPanel>
        </TabContext>
      </Box>
    </>
  );
}
