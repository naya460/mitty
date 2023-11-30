import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    height: "auto",
    minWidth: "15rem",
    maxWidth: "15rem",
    backgroundColor: gvars.color.base._1,
    zIndex: "9",
    padding: "0.5rem 0.2rem",
    paddingRight: "0.5rem",
    boxSizing: "border-box",
    overflowY: "scroll",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "@media": {
      "screen and (max-width: 40rem)": {
        maxWidth: "100%",
        minWidth: "0%",
        flexBasis: "1",
        flexGrow: "1",
        backgroundColor: "initial",
        padding: "0.5rem 1rem",
      },
    },
  }),
  top_selected: style({
    "@media": {
      "screen and (max-width: 40rem)": {
        width: "0",
        padding: "0",
        scale: "0",
      }
    }
  }),
};
