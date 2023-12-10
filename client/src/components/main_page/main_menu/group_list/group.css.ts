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