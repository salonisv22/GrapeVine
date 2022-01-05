import { questions } from "./ques";
import { Stack } from "@mui/material";
import { Container, Divider } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import { useGetQuestionByIdQuery } from "../services/QuestionsService";

import TagList from "./components/tagList";

const Questions = () => {

  const { data, error, isLoading } = useGetQuestionByIdQuery(
    "189a52a3-8d4f-4def-835f-5b4a353bc402"
  );
  console.log(data);
  const {
    tags,
    title,
    description,
    upvote_count,
    downvote_count,
    askedat,
    lastactive,
  } = questions[0];
  return (
    <>
      <div className="question_section">
        <Container fixed>
          <h1>{title}</h1>
          <plaintext sx={{ color: "text.secondary", fontFamily: "Roboto" }}>
            <Stack direction="row" spacing={2}>
              <div>Asked at: {askedat} </div>
              <div>Last Active: {lastactive}</div>
            </Stack>
          </plaintext>
          <Divider />
          <Stack direction="row" spacing={2}>
            <List className="QuestionInsight">
              <ListItem
                secondaryAction={
                  <IconButton edge="end">
                    <ArrowDropUpSharpIcon fontSize="large" />
                  </IconButton>
                }
                // disablePadding
              ></ListItem>
              <ListItem>
                <ListItemText
                  className="QuestionInsightText"
                  primary={upvote_count - downvote_count}
                />
              </ListItem>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <ArrowDropDownSharpIcon fontSize="large" />
                  </IconButton>
                }
              ></ListItem>
            </List>
            <div>
              <p>{description}</p>
              <TagList tags={tags} />
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default Questions;
