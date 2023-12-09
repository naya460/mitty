import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

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
    fontFamily: "sans-serif",
    color: "black",
    fontSize: "1.1rem",
    padding: "0.1rem",
    width: "100%",
    marginTop: "0.5rem",
  }),
};