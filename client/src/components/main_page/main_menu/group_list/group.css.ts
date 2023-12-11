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
		position: "relative",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "3rem",
		padding: "0.5rem",
		marginTop: "0.2rem",
		border: "0",
		borderRadius: "0.25rem",
		fontSize: "1rem",
		fontFamily: "sans-serif",
		color: gvars.color.font._0,
	}),
	top_not_selected: style({
		backgroundColor: gvars.color.base.onDark,
		"@media" : {
			"screen and (hover: hover)": {
				":hover": {
					backgroundColor: gvars.color.main._0,
				},
			},
		},
	}),
	top_selected: style({
		backgroundColor: gvars.color.main._1,
		":hover": {
			backgroundColor: gvars.color.main._1,
		},
		"@media": {
			"screen and (max-width: 40rem)": {
				backgroundColor: gvars.color.base._1,
				":hover": {
					backgroundColor: gvars.color.base._1,
				},
			},
		},
	}),
	count: style({
		position: "absolute",
		right: "1rem",
	}),
};