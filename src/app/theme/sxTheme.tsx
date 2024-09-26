import { SxTheme } from "@App/theme/types";

export const typedSx = <D extends string>(obj: Record<D, SxTheme>): Record<D, SxTheme> => {
  return obj;
};
