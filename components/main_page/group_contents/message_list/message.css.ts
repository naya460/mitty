import { style } from "@vanilla-extract/css"

export default {
  top: style({
    width: "fit-content",
    maxWidth: "70%",
    minWidth: "1rem",
    marginTop: "0.5rem",
  }),
  top_mine: style({
    marginLeft: "auto",
  }),
  name: style({
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    fontFamily: "sans-serif",
    color: "black",
  }),
  name_mine: style({
    textAlign: "right",
  }),
  message_box: style({
    whiteSpace: "pre-line",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    overflowWrap: "break-word",
    fontFamily: "sans-serif",
    color: "black",
  }),
  message_box_mine: style({
    backgroundColor: "#cfe0cf",
    borderBottomRightRadius: "0",
  }),
  message_box_member: style({
    backgroundColor: "#ededed",
    borderBottomLeftRadius: "0",
  }),
};