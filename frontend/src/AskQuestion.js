import { Box, Container, TextField, Stack, Button,Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAskQuestionMutation } from "./services/QuestionsService";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "./redux/alertMessage";

export default function AskQuestion() {
  const [askQuestion, askQuestionData] = useAskQuestionMutation();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [isTagsValid, setIsTagsValid] = useState(true);

  const [titleHelperText, setTitleHelperText] = useState();
  const [bodyHelperText, setBodyHelperText] = useState();
  const [tagsHelperText, setTagsHelperText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (askQuestionData.isError) {
      const { query, query_title, tags } = askQuestionData.error.data;
      const message = query || query_title || tags;
      if (askQuestionData.error.data)
        dispatch(
          addAlertMessage({
            severity: "error",
            message: message,
          })
        );
    } else if (askQuestionData.isSuccess) {
      dispatch(
        addAlertMessage({
          severity: "success",
          message: "Question Posted Successfully",
        })
      );
    }
  }, [askQuestionData, dispatch]);
  return (
    <Container>
      <h2>Ask a public question</h2>
      <Box
        sx={{
          width: 900,
          height: 500,
          backgroundColor: "#e6e6e6",
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack>
            <typography>Title</typography>
            <Box sx={{ typography: "body2", fontWeight: "light" }}>
              Be specific and imagine you’re asking a question to another person
            </Box>
            <TextField
              required
              fullWidth
              placeholder="define your title"
              id="fullWidth"
              size="small"
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isTitleValid) {
                  const validTitle = String(e.target.value).match(/^.{5,50}$/);
                  setIsTitleValid(validTitle);
                  setTitleHelperText(
                    "Title should contain only atleast 5 and atmost 50 characters"
                  );
                }
              }}
              value={title}
              error={!isTitleValid}
              helperText={isTitleValid ? undefined : titleHelperText}
              onBlur={() => {
                const validTitle = String(title).match(/^.{5,50}$/);
                setIsTitleValid(validTitle);
                setTitleHelperText(
                  "Title should contain only atleast 5 and atmost 50 characters"
                );
              }}
            />
          </Stack>

          <Stack>
            <Typography>Body</Typography>
            <Box sx={{ Typography: "body2", fontWeight: "light" }}>
              Include all the information someone would need to answer your
              question
            </Box>
            <TextField
              required
              fullWidth
              placeholder="Explain your Question here"
              id="fullWidth"
              multiline
              rows={6}
              onChange={(e) => {
                setDescription(e.target.value);
                if (!isBodyValid) {
                  const validBody = String(e.target.value).length>20;
                  setIsBodyValid(validBody);
                  setBodyHelperText(
                    "Body should contain only atleast 20 and atmost 500 characters"
                  );
                }
              }}
              value={description}
              error={!isBodyValid}
              helperText={isBodyValid ? undefined : bodyHelperText}
              onBlur={() => {
                const validBody = String(description).length>20;
                setIsBodyValid(validBody);
                setBodyHelperText(
                  "Body should contain only atleast 20 and atmost 500 characters"
                );
              }}
            />
          </Stack>
          <Stack>
            <typography>Tags</typography>
            <Box sx={{ typography: "body2", fontWeight: "light" }}>
              Add up to 5 tags to describe what your question is about
            </Box>
            <TextField
              required
              fullWidth
              placeholder="eg.(java,c++,dp,algo)"
              id="fullWidth"
              size="small"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              error={!isTagsValid}
              helperText={isTagsValid ? undefined : tagsHelperText}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              let message = undefined;
              let allRequiredSet = true;
              if (title === undefined || title === "") {
                setIsTitleValid(false);
                setTitleHelperText("This field is required");
                allRequiredSet = false;
              }
              if (description === undefined || description === "") {
                setIsBodyValid(false);
                setBodyHelperText("This field is required");
                allRequiredSet = false;
              }

              if (tags === undefined || tags === "") {
                setIsTagsValid(false);
                setTagsHelperText("This field is required");
                allRequiredSet = false;
              }
              if (!isTitleValid) {
                message = "Title is not valid";
              } else if (!isBodyValid) {
                message = "Body is not Valid";
              } else if (!isTagsValid) {
                message = "Tag is not Valid";
              }

              if (message !== undefined) {
                dispatch(
                  addAlertMessage({
                    severity: "error",
                    message: message,
                  })
                );
              } else if (allRequiredSet) {
                askQuestion({
                  title: title,
                  description: description,
                  tag_list: tags,
                });
              }
            }}
          >
            Post your Question
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
