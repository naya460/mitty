import { createGlobalTheme } from "@vanilla-extract/css";

export const gvars = createGlobalTheme(":root", {
  color: {
    base: {
      _0: "#ffffff",
      _1: "#f5f5f5",
      _2: "#bbbbbb",
      _3: "#999999",
      _4: "#000000",
    },
    main: {
      _0: "#dff0df",
      _1: "#cfe0cf",
      _2: "#b0e0b0",
      _3: "#8fbf8f",
    }
  },
});
