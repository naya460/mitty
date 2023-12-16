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
    width: 'min(20rem, 100% - 2rem)',
    height: 'min(15rem, 100% - 2rem)',
    borderRadius: '0.5rem',
    backgroundColor: gvars.color.bg.light,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 20%)',
    padding: '1rem',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '0.5rem',
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
  title: style({
    fontFamily: 'sans-serif',
    color: gvars.color.font._0,
  }),
};
