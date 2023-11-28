import { style } from "@vanilla-extract/css";

export default {
  hidden: style({
    opacity: "0",
    pointerEvents: "none",
  }),
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
  background: style({
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  }),
  popup: style({
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
