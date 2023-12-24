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
import { UserIconVars } from "../common/user/icon.css";
import { UserNameVars } from "../common/user/name.css";

export default {
  top: style({
    padding: "1rem",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    height: "fit-content",
    gap: "1rem",
    vars: {
      [UserIconVars.size]: "6rem",
      [UserNameVars.fontSize]: "1.4rem",
    },
  }),
};
