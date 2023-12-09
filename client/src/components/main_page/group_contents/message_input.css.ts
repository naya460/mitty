import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    width: "100%",
    padding: "0.1rem 0",
    paddingBottom: "0.3rem",
    flexBasis: "0",
  }),
  form: style({
    display: "inline-flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
  }),
  message_box: style({
    width: "100%",
    height: "1.5rem",
    resize: "none",
    border: "1px",
    borderStyle: "solid",
    borderColor: gvars.color.main._3,
    borderRadius: "0.5rem",
    backgroundColor: gvars.color.base.light,
    margin: "0.2rem 0.5rem",
    fontFamily: "sans-serif",
    fontSize: "1rem",
    color: gvars.color.font._0,
    padding: "0.5rem",
    lineHeight: "1.5rem",
    ":focus-visible": {
      outline: "none",
    },
  }),
  send_button: style({
    border: "0",
    borderRadius: "0.5rem",
    backgroundColor: gvars.color.main._3,
    margin: "0.2rem 0",
    marginRight: "0.5rem",
    color: gvars.color.font._0,
    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._2,
        },
      },
    },    
    ":active": {
      backgroundColor: gvars.color.main._3,
    },
  }),
};
