import { style } from "@vanilla-extract/css"

export default {
  top: style({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexBasis: "1",
    flexGrow: "1",
    overflowX: "hidden",
  }),
  main_view: style({
    width: "100%",
    height: "100%",
    display: "flex",
    flexBasis: "1",
    "@media": {
      "screen and (max-width: 40rem)": {
        width: "200%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      },
    },
  }),
};
