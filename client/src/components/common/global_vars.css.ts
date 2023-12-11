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

import { createTheme } from "@vanilla-extract/css";

export const [themeLight, gvars] = createTheme({
  color: {
    bg: {
      light: "#ffffff",
      dark: "#f0f0f0",
    },
    field: {
      onLight: "#f8f8f8",
      onDark: "#fdfdfd",
    },
    base: {
      onLight: "#f0f0f0",
      onDark: "#f8f8f8",
      _1: "#f5f5f5",
      _2: "#bbbbbb",
      _3: "#999999",
      _4: "#000000",
    },
    main: {
      _0: "#dff0df",
      _1: "#cfe0cf",
      _2: "#c0f0c0",
      _3: "#afdfaf",
    },
    font: {
      _0: "#000000",
      _1: "#ffffff",
    }
  },
});

export const themeDark = createTheme(gvars, {
  color: {
    bg: {
      light: "#383838",
      dark: "#2c2c2c",
    },
    field: {
      onLight: "#555555",
      onDark: "#4d4d4d",
    },
    base: {
      onLight: "#4d4d4d",
      onDark: "#323232",
      _1: "#292929",
      _2: "#bbbbbb",
      _3: "#999999",
      _4: "#ffffff",
    },
    main: {
      _0: "#6f806f",
      _1: "#4f604f",
      _2: "#70a070",
      _3: "#3f6f3f",
    },
    font: {
      _0: "#e5e5e5",
      _1: "#000000",
    }
  },
});
