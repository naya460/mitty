import { style } from "@vanilla-extract/css";

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowX: "hidden",
    transition: "opacity 0.1s",
    "@media": {
      "screen and (max-width: 40rem)": {
        boxSizing: "border-box",
        transform: "translate(-100%, 0)",
        transition: "transform 0.4s ease-in-out, opacity 0.2s ease-in-out"
      }
    }
  }),
  top_null: style({
    display: 'none',
    opacity: 0,
    "@media": {
      "screen and (max-width: 40rem)": {
        opacity: 0,
        transform: "translate(0, 0)",
      },
    },
  }),
  side: style({
    display: "flex",
    height: "100%",
    position: "relative",
  }),
  contents: style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }),
};