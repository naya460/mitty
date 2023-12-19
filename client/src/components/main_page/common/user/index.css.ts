import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "0.5rem",
  }),
  icon: style({
    aspectRatio: "1 / 1",
    width: "auto",
    height: "2rem",
    borderRadius: "1rem",
  }),
  name: style({
    fontSize: "1rem",
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    alignSelf: "center"
  }),
};
