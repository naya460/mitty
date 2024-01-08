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

import { style, createVar, fallbackVar } from "@vanilla-extract/css";
import { gvars } from "../global_vars.css";

export const ButtonVars = {
  fontSize: createVar(),
  padding: createVar(),
  textAlign: createVar(),
  border: createVar(),
  borderRadius: createVar(),
};

export default {
  button: style({
    height: '100%',
    width: '100%',
    border: fallbackVar(ButtonVars.border, '0 none'),
    borderRadius: fallbackVar(ButtonVars.borderRadius, '0.5rem'),
    fontFamily: 'sans-serif',
    fontSize: fallbackVar(ButtonVars.fontSize, '0.9rem'),
    color: gvars.color.font._0,
    padding: fallbackVar(ButtonVars.padding, '0.1rem 0.4rem'),
    backgroundColor: gvars.color.base.onLight,
    cursor: 'pointer',
    textAlign: fallbackVar(ButtonVars.textAlign, 'center'),
    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: gvars.color.main._0,
        },
      },
    },
  }),
  accent: style({
    backgroundColor: gvars.color.main._3,
    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: gvars.color.main._2,
        },
        ':active': {
          backgroundColor: gvars.color.main._3,
        }
      }
    }
  }),
  label_button: style({
    display: "flex",
    boxSizing: "border-box",
    alignItems: "center"
  }),
};
