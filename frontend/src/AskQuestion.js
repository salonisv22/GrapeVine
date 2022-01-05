import { Box, Container, TextField, Stack, Button } from "@mui/material";
import { useState,useEffect} from "react";
import { typography } from "@mui/system";
import { useAskQuestionMutation } from "./services/QuestionsService";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "./redux/alertMessage";

export default function AskQuestion() {

  const [askQuestion, askQuestionData] = useAskQuestionMutation();
  const [query, setQuery] = useState();
  const [query_title, setQuery_title] = useState();
  const [tags, setTags] = useState();

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [isTagsValid, setIsTagsValid] = useState(true);

    const [titleHelperText, setTitleHelperText] = useState();
    const [bodynameHelperText, setBodynameHelperText] = useState();
    const [tagsHelperText, setTagsHelperText] = useState();

   const dispatch = useDispatch();

  useEffect(() => {
    if (askQuestionData.isError) {
      const { query,query_title,tags} = askQuestionData.error.data;
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
  }, [askQuestionData,dispatch])
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
              fullWidth
              placeholder="define your title"
              id="fullWidth"
              size="small"
              value={query_title}
              onChange={(e) => {
                setQuery_title(e.target.value);
                if (!isTitleValid) {
                  const validTitle = String(e.target.value)
                    .match(/^[a-zA-Z0-9_]{10,}[a-zA-Z0-9_]*$/);
                  setIsTitleValid(validTitle);
                  setTitleHelperText(
                    "Title should contain only alphanumerics or undescore and have atleast 10 characters"
                  );
                }
              }}
              error={!isTitleValid}
              helperText={isTitleValid ? undefined : titleHelperText}
            />
          </Stack>

          <Stack>
            <typography>Body</typography>
            <Box sx={{ typography: "body2", fontWeight: "light" }}>
              Include all the information someone would need to answer your
              question
            </Box>
            <TextField
              fullWidth
              placeholder="define your title"
              id="fullWidth"
              multiline
              rows={6}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Stack>
          <Stack>
            <typography>Tags</typography>
            <Box sx={{ typography: "body2", fontWeight: "light" }}>
              Add up to 5 tags to describe what your question is about
            </Box>
            <TextField
              fullWidth
              placeholder="eg.(java,c++,dp,algo)"
              id="fullWidth"
              size="small"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              let message = undefined;
              let allRequiredSet = true;
              if (query === undefined || query_title === "") {
                setIsTitleValid(false);
                setTitleHelperText("This field is required");
                allRequiredSet = false;
              }
              if (!isTitleValid) {
                message = "Title is not valid";
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
                  query_title: query,
                  query: query,
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
