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
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import TagList from "./tagList";
import Comments from "./comments";

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
}) => {
  return (
    <Stack direction="row" spacing={3} marginTop={2}>
      <List className="QuestionInsight">
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <ArrowDropUpSharpIcon fontSize="large" />
            </IconButton>
          }
        ></ListItem>
        <ListItem>
          <ListItemText
            className="QuestionInsightText"
            primary={upvotes - downvotes}
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
      <Stack
        style={{
          width: "100%",
        }}
        paddingTop={1}
        spacing={1}
      >
        <Typography variant="body1">{description}</Typography>
        <TagList tags={tags} />

        {/* USER CARD */}
        {username && (
          <Card className="userCard">
            <CardContentNoPadding>
              <Typography
                sx={{ fontSize: 10 }}
                color="text.primary"
                gutterBottom
              >
                {type === "question" ? "Asked by" : "Answered by"}
              </Typography>
              <Typography variant="h7" component="div">
                <Link href="#" underline="none">
                  {username}
                </Link>
              </Typography>
            </CardContentNoPadding>
          </Card>
        )}
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
