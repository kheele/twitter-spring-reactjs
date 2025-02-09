import {makeStyles, Theme} from "@material-ui/core";

export const useNotInterestedTopicStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        padding: "11px 16px",
        cursor: "pointer",
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTypography-h6": {
            fontWeight: 700,
        },
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
        "& a": {
            color: "inherit",
            textDecoration: "none",
        },
    },
    topicInfo: {
        display: "inline-block"
    },
    iconCircle: {
        marginRight: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        "& svg": {
            height: "1em",
            fill: theme.palette.common.white,
        },
    },
    buttonWrapper: {
        flex: 1,
    },
    outlinedButton: {
        float: "right",
        width: 79,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));
