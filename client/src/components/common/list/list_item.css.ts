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

import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { gvars } from "../global_vars.css";

export const ListItemVars = {
  padding: createVar(),
};

export default {
  top: style({
    display: "flex",
  }),
  button: style({
    width: "100%",
    height: "100%",
    backgroundColor: gvars.color.base.onDark,
    border: 0,
    borderStyle: "none",
    borderRadius: "0.25rem",
    padding: fallbackVar(ListItemVars.padding, "0.5rem 0.8rem"),
    cursor: "pointer",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    columnGap: "0.5rem",
    "@media": {
      "(hover: hover)": {
        ":hover": {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
  button_selected: style({
    "@media": {
      "(hover: hover)": {
        backgroundColor: gvars.color.main._1,
        ":hover": {
          backgroundColor: gvars.color.main._1,
        },
      },
    },
  }),
  title: style({
    color: gvars.color.font._0,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    textAlign: "left",
  }),
  itemEnd: style({
    display: "flex",
    height: "100%",
    alignItems: "center",
  }),
};
