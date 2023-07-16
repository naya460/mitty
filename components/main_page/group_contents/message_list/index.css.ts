import { style } from "@vanilla-extract/css"

export default {
  top: style({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flexBasis: "1",
    flexGrow: "1",
  }),
  messages: style({
    height: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    flexBasis: "0",
    flexGrow: "1",
    overflowY: "scroll",
    padding: "0.1rem 1rem",
  }),
};