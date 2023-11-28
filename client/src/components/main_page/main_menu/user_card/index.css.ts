import { style } from "@vanilla-extract/css";

export default {
  top: style({
    margin: "0.2rem"
  }),
  button: style({
    padding: "0.2rem",
    borderRadius: "0.2rem",
    border: "0.1rem",
    borderStyle: "solid",
    borderColor: "#bbbbbb",
    userSelect: "none",
    "@media": {
      "screen and (hover: hover)": {
        ":hover": {
          backgroundColor: "#dff0df",
        },
      },
    },
  }),
  user_name: style({
    fontSize: "1rem",
    fontFamily: "sans-serif",
    color: "blacK",
  }),
  popup_hidden: style({
    visibility: "hidden",
  }),
};
