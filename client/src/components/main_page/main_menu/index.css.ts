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
    height: "auto",
    minWidth: "15rem",
    maxWidth: "15rem",
    backgroundColor: gvars.color.bg.dark,
    zIndex: "9",
    padding: "0.5rem 0.2rem",
    paddingRight: "0.5rem",
    boxSizing: "border-box",
    overflowY: "scroll",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "@media": {
      "screen and (max-width: 40rem)": {
        maxWidth: "100%",
        width: "100%",
        flexBasis: "1",
        backgroundColor: "initial",
        padding: "0.5rem 1rem",
        transition: "transform 0.4s ease-in-out, opacity 0.2s ease-in-out",
      },
    },
  }),
  top_selected: style({
    "@media": {
      "screen and (max-width: 40rem)": {
        opacity: 0,
        transform: "translate(-100%, 0)",
      }
    }
  }),
};
