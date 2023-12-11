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

import { style } from "@vanilla-extract/css"
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
    flexDirection: "column-reverse",
    flexBasis: "0",
    flexGrow: "1",
    overflowY: "scroll",
    padding: "0.1rem 1rem",
  }),
  centering: style({
    position: "relative",
    display: "flex",
    justifyContent: "center"
  }),
  message_list: style({
    position: "absolute",
    width: "min(90%, 60rem)",
    display: "flex",
    flexDirection: "column",
    overflowY: "visible",
    bottom: "0"
  }),
  list_end: style({
    height: "10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  date: style({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem 0",
  }),
  date_hline: style({
    height: "1px",
    width: "100%",
    backgroundColor: gvars.color.base._2,
  }),
  date_text: style({
    fontFamily: "sans-serif",
    fontSize: "0.9rem",
    color: "#777777",
    margin: "0 0.5rem",
  })
};
