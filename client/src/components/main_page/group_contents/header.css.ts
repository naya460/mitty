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
import { GroupNameVars } from "../common/group/name.css";

export default {
  header: style({
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gap: "0.5rem",
    padding: "0.5rem",
    backgroundColor: gvars.color.bg.light,
    boxShadow: "0 0 4px 0 rgba(0, 0, 0, 40%)",
    zIndex: 1,
    vars: {
      [GroupNameVars.fontSize]: "1.2rem",
    },
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
};
