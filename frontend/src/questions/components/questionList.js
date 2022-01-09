import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
  Button,
  Fab,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
import { Stack, List, ListItem, ListItemText ,Typography} from "@mui/material";
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
          const {
            id,
            tags,
            title,
            description,
            upvotes,
            downvotes,
            no_of_answers,
          } = question;
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
                        primary={no_of_answers}
                        secondary="Answers"
                      />
                    </ListItem>
                  </List>
                  <div className="Question">
                    <Stack spacing={1}>
                      <Typography
                        variant="h6"
                        onClick={() => {
                          navigate(`${id}`);
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography className="RestrictText">
                        {description}
                      </Typography>
                      <Stack direction="row" spacing={0.5}>
                        <TagList tags={tags} />
                      </Stack>
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
