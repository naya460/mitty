import { style } from "@vanilla-extract/css"
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    width: "100%",
    height: "100%",
    backgroundColor: gvars.color.bg.light,
  }),
  container: style({
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "15rem",
    minWidth: "10rem",
    marginLeft: "50%",
    transform: "translate(-50%, 0)",
  }),
  title: style({
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    fontSize: "3rem",
    margin: "0px",
    marginTop: "0.5rem",
    width: "100%",
    textAlign: "center",
  }),
  description: style({
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    fontSize: "1.5rem",
    margin: "0px",
    marginTop: "0.5rem",
    width: "100%",
    textAlign: "center",
  }),
  change_a: style({
    fontFamily: "sans-serif",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    color: gvars.color.base._3,
  }),
};
