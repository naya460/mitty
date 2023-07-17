import { style } from "@vanilla-extract/css"

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "hidden",
  }),
  top_null: style({
    "@media": {
      "screen and (max-width: 40rem)": {
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
    backgroundColor: "#f0f0f0",
    boxShadow: "0 0 5px 1px rgba(0, 0, 0, 50%)",
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
        backgroundColor: "#8fbf8f",
        borderStyle: "solid",
        borderRadius: "0.5rem",
        fontSize: "auto",
        fontFamily: "sans-serif",
        color: "black",
      },
      "screen and (max-width: 40rem) and (hover: hover)": {
        ":hover": {
          backgroundColor: "#dff0df",
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
    backgroundColor: "#f0f0f0",
    borderColor: "#8fbf8f",
    borderStyle: "solid",
    borderRadius: "0.5rem",
    fontSize: "auto",
    fontFamily: "sans-serif",
    color: "black",
    "@media": {
      "screen and (hover: hover)": {
        ":hover": {
          backgroundColor: "#dff0df",
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