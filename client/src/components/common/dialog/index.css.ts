import { style } from "@vanilla-extract/css";
import { gvars } from "../global_vars.css";

export default {
  top: style({
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s',
  }),
  dialog: style({
    width: '20rem',
    height: '15rem',
    borderRadius: '0.5rem',
    backgroundColor: gvars.color.bg.light,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 20%)',
    padding: '1rem',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
  }),
  background: style({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: gvars.color.base._4,
    transition: 'opacity 0.2s',
  }),
  background_display: style({
    opacity: '50%',
  }),
  hidden: style({
    opacity: 0,
    pointerEvents: 'none',
  }),
};
