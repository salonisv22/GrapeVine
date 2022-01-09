import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
} from "@material-ui/core";
import Time from "../../utilities/time";
import { Stack, List, ListItem, ListItemText, Typography } from "@mui/material";

const AnswerList = ({ answers }) => {

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Divider/>         
              {answers?.map((item) => {
          return (
            <>
              <Container className="QuestionList">
                <Stack direction="row" spacing={3}>
                  <List className="QuestionInsight">
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={item.upvotes + item.downvotes}
                        secondary="Votes"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={item.upvotes}
                        secondary="UpVotes"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        className="QuestionInsightText"
                        edge="end"
                        primary={item.downvotes}
                        secondary="DownVotes"
                      />
                    </ListItem>
                  </List>
                  <div className="Question">
                    <Stack spacing={1}>
                      <Typography
                        variant="h5"
                        onClick={() => {
                          navigate(`/question/${item.question}`);
                        }}
                      >
                        <u>See Question</u>
                      </Typography>
                      <Typography >
                        {item.answer}
                      </Typography>
                      <Typography variant="caption">
                        Answered at:
                        <Time date={item.answered_at} />
                      </Typography>
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

export default AnswerList;
