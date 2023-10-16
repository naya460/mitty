import { style } from "@vanilla-extract/css"

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "15rem",
    minWidth: "10rem",
    marginLeft: "50%",
    transform: "translate(-50%, 0)",
  }),
  title: style({
    fontFamily: "sans-serif",
    color: "black",
    fontSize: "3rem",
    margin: "0px",
    marginTop: "0.5rem",
    width: "100%",
    textAlign: "center",
  }),
  description: style({
    fontFamily: "sans-serif",
    color: "black",
    fontSize: "1.5rem",
    margin: "0px",
    marginTop: "0.5rem",
    width: "100%",
    textAlign: "center",
  }),
  change_a: style({
    fontFamily: "sans-serif",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    color: "rgb(50, 50, 50)",
  }),
};