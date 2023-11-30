import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    margin: "0.2rem"
  }),
  button: style({
    padding: "0.2rem",
    borderRadius: "0.2rem",
    border: "0.1rem",
    borderStyle: "solid",
    borderColor: gvars.color.base._2,
    userSelect: "none",
    cursor: "pointer",
    "@media": {
      "screen and (hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._0,
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
