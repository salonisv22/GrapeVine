import { Stack, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 400,
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: "#6b63ff1f",
  textAlign: "center",
  color: "#6C63FF",
}));
const TagList = ({ tags }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {tags.map((tag) => {
        return (
          <>
            <Item elevation={0} variant="outlined">
              {tag}
            </Item>
          </>
        );
      })}
    </Stack>
  );
};

export default TagList;
