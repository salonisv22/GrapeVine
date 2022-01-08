import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import TagList from "./tagList";
import Comments from "./comments";

const Description = ({
  id,
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
      <Stack paddingTop={1} spacing={1}>
        <Typography variant="body1">{description}</Typography>
        <TagList tags={tags} />
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
