import { style } from "@vanilla-extract/css"

export default {
  top: style({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexBasis: "1",
    flexGrow: "1",
  }),
  main_view: style({
    width: "100%",
    height: "100%",
    display: "flex",
  }),
};
