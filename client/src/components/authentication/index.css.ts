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
    width: "100%",
    height: "100%",
    backgroundColor: gvars.color.bg.dark,
  }),
  container: style({
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
    color: gvars.color.font._0,
    fontSize: "3rem",
    margin: "0px",
    marginTop: "0.5rem",
    width: "100%",
    textAlign: "center",
  }),
  description: style({
    fontFamily: "sans-serif",
    color: gvars.color.font._0,
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
    color: gvars.color.base._3,
  }),
};
