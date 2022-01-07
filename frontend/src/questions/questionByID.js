import { Container, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useGetQuestionByIdQuery } from "../services/QuestionsService";

import Answers from "./components/answers";
import { useQuestionCommentMutation } from "../services/commentService";

import Description from "./components/description";

const Questions = () => {
  const [addQuestionComment, questionCommentData] =
    useQuestionCommentMutation();
  let { id } = useParams();

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

          <Description
            id={data.id}
            upvotes={data.upvotes}
            downvotes={data.downvotes}
            description={data.description}
            tags={data.tags}
            comments={data.comments}
            onCommentSubmit={(id, comment) => {
              addQuestionComment({
                question: id,
                comment: comment,
              });
            }}
          />
          <Answers
            questionID={data.id}
            answerCount={data.no_of_answers}
            answers={data.answers}
          />
        </Container>
      </div>
    </>
  );
};

export default Questions;
