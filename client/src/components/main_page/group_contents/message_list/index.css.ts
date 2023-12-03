import { style } from "@vanilla-extract/css"

export default {
  top: style({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flexBasis: "1",
    flexGrow: "1",
  }),
  group_list: style({
    position: "relative",
    display: "flex",
    height: "100%",
    flexBasis: "0",
    flexGrow: "1",
  }),
  view_hidden: style({
    visibility: "hidden",
  }),
};
