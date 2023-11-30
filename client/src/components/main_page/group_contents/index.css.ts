import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "hidden",
    transition: "opacity 0.1s",
  }),
  top_null: style({
    opacity: "0",
    "@media": {
      "screen and (max-width: 40rem)": {
        opacity: "1",
        width: "0",
        scale: "0",
      },
    },
  }),
  header: style({
    display: "flex",
    flexDirection: "row",
    flexBasis: "0",
    flexGrow: "0",
    padding: "0.5rem",
    backgroundColor: gvars.color.base._0,
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
    color: "black",
    height: "100%",
    marginLeft: "0.5rem",
    alignItems: "center",
    flexGrow: "1",
  }),
  member_button: style({
    backgroundColor: gvars.color.base._1,
    borderStyle: "none",
    borderRadius: "0.5rem",
    fontSize: "auto",
    fontFamily: "sans-serif",
    color: "black",
    "@media": {
      "screen and (hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
  contents: style({
    display: "flex",
    flexDirection: "row",
    flexBasis: "1",
    flexGrow: "1",
    position: "relative",
  }),
};