import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "../../redux/alertMessage";

import {
  ArrowDropUpSharp,
  ArrowDropDownSharp,
  Share,
} from "@material-ui/icons";
import TagList from "./tagList";
import Comments from "./comments";
import Time from "../../utilities/time";
  
  
const CardContentNoPadding = styled(CardContent)(`
  padding: 10px 16px;
  &:last-child {
    padding-bottom: 10px;
  }
`);

const Description = ({
  id,
  type,
  username,
  upvotes,
  downvotes,
  description,
  tags,
  comments,
  onCommentSubmit,
  onUpvoteSubmit,
  onDownvoteSubmit,
  answered_at,
}) => {
  const dispatch = useDispatch();
  return (
    <Stack direction="row" spacing={3} marginTop={2}>
      <List className="QuestionInsight">
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <ArrowDropUpSharp
                onClick={() => {
                  onUpvoteSubmit(id);
                }}
                fontSize="large"
              />
            </IconButton>
          }
        ></ListItem>
        <ListItem>
          <ListItemText
            className="QuestionInsightText"
            primary={upvotes-downvotes}
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <ArrowDropDownSharp
                onClick={() => {
                  onDownvoteSubmit(id);
                }}
                fontSize="large"
              />
            </IconButton>
          }
        ></ListItem>
      </List>
      <Stack
        style={{
          width: "100%",
        }}
        paddingTop={1}
        spacing={1}
      >
        <Stack
          style={{
            width: "100%",
          }}
          direction="row"
        >
          <div style={{ maxWidth: "80%" }}>
            <Typography sx={{ mr: "4rem" }} variant="body1">
              {description}
            </Typography>
            <TagList tags={tags} />
          </div>

          <div style={{ marginLeft: "auto" }}>
            {/* USER CARD */}
            {username && type === "answer" && (
              <Card className="userCard">
                <CardContentNoPadding>
                  <Typography
                    sx={{ fontSize: 11 }}
                    color="text.primary"
                    gutterBottom
                  >
                    {type === "question" ? (
                      "Asked by"
                    ) : (
                      <div>
                        Answered at <Time date={answered_at} />
                      </div>
                    )}
                  </Typography>
                  <Typography variant="h7" component="div">
                    <Stack
                      direction="row"
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Link href="#" underline="none">
                        {username}
                      </Link>
                      <Share
                        fontSize="small"
                        style={{
                          cursor: "pointer",
                          marginLeft: "auto",
                          marginRight: "4px",
                        }}
                        onClick={() => {
                          dispatch(
                            addAlertMessage({
                              severity: "success",
                              message: "Link copied to clipboard",
                            })
                          );
                          navigator.clipboard.writeText(
                            window.location.origin +
                              window.location.pathname +
                              "#" +
                              id
                          );
                        }}
                      />
                    </Stack>
                  </Typography>
                </CardContentNoPadding>
              </Card>
            )}
          </div>
        </Stack>

        <Comments
          id={id}
          onCommentSubmit={onCommentSubmit}
          comments={comments}
        />
      </Stack>
    </Stack>
  );
};

export default Description;
