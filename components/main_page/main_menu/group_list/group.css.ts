import { style } from "@vanilla-extract/css"

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
        color: "black",
    }),
    top_not_selected: style({
        backgroundColor: "#f0f0f0",
        "@media" : {
            "screen and (hover: hover)": {
                ":hover": {
                    backgroundColor: "#dff0df",
                },
            },
        },
    }),
    top_selected: style({
        backgroundColor: "#cfe0cf",
        ":hover": {
            backgroundColor: "#cfe0cf",
        },
        "@media": {
            "screen and (max-width: 40rem)": {
                backgroundColor: "#f0f0f0",
                ":hover": {
                    backgroundColor: "#f0f0f0",
                },
            },
        },
    }),
    count: style({
        position: "absolute",
        right: "1rem",
    }),
};