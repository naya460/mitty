import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  header: style({
    display: "flex",
    flexDirection: "row",
    flexBasis: "0",
    flexGrow: "0",
    padding: "0.5rem",
    backgroundColor: gvars.color.bg.light,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 40%)",
    zIndex: "10",
  }),
  back_button: style({
    width: "0",
    scale: "0",
    "@media": {
      "screen and (max-width: 40rem)": {
        height: "100%",
        width: "auto",
        scale: "1",
        aspectRatio: "1",
        backgroundColor: gvars.color.base._1,
        borderStyle: "none",
        borderRadius: "0.5rem",
        fontSize: "auto",
        fontFamily: "sans-serif",
        color: "black",
      },
      "screen and (max-width: 40rem) and (hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
  group_name: style({
    display: "flex",
    fontSize: "1.2rem",
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    height: "100%",
    marginLeft: "0.5rem",
    alignItems: "center",
    flexGrow: "1",
  }),
  member_button: style({
    backgroundColor: gvars.color.base.onLight,
    borderStyle: "none",
    borderRadius: "0.5rem",
    fontSize: "auto",
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    "@media": {
      "screen and (hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
};
