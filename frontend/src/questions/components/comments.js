import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

const Comments = ({ comments }) => {
  return (
    <>
      <Stack  spacing={0.5}>
        <Divider />
        {comments.map((item) => {
          return (
            <>
              <Typography variant="caption">
                {item.comment} -<b>{item.username}</b>{" "}
                  {new Date(item.commented_at).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </Typography>
              <Divider variant="middle" />
            </>
          );
        })}
      </Stack>
    </>
  );
};

export default Comments;
