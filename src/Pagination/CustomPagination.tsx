import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

type ComponentProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const useStyles = makeStyles((theme) => styles(theme));

function CustomPagination({
    totalPages,
    currentPage,
    setCurrentPage,
}: ComponentProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                showFirstButton
                showLastButton
                color="primary"
                variant="outlined"
                shape="rounded"
                renderItem={(props2) => (
                    <PaginationItem
                        {...props2}
                        className={classes.paginationItem}
                    />
                )}
            />
        </div>
    );
}

const styles = (theme: any) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        "& > *": {
            marginTop: theme.spacing(3),
        },
        "& .MuiPaginationItem-root": {
            border: "none !important",
            color: "black !important",
        },
        "& .Mui-selected": {
            backgroundColor: `lime`,
            color: "white !important",
        },
    },
    paginationItem: {
        // Add styles to disable ripple effect
        "& .MuiTouchRipple-root": {
            display: "none",
        },
    },
});

export default CustomPagination;
