import { Container, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, IconButton, Stack } from "@mui/material";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import { useGetQuestionByIdQuery } from "../services/QuestionsService";
import TagList from "./components/tagList";

const Questions = () => {
  let { id } = useParams();
  console.log(id);
  const { data } = useGetQuestionByIdQuery(id);
  console.log(data);
  // const { tags, title, description, upvotes, downvotes, questioned_at, user } =
  //   data;
  return !data ? (
    <div>Loading.....</div>
  ) : (
    <>
      <div className="question_section">
        <Container fixed>
          <h1>{data.title}</h1>
          <plaintext sx={{ color: "text.secondary", fontFamily: "Roboto" }}>
            <Stack direction="row" spacing={2}>
              <div>
                Asked at:
                <b>
                  {new Date(data.questioned_at).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </b>
              </div>
              <div>
                Asked by:<b>{data.user}</b>
              </div>
              <div>
                Last Active:<b>lastactive</b>
              </div>
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
                  primary={data.upvotes - data.downvotes}
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
              <p>{data.description}</p>
              <TagList tags={data.tags} />
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default Questions;
