import { CircularProgress, Container } from "@mui/material";

import { typedSx } from "@App/theme/sxTheme";

const LoadingSpinner = () => {
  return (
    <Container sx={styles.wrapper}>
      <CircularProgress />
    </Container>
  );
};

export default LoadingSpinner;

const styles = typedSx({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
