/* eslint-disable @typescript-eslint/consistent-type-definitions */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    palette: PaletteOptions;
  }

  interface PaletteOptions {
    text: TypeText;
    background: TypeBackground;
  }

  interface TypeText {
    white: string;
    purple: string;
    grey100: string;
    grey200: string;
    grey300: string;
  }

  interface TypeBackground {
    grey400: string;
    purple: string;
    main: string;
  }
}
