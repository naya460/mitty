import { style } from "@vanilla-extract/css";

export default {
  form: style({
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr 2rem',
    gap: '0.5rem',
  }),
  buttons: style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem'
  }),
};
