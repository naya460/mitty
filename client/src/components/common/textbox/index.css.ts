import { style } from "@vanilla-extract/css";
import { gvars } from "../global_vars.css";

export default {
  text_area: style({
    height: '1.5rem',
    resize: 'none',
    border: '1px',
    borderStyle: 'solid',
    borderColor: gvars.color.main._3,
    borderRadius: '0.5rem',
    backgroundColor: gvars.color.base.light,
    fontFamily: 'sans-serif',
    fontSize: '1rem',
    color: gvars.color.font._0,
    padding: '0.5rem',
    lineHeight: '1.5rem',
    ':focus-visible': {
      outlineColor: gvars.color.main._2,
      outlineWidth: '2px',
      outlineStyle: 'solid',
    }
  }),
};
