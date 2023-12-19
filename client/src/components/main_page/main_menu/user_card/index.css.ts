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
import { ButtonVars } from "components/common/button/index.css";
import { gvars } from "components/common/global_vars.css";

export default {
  top: style({
    margin: "0.2rem"
  }),
  button: style({
    vars: {
      [ButtonVars.padding]: "0.3rem 0.5rem",
      [ButtonVars.textAlign]: "left",
      [ButtonVars.border]: `0.1rem solid ${gvars.color.base._2}`,
      [ButtonVars.borderRadius]: "0.2rem",
    },
    userSelect: "none",
  }),
  popup_hidden: style({
    visibility: "hidden",
  }),
};
