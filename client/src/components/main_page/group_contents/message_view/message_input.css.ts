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
    position: "sticky",
    bottom: "0",
    paddingTop: "0.2rem",
    marginTop: "0.2rem",
    paddingBottom: "0.5rem",
    backgroundColor: gvars.color.bg.light,
    boxSizing: "border-box",
  }),
  form: style({
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    gap: "0.5rem",
    width: "100%",
    height: "fit-content",
  }),
  message_box: style({
    width: "100%",
  }),
  send_button: style({
    width: "100%",
    height: "100%",
  }),
};
