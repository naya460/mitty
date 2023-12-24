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

export const UserIconVars = {
  size: createVar(),
};

export default {
  icon: style({
    aspectRatio: "1 / 1",
    width: "auto",
    height: fallbackVar(UserIconVars.size, "2rem"),
    borderRadius: "50%",
  }),
};
