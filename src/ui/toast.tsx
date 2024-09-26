import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";

import { typedSx } from "@App/theme/sxTheme";

const CloseButton = ({ onClick }: { onClick: (e: React.MouseEvent<HTMLElement>) => void }) => (
  <Box onClick={onClick}>
    <CloseIcon sx={styles.closeIcon} />
  </Box>
);

const ThemedToastContainer = () => {
  return (
    <Box sx={styles.toast}>
      <ToastContainer
        autoClose={3000}
        closeButton={({ closeToast }) => <CloseButton onClick={closeToast} />}
        draggable={false}
        icon={false}
        limit={3}
        newestOnTop
        pauseOnHover
        position="bottom-center"
      />
    </Box>
  );
};

export default ThemedToastContainer;

const Wrapper = ({ children }: { children: ReactNode }) => <div>{children}</div>;

export const toastSuccess = (message: string) =>
  toast.success(
    <Wrapper>
      <Typography variant="subtitle2" sx={styles.text}>
        {message}
      </Typography>
    </Wrapper>,
    {
      toastId: message,
    },
  );

const styles = typedSx({
  text: {
    color: (theme) => theme.palette.text.white,
  },
  closeIcon: {
    color: (theme) => theme.palette.text.white,
  },
  toast: {
    ".Toastify__toast--success": {
      backgroundColor: (theme) => theme.palette.primary.main,
    },
    ".Toastify__progress-bar--success": {
      backgroundColor: (theme) => theme.palette.background.purple,
    },
  },
});
