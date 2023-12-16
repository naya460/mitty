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
    paddingTop: "0.1rem",
    marginTop: "0.1rem",
    paddingBottom: "0.3rem",
    backgroundColor: gvars.color.bg.light,
    boxSizing: "border-box",
  }),
  form: style({
    display: "inline-flex",
    flexDirection: "row",
    width: "100%",
    height: "fit-content",
  }),
  message_box: style({
    width: "100%",
    margin: "0.2rem 0.5rem",
  }),
  send_button: style({
    margin: "0.2rem 0",
    marginRight: "0.5rem",
  }),
};
