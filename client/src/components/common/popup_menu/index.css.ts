import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

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
    backgroundColor: gvars.color.base._0,
    left: 0,
    right: 0,
    height: "auto",
    boxShadow: "0 2px 10px 2px rgba(0, 0, 0, 0.2)",
    padding: "1rem",
    boxSizing: "border-box",
    zIndex: "20",
    transition: "opacity 0.1s",
    color: gvars.color.font._0,
  }),
  popup_hidden: style({
    opacity: "0",
    pointerEvents: "none",
  }),
};
