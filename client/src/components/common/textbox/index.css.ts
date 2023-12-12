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
import { gvars } from "../global_vars.css";

export default {
  top: style({
    display: "flex",
  }),
  textbox: style({
    width: "100%",
    height: '1.5rem',
    resize: 'none',
    border: '1px',
    borderStyle: 'solid',
    borderColor: gvars.color.main._3,
    borderRadius: '0.5rem',
    backgroundColor: gvars.color.field.onLight,
    fontFamily: 'sans-serif',
    fontSize: '1rem',
    color: gvars.color.font._0,
    padding: '0.5rem',
    lineHeight: '1.5rem',
    ':focus-visible': {
      outlineColor: gvars.color.main._2,
      outlineWidth: '2px',
      outlineStyle: 'solid',
    }
  }),
  onDark: style({
    backgroundColor: gvars.color.field.onDark,
  }),
  single: style({
    padding: '0.3rem',
  }),
};
