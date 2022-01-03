import { Box, Container, TextField ,Stack,Button} from "@mui/material";
import { typography } from "@mui/system";

export default function AskQuestion() {
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
              rows={4}
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
            />
          </Stack>
          <Button variant="contained">Post your Question</Button>
        </Stack>
      </Box>
    </Container>
  );
}
