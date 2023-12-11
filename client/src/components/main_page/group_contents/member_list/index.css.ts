// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { style } from "@vanilla-extract/css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    display: "flex",
    flexDirection: "column",
    flexBasis: "0",
    flexGrow: "0",
    position: "absolute",
    right: "0",
    top: "0",
    bottom: "0",
    padding: "0.5rem 1rem",
    backgroundColor: gvars.color.bg.dark,
    zIndex: "5",
    transform: "translate(calc(100% + 5px), 0)",
    transition: "transform 0.25s 50ms",
    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 50%)",
    color: gvars.color.font._0,
    "@media": {
      "screen and (min-width: 60rem)": {
        transition: "none",
      }
    }
  }),
  top_display: style({
    scale: "1",
    minWidth: "10rem",
    transform: "translate(0, 0)",
    "@media": {
      "screen and (min-width: 60rem)": {
        display: "block",
        position: "initial",
        transform: "translate(0, 0)",
        boxShadow: "none",
        paddingRight: "2rem",
      }
    }
  }),
  background: style({
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "4",
    pointerEvents: "none",
    backgroundColor: gvars.color.base._4,
    opacity: "0%",
    transition: "opacity 0.3s",
  }),
  bg_display: style({
    width: "auto",
    scale: "1",
    opacity: "30%",
    pointerEvents: "initial",
    "@media": {
      "screen and (min-width: 60rem)": {
        opacity: "0",
        pointerEvents: "none",
      }
    }
  }),
  title_text: style({
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
    fontSize: "1.2rem",
    width: "100%",
    textAlign: "center",
    marginBottom: "0.5rem",
  }),
};