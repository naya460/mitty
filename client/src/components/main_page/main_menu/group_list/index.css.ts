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

export default {
  top: style({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexBasis: "0",
    flexGrow: "0",
  }),
  form: style({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "0.2rem",
  }),
};