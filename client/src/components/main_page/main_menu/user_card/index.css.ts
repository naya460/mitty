import { style } from "@vanilla-extract/css";

export default {
  top: style({
    margin: "0.2rem",
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
  popup: style({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "10",
  }),
  popup_background: style({
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  }),
  popup_contents: style({
    position: "absolute",
    borderRadius: "0.5rem",
    backgroundColor: "#e0e0e0",
    width: "min(80%, 20rem)",
    height: "min(80%, 15rem)",
    boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.5)",
    padding: "1rem",
    boxSizing: "border-box",
  }),
};
