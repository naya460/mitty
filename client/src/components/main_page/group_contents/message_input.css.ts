import { style } from "@vanilla-extract/css";

export default {
  top: style({
    width: "100%",
    padding: "0.1rem 0",
    paddingBottom: "0.3rem",
    flexBasis: "0",
  }),
  form: style({
    display: "inline-flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
  }),
  message_box: style({
    width: "100%",
    margin: "0.2rem 0.5rem",
  }),
  send_button: style({
    margin: "0.2rem 0",
    marginRight: "0.5rem",
  }),
};
