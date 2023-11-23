import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

type ComponentProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

function CustomPagination({
    totalPages,
    currentPage,
    setCurrentPage,
}: ComponentProps) {
    const classes = useStyles();

    // console.log("footer:", pageCount);

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
                    <PaginationItem {...props2} component="div" />
                )}
            />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
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
}));

export default CustomPagination;
