import { createTheme } from "@vanilla-extract/css";

export const [themeLight, gvars] = createTheme({
  color: {
    bg: {
      light: "#ffffff",
      dark: "#f5f5f5",
    },
    field: {
      onLight: "#f8f8f8",
      onDark: "#fdfdfd",
    },
    base: {
      light: "#f5f5f5",
      dark: "#ededed",
      _1: "#f5f5f5",
      _2: "#bbbbbb",
      _3: "#999999",
      _4: "#000000",
    },
    main: {
      _0: "#dff0df",
      _1: "#cfe0cf",
      _2: "#c0f0c0",
      _3: "#afdfaf",
    },
    font: {
      _0: "#000000",
      _1: "#ffffff",
    }
  },
});

export const themeDark = createTheme(gvars, {
  color: {
    bg: {
      light: "#383838",
      dark: "#2c2c2c",
    },
    field: {
      onLight: "#4d4d4d",
      onDark: "#4d4d4d",
    },
    base: {
      light: "#4d4d4d",
      dark: "#323232",
      _1: "#292929",
      _2: "#bbbbbb",
      _3: "#999999",
      _4: "#ffffff",
    },
    main: {
      _0: "#6f806f",
      _1: "#4f604f",
      _2: "#70a070",
      _3: "#3f6f3f",
    },
    font: {
      _0: "#e5e5e5",
      _1: "#000000",
    }
  },
});
