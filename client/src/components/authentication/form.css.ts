import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

import { ButtonVars } from "components/common/button/index.css";

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
  }),
  form_text: style({
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    fontSize: "1.1rem",
    marginTop: "0.5rem",
  }),
  form: style({
    fontFamily: "sans-serif",
    color: "black",
    fontSize: "1rem",
  }),
  button: style({
    vars: {
      [ButtonVars.fontSize]: "1.1rem",
      [ButtonVars.padding]: "0.3rem",
    },
    width: "100%",
    marginTop: "0.5rem",
  }),
};
