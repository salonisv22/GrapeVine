import { useState, useEffect } from "react";
import {
  Radio,
  Button,
  Typography,
  Stack,
  TextField,
  ButtonGroup,
  Divider,
} from "@mui/material";
import { addAlertMessage } from "../../redux/alertMessage";
import { useDispatch } from "react-redux";
import { usePostAnswerMutation } from "../../services/answerService";
import { useAnswerCommentMutation } from "../../services/commentService";
import Description from "./description";
import {useAnswerDownvoteMutation,useAnswerUpvoteMutation} from "../../services/voteServices"

const Answers = ({ questionID, answerCount, answers }) => {
  const [answer, setAnswer] = useState();
  const [isAnswerValid, setIsAnswerValid] = useState(true);
  const [answerHelperText, setAnswerHelperText] = useState(true);
  const [answerComment, answerCommentData] = useAnswerCommentMutation();
  const [postAnswer, postAnswerData] = usePostAnswerMutation();
  const [answerDownvote, answerDownvoteData] =useAnswerDownvoteMutation();
  const [answerUpvote, answerUpvoteData] = useAnswerUpvoteMutation();
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
  }, [postAnswerData, dispatch]);

  return (
    <div className="Answers">
      <Stack direction="row" justifyContent="space-between" marginTop={2}>
        <Typography variant="h6">{answerCount} Answers</Typography>
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
      <div style={{ padding: "0 2rem" }}>
        {answers &&
          answers.map((answer) => (
            <div id={answer.id}>
              <Description
                id={answer.id}
                type="answer"
                username={answer.username}
                upvotes={answer.upvotes}
                downvotes={answer.downvotes}
                description={answer.answer}
                onDownvoteSubmit={(id) =>
                  answerDownvote({
                    answer: id,
                  })
                }
                onUpvoteSubmit={(id) =>
                  answerUpvote({
                    answer: id,
                  })
                }
                comments={answer.comments}
                answered_at={answer.answered_at}
                onCommentSubmit={(id, comment) => {
                  answerComment({
                    answer: id,
                    comment: comment,
                  });
                }}
              />
              <Divider sx={{ my: "1.5rem" }} />
            </div>
          ))}
        <Stack
          sx={{
            my: "3rem",
          }}
          spacing={1}
        >
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
              setAnswerHelperText("Answer should contain only atleast 10 ");
            }}
          />

          <Button
            variant="contained"
            style={{ maxWidth: "200px" }}
            onClick={() => {
              let message = undefined;
              if (answer === undefined || answer === "") {
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
              } else {
                postAnswer({
                  answer: answer,
                  question: questionID,
                });
              }
            }}
          >
            Post your Answer
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Answers;
