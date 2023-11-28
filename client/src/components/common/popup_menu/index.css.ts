import { style } from "@vanilla-extract/css";

export default {
  top: style({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "10",
    transition: "opacity 0.1s"
  }),
  top_hidden: style({
    display: "none",
  }),
  popup_base: style({
    position: "relative",
  }),
  popup: style({
    position: "absolute",
    borderRadius: "0.5rem",
    backgroundColor: "#e0e0e0",
    left: 0,
    right: 0,
    height: "auto",
    boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.5)",
    padding: "1rem",
    boxSizing: "border-box",
    zIndex: "20",
  }),
  popup_hidden: style({
    opacity: "0",
    pointerEvents: "none",
  }),
};
