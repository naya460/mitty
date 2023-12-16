import { style } from "@vanilla-extract/css";

export default {
  form: style({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "0.2rem",
  }),
};
