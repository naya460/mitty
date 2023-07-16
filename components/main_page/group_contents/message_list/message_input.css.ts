import { style } from "@vanilla-extract/css"

export default {
  top: style({
    width: "100%",
    marginTop: "0.5rem",
    marginBottom: "1rem",
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
    height: "1.5rem",
    resize: "none",
    border: "2px",
    borderStyle: "solid",
    borderColor: "#8fbf8f",
    borderRadius: "0.5rem",
    backgroundColor: "#f0f0f0",
    margin: "0.2rem 0.5rem",
    fontFamily: "sans-serif",
    fontSize: "1rem",
    color: "black",
    padding: "0.5rem",
    lineHeight: "1.5rem",
    ":focus-visible": {
      outline: "none",
    },
  }),
  send_button: style({
    border: "0",
    borderRadius: "0.5rem",
    backgroundColor: "#a0d0a0",
    margin: "0.2rem 0",
    marginRight: "0.5rem",
    ":hover": {
      backgroundColor: "#b0e0b0",
    },
    ":active": {
      backgroundColor: "#8fbf8f",
    },
  }),
};