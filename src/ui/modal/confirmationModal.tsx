import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";

import { typedSx } from "@App/theme/sxTheme";

type ConfirmationModalProps = {
  title: string;
  text: string;
  closeModal: (props?: { action: "SUBMIT" } | { action: "CLOSE" }) => void;
};

const ConfirmationModal = ({ text, closeModal, title }: ConfirmationModalProps) => {
  return (
    <Dialog open PaperProps={{ sx: styles.dialog }}>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.titleAndCloseButtonWrapper}>
          <DialogTitle sx={styles.title}>{title}</DialogTitle>
          <IconButton onClick={() => closeModal({ action: "CLOSE" })}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.content}>
          <Typography variant="body1">{text}</Typography>
        </Box>
        <DialogActions>
          <Button
            onClick={() => closeModal({ action: "SUBMIT" })}
            variant="contained"
            sx={{ ...styles.button, backgroundColor: (theme) => theme.palette.background.purple }}
          >
            Yes
          </Button>
          <Button
            onClick={() => closeModal({ action: "CLOSE" })}
            variant="contained"
            sx={{
              ...styles.button,
              color: (theme) => theme.palette.text.white,
              backgroundColor: (theme) => theme.palette.background.grey400,
            }}
          >
            No
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;

const styles = typedSx({
  dialog: {
    display: "flex",
    padding: 2,
    maxWidth: "500px",
  },
  dialogContent: {
    padding: 2,
    display: "grid",
    gap: 3,
  },
  titleAndCloseButtonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    border: "none",
    boxShadow: "none",
    "&:hover": {
      opacity: 0.9,
      boxShadow: "none",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 0,
    width: "90%",
  },
  title: {
    fontWeight: "600",
    padding: 0,
  },
});
