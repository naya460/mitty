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
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  }),
  dialog: style({
    width: 'min(20rem, 100% - 2rem)',
    height: 'min(fit-content, 100% - 2rem)',
    borderRadius: '0.5rem',
    backgroundColor: gvars.color.bg.light,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 20%)',
    padding: '1rem',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '1rem',
    transition: 'opacity 0.2s ease-out',
  }),
  background: style({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: gvars.color.base._4,
    transition: 'opacity 0.2s ease-out',
  }),
  background_display: style({
    opacity: '50%',
  }),
  hidden: style({
    opacity: 0,
    pointerEvents: 'none',
  }),
  title: style({
    fontFamily: 'sans-serif',
    color: gvars.color.font._0,
  }),
};
