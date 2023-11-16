import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

function CustomPagination({ pageCount, page, onPageChange }) {
  const classes = useStyles();

  // console.log("footer:", pageCount);

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        showFirstButton
        showLastButton
        color="primary"
        variant="outlined"
        shape="rounded"
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginTop: theme.spacing(3)
    },
    "& .MuiPaginationItem-root": {
      border: "none !important",
      color: "black !important"
    },
    "& .Mui-selected": {
      backgroundColor: `lime`,
      color: "white !important"
    }
  }
}));

export default CustomPagination;
