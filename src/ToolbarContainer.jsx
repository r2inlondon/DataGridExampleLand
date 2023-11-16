import React, { useState } from "react";

import { Popover, Typography, IconButton, Badge, Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";

import CustomFilterPanel from "./data-grid/CustomFilterPanel";

const useStyles = makeStyles((theme) => styles(theme));

function ToolbarContainer(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentRowsInLabel, allRowsCount, filterValue } = props;
    const classes = useStyles();

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <GridToolbarContainer>
            <div className={classes.container}>
                <Typography variant="body2">
                    {`Showing ${currentRowsInLabel} out of ${allRowsCount} addresses`}
                </Typography>
                <IconButton
                    size="small"
                    color="primary"
                    aria-owns={open ? "simple-popover" : undefined}
                    aria-haspopup="true"
                    onClick={handlePopoverOpen}
                >
                    <Badge badgeContent={filterValue ? 1 : 0} color="primary">
                        <FilterListIcon />
                    </Badge>
                </IconButton>
            </div>
            <Popover
                id="simple-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <CustomFilterPanel {...props} />
            </Popover>
        </GridToolbarContainer>
    );
}

const styles = (theme) => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
});

export default ToolbarContainer;
