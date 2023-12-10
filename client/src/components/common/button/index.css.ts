import { style, createVar, fallbackVar } from "@vanilla-extract/css";
import { gvars } from "../global_vars.css";

export const ButtonVars = {
  fontSize: createVar(),
  padding: createVar(),
};

export default {
  button: style({
    height: '100%',
    width: '100%',
    border: 0,
    borderStyle: 'none',
    borderRadius: '0.5rem',
    fontFamily: 'sans-serif',
    fontSize: fallbackVar(ButtonVars.fontSize, '0.9rem'),
    color: gvars.color.font._0,
    padding: fallbackVar(ButtonVars.padding, '0.1rem 0.4rem'),
    backgroundColor: gvars.color.base.onLight,
    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
  accent: style({
    backgroundColor: gvars.color.main._3,
    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: gvars.color.main._2,
        },
        ':active': {
          backgroundColor: gvars.color.main._3,
        }
      }
    }
  }),
};
