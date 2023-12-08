import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

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
    color: gvars.color.base._3,
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
    backgroundColor: gvars.color.main._1,
    borderBottomRightRadius: "0",
  }),
  message_box_mine_related: style({
    borderTopRightRadius: "0",
  }),
  message_box_member: style({
    backgroundColor: gvars.color.base._1,
    borderBottomLeftRadius: "0",
  }),
  message_box_member_related: style({
    borderTopLeftRadius: "0",
  })
};