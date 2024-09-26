import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const palette = {
  mode: "dark",
  primary: {
    main: "#241E29",
  },
  text: {
    white: "#fff",
    purple: "#684FA5",
    grey100: "#edf7fe",
    grey200: "#aaafb6",
    grey300: "#909090",
  },
  background: {
    grey400: "#332D32",
    purple: "#684FA5",
    main: "#241E29",
  },
} as const;

const components: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        height: "100%",
      },
      "body, #root": {
        height: "100%",
        backgroundColor: "#000000",
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#aaafb6",
          borderWidth: "0.5px",
        },
        input: {
          color: "#aaafb6",
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        "&.Mui-focused": {
          color: "#aaafb6",
        },
      },
    },
  },
};

export const DARK_STOCK_ORDER_THEME = createTheme({
  palette,
  components,
});
