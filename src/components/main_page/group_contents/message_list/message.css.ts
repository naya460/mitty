import { style } from "@vanilla-extract/css"

export default {
  top: style({
    width: "fit-content",
    maxWidth: "70%",
    minWidth: "1rem",
    marginTop: "2px",
  }),
  top_mine: style({
    marginLeft: "auto",
  }),
  status: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: "0.25rem",
  }),
  status_mine: style({
    justifyContent: "right",
  }),
  name: style({
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    fontFamily: "sans-serif",
    color: "black",
  }),
  name_mine: style({
    scale: "0",
    width: "0",
  }),
  time: style({
    fontFamily: "sans-serif",
    color: "#999999",
    fontSize: "0.8rem",
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
  message_box_mine_related: style({
    borderTopRightRadius: "0",
  }),
  message_box_member: style({
    backgroundColor: "#ededed",
    borderBottomLeftRadius: "0",
  }),
  message_box_member_related: style({
    borderTopLeftRadius: "0",
  })
};