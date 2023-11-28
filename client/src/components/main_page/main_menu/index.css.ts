import { style } from "@vanilla-extract/css"

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    height: "auto",
    minWidth: "15rem",
    maxWidth: "15rem",
    backgroundColor: "#f0f0f0",
    zIndex: "20",
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 50%)",
    padding: "0.5rem 0.2rem",
    overflowY: "scroll",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "@media": {
      "screen and (max-width: 40rem)": {
        maxWidth: "100%",
        minWidth: "0%",
        flexBasis: "1",
        flexGrow: "1",
        backgroundColor: "initial",
        padding: "0.5rem 1rem",
      },
    },
  }),
  top_selected: style({
    "@media": {
      "screen and (max-width: 40rem)": {
        width: "0",
        padding: "0",
        scale: "0",
      }
    }
  }),
};
