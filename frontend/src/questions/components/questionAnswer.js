// import { Stack,List,ListItem,ListItemText,Typography,IconButton } from "@mui/material";
// import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
// import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
// import TagList from "./tagList";
// import Comments from "./comments";

const QuestionAnswer = ({ data, addComment }) => {
  return (
    <h2></h2>
    //       <Stack direction="row" spacing={3} marginTop={2}>
    //         <List className="QuestionInsight">
    //           <ListItem
    //             secondaryAction={
    //               <IconButton edge="end">
    //                 <ArrowDropUpSharpIcon fontSize="large" />
    //               </IconButton>
    //             }
    //             // disablePadding
    //           ></ListItem>
    //           <ListItem>
    //             <ListItemText
    //               className="QuestionInsightText"
    //               primary={data.upvotes - data.downvotes}
    //             />
    //           </ListItem>
    //           <ListItem
    //             secondaryAction={
    //               <IconButton edge="end" aria-label="delete">
    //                 <ArrowDropDownSharpIcon fontSize="large" />
    //               </IconButton>
    //             }
    //           ></ListItem>
    //         </List>
    //         <Stack paddingTop={1} spacing={1}>
    //           <Typography variant="body1">{data.description}</Typography>
    //           <TagList tags={data.tags} />
    //           <Comments comments={data.comments_on_question}></Comments>
    //           <form
    //             onSubmit={() => {
    //               addQuesComment({
    //                 comment: quesComment,
    //                 question: data.id,
    //               });
    //             }}
    //           >
    //             <TextField
    //               label="Add a comment"
    //               id="standard-size-small"
    //               size="small"
    //               variant="standard"
    //               value={quesComment}
    //               onChange={(e) => {
    //                 setQuesComment(e.target.value);
    //               }}
    //             />
    //           </form>
    //         </Stack>
    //       </Stack>
  );
};

export default QuestionAnswer;
