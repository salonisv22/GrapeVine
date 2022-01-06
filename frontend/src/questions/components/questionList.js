import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
  Button,
  Fab,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
import { Stack, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import TagList from "./tagList";

const QuestionList = ({ questions }) => {
  const navigate = useNavigate();
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
        {questions?.map((question) => {
          const { id, tags, query_title, query, upvotes, downvotes } = question;
          return (
            <>
              <Container className="QuestionList">
                <Stack direction="row" spacing={3}>
                  <List className="QuestionInsight">
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={upvotes + downvotes}
                        secondary="Votes"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={upvotes + downvotes}
                        secondary="Answers"
                      />
                    </ListItem>
                  </List>
                  <div className="Question">
                    <h3
                      onClick={() => {
                        navigate(`${id}`);
                      }}
                    >
                      {query_title}
                    </h3>
                    <typography className="RestrictText">{query}</typography>
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

export default QuestionList;