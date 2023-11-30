import { style } from "@vanilla-extract/css"
import { gvars } from "components/common/global_vars.css";

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
  message_list: style({
    position: "absolute",
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column-reverse",
    flexBasis: "0",
    flexGrow: "1",
    overflowY: "scroll",
    padding: "0.1rem 1rem",
  }),
  message_list_hidden: style({
    visibility: "hidden",
  }),
  messages_center: style({
    position: "relative",
    display: "flex",
    justifyContent: "center"
  }),
  messages: style({
    position: "absolute",
    width: "min(90%, 60rem)",
    display: "flex",
    flexDirection: "column",
    overflowY: "visible",
    bottom: "0"
  }),
  date: style({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem 0",
  }),
  date_hline: style({
    height: "1px",
    width: "100%",
    backgroundColor: gvars.color.base._2,
  }),
  date_text: style({
    fontFamily: "sans-serif",
    fontSize: "0.9rem",
    color: "#777777",
    margin: "0 0.5rem",
  })
};