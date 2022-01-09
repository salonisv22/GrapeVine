import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Divider, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useGetQuestionByIdQuery } from "../services/QuestionsService";
import { useQuestionCommentMutation } from "../services/commentService";
import { addAlertMessage } from "../redux/alertMessage";
import { Share } from "@material-ui/icons";
import Time from "../utilities/time";
import Answers from "./components/answers";
import Description from "./components/description";

const Questions = () => {
  const dispatch = useDispatch();
  const [addQuestionComment, questionCommentData] =
    useQuestionCommentMutation();
  let { id } = useParams();

  const { data } = useGetQuestionByIdQuery(id);

  useEffect(() => {
    const scrollToHashElement = () => {
      const { hash } = window.location;
      const elementToScroll = document.getElementById(hash?.replace("#", ""));

      if (!elementToScroll) return;

      window.scrollTo({
        top: elementToScroll.offsetTop,
        behavior: "smooth",
      });
    };

    scrollToHashElement();
    window.addEventListener("hashchange", scrollToHashElement);
    return window.removeEventListener("hashchange", scrollToHashElement);
  }, [data]);

  return !data ? (
    <div>Loading.....</div>
  ) : (
    <>
      <div className="question_section">
        <Container fixed>
          <h1>{data.title}</h1>
          <Typography sx={{ color: "text.secondary", fontFamily: "Roboto" }}>
            <Stack style={{ width: "100%" }} direction="row" spacing={2}>
              <div>
                Asked at:
                <b>
                  <Time date={data.questioned_at} />
                </b>
              </div>
              <div>
                Asked by:<b>{data.username}</b>
              </div>
              <div>
                Last Active:<b>lastactive</b>
              </div>
              <Share
                style={{
                  cursor: "pointer",
                  marginLeft: "auto",
                  marginRight: "2rem",
                }}
                onClick={() => {
                  dispatch(
                    addAlertMessage({
                      severity: "success",
                      message: "Link copied to clipboard",
                    })
                  );
                  navigator.clipboard.writeText(
                    window.location.origin + window.location.pathname
                  );
                }}
              />
            </Stack>
          </Typography>
          <Divider />

          <Description
            id={data.id}
            type="question"
            upvotes={data.upvotes}
            downvotes={data.downvotes}
            description={data.description}
            tags={data.tags}
            comments={data.comments}
            username={data.username}
            onCommentSubmit={(id, comment) => {
              addQuestionComment({
                question: id,
                comment: comment,
              });
            }}
          />
          <Divider style={{ margin: "1.5rem 0" }} />
          {/* <Divider sx={{ my: "15rem" }} /> */}
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
