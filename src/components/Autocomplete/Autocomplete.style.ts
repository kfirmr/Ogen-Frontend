import type { Theme } from "@mui/material";
import { createStyles } from "../../create-styles";

export const useStyles = () =>
  createStyles({
    textfield: ({ disabled = false, isAutocomplete = true }) => ({
      width: "100%",
      "& .MuiOutlinedInput-root": {
        borderRadius: "17px",
        paddingRight: "40px",
        backgroundColor: disabled ? "#f5f5f5" : "white",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiOutlinedInput-input": {
        fontWeight: 600,
        fontSize: "16px",
        ...(isAutocomplete === false && {
          caretColor: "transparent",
          cursor: "pointer",
        }),
      },
      "& input::placeholder": {
        opacity: 1,
        fontWeight: 600,
        fontSize: "16px",
      },
    }),
    iconContainer: ({ disabled = false }) => ({
      top: "50%",
      right: "8px",
      display: "flex",
      alignItems: "center",
      position: "absolute",
      transform: "translateY(-50%)",
      pointerEvents: disabled ? "none" : "auto",
    }),
    icon: ({ disabled = false }) => ({
      fontSize: "30px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      color: disabled ? "#aaa" : undefined,
    }),
    spotlightTextfield: {
      top: 30,
      width: "90%",
      position: "absolute",
    },
    menuContainer: {
      marginTop: 1,
      boxShadow: 3,
      borderRadius: 3,
      overflow: "hidden",
      backgroundColor: "#fff",
    },
    menuItem: {
      padding: 0,
      color: "black",
      "& .MuiAutocomplete-option": {
        padding: "8px 16px",
        borderBottom: "1.5px solid #efefefff",
        "&:last-child": {
          borderBottom: "none",
        },
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    backdrop: (theme: Theme) => ({
      color: "#fff",
      zIndex: theme.zIndex.modal + 1,
    }),
  });
