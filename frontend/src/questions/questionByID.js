import { Container, Divider} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "../redux/alertMessage";
import {Radio,Button, List,Typography, ListItem, ListItemText, IconButton, Stack,TextField, ButtonGroup } from "@mui/material";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import {  useGetQuestionByIdQuery } from "../services/QuestionsService";
import TagList from "./components/tagList";
import Comments from "./components/comments";
import { useQuesCommentMutation } from "../services/commentService";
import { usePostAnswerMutation } from "../services/answerService";

const Questions = () => {
  let { id } = useParams();
  const [quesComment, setQuesComment] = useState();
  const [answer, setAnswer] = useState();
  const [isAnswerValid, setIsAnswerValid] = useState(true);
  const [answerHelperText, setAnswerHelperText] = useState(true);
  const [addQuesComment, addQuesCommentData] = useQuesCommentMutation();
  const [postAnswer, postAnswerData] = usePostAnswerMutation();


  const dispatch = useDispatch();

  useEffect(() => {
   if (postAnswerData.isSuccess) {
     dispatch(
       addAlertMessage({
         severity: "success",
         message: "Answer Posted Successfully",
       })
     );
   }
  }, [postAnswerData,dispatch])

  const { data } = useGetQuestionByIdQuery(id);
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
                Asked by:<b>{data.username}</b>
              </div>
              <div>
                Last Active:<b>lastactive</b>
              </div>
            </Stack>
          </plaintext>
          <Divider />
          <Stack direction="row" spacing={3} marginTop={2}>
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
            <Stack paddingTop={1} spacing={1}>
              <Typography variant="body1">{data.description}</Typography>
              <TagList tags={data.tags} />
              <Comments comments={data.comments_on_question}></Comments>
              <form
                onSubmit={() => {
                  addQuesComment({
                    comment: quesComment,
                    question: data.id,
                  });
                }}
              >
                <TextField
                  label="Add a comment"
                  id="standard-size-small"
                  size="small"
                  variant="standard"
                  value={quesComment}
                  onChange={(e) => {
                    setQuesComment(e.target.value);
                  }}
                />
              </form>
<div className="Answers">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  marginTop={2}
                >
                  <Typography variant="h6">
                    {data.no_of_answers} Answers
                  </Typography>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined primary button group"
                    // style={{ fontSize: 16 }}
                  >
                    <Button size="small" control={<Radio />}>
                      Newest
                    </Button>
                    <Button size="small" control={<Radio />}>
                      Active
                    </Button>
                    <Button size="small" control={<Radio />}>
                      Votes
                    </Button>
                  </ButtonGroup>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="h5">Your Answer</Typography>
                  <TextField
                    required
                    fullWidth
                    placeholder="Explain your Answer here"
                    id="fullWidth"
                    multiline
                    rows={7}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      if (!isAnswerValid) {
                        const validBody = String(e.target.value).length > 20;
                        setIsAnswerValid(validBody);
                        setAnswerHelperText(
                          "Body should contain only atleast 20 and atmost 500 characters"
                        );
                      }
                    }}
                    value={answer}
                    error={!isAnswerValid}
                    helperText={isAnswerValid ? undefined : answerHelperText}
                    onBlur={() => {
                      const validBody = String(answer).length > 10;
                      setIsAnswerValid(validBody);
                      setAnswerHelperText(
                        "Answer should contain only atleast 10 "
                      );
                    }}
                  />

                  <Button
                      variant="contained"
                      style={{ maxWidth:'200px' }}
                      onClick={() => {
                      let message = undefined;
                      if (answer === undefined || answer=== "") {
                        setIsAnswerValid(false);
                        setAnswerHelperText("This field is required");
                      }
                     
                      if (!isAnswerValid) {
                        message = "Answer is not valid";
                      }

                      if (message !== undefined) {
                        dispatch(
                          addAlertMessage({
                            severity: "error",
                            message: message,
                          })
                        );
                      }
                      else {
                        postAnswer({
                          solution: answer,
                          question:data.id
                        });
                      }
                    }}
                  >
                    Post your Answer
                  </Button>
                </Stack>
              </div>
            </Stack>
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default Questions;
