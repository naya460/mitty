import { style } from "@vanilla-extract/css";
import { ButtonVars } from "components/common/button/index.css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    margin: "0.2rem"
  }),
  button: style({
    vars: {
      [ButtonVars.padding]: "0.3rem 0.5rem",
      [ButtonVars.textAlign]: "left",
      [ButtonVars.border]: `0.1rem solid ${gvars.color.base._2}`,
      [ButtonVars.borderRadius]: "0.2rem",
    },
    userSelect: "none",
  }),
  user_name: style({
    fontSize: "1rem",
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
  }),
  popup_hidden: style({
    visibility: "hidden",
  }),
};
