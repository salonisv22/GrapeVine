import { questions } from "./ques";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Divider,
  Button,
  Fab,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import TagList from "./components/tagList";

const AllQuestions = () => {


  return (
    <>
      <Container>
        <h2>All Questions</h2>
        <Stack direction="row" justifyContent="space-between">
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            // style={{ fontSize: 16 }}
          >
            <Button size="small" control={<Radio />}>
              Newest
            </Button>
            <Button size="small" control={<Radio />}>
              Most Answered
            </Button>
            <Button size="small" control={<Radio />}>
              Active
            </Button>
            <Button size="small" control={<Radio />}>
              Votes
            </Button>
          </ButtonGroup>
          <Fab
            className="AskQuestion"
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            to="ask"
            component={RouterLink}
          >
            <AddIcon />
            Ask Question
          </Fab>
        </Stack>
        <br />
        <Divider />
        {questions.map((question) => {
          const { tags, title, description, upvote_count, downvote_count } =
            question;
          return (
            <>
              <Container className="QuestionList">
                <Stack direction="row" spacing={3}>
                  <List className="QuestionInsight">
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={upvote_count + downvote_count}
                        secondary="Votes"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={upvote_count + downvote_count}
                        secondary="Answers"
                      />
                    </ListItem>
                  </List>
                  <div className="Question">
                    <h3>{title}</h3>
                    <typography
                     className="RestrictText"
                    >
                      {description}
                    </typography>
                    <Stack direction="row" spacing={0.5}>
                      <TagList tags={tags} />
                    </Stack>
                  </div>
                </Stack>
                <Divider />
              </Container>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default AllQuestions;
