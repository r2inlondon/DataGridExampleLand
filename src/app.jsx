import React, { useEffect, useState } from "react";

import ListIcon from "@material-ui/icons/List";
import ViewGridOutlineIcon from "mdi-react/ViewGridOutlineIcon";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

import {
    Box,
    Button,
    Typography,
    makeStyles,
    IconButton,
    Badge,
    Popover,
} from "@material-ui/core";

import DocumentItem from "./grid/DocumentItem";
// import DataGridContainer from "./data-grid/DataGridContainer";
import FilterListIcon from "@material-ui/icons/FilterList";

import { storedFiles } from "./storedFiles";
import CustomFilterPanel from "./CustomFilter/CustomFilterPanel";

const useStyles = makeStyles((theme) => styles(theme));

function App() {
    const classes = useStyles();
    const [documents, setDocuments] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [currentRowsInLabel, setCurrentRowsInLabel] = useState(0);
    const [allRowsCount, setAllRowsCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setDocuments(storedFiles);
    }, [storedFiles]);

    const onClear = () => {
        setSelectedColumn("name");
        setSelectedColumnType("contains");
        // setFilterValue("");
        // setResetRows(true);
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    function handleChange(event) {
        console.log(event);
    }

    function handleSubmission(file) {
        console.log(file);
    }

    function handleDelete(id) {
        console.log(id);
    }

    const gridColumns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
            disableColumnMenu: true,
            hide: true,
            type: "number",
        },
        {
            field: "name",
            headerName: "Name",
            disableColumnMenu: true,
            minWidth: 130,
            type: "string",
            // filterOperators: getGridNumberOperators()
        },
        {
            field: "filetype",
            headerName: "Type",
            disableColumnMenu: true,
            flex: 1,
            type: "string",
        },
        {
            field: "size",
            headerName: "Size",
            disableColumnMenu: true,
            flex: 150,
            type: "number",
        },
        {
            field: "created_at",
            headerName: "Date",
            disableColumnMenu: true,
            minWidth: 230,
            type: "date",
            valueFormatter: ({ value }) => {
                if (value) {
                    const date = parseISO(value);
                    const formattedDate = format(date, "dd/MM/yyyy");
                    return formattedDate;
                } else {
                    return "";
                }
            },
            // filterOperators: getGridNumberOperators()
        },
    ];

    const baseColumn = gridColumns[1];

    const uploadButton = (
        <Button color="secondary" variant="outlined" component="label">
            <CloudUploadOutlinedIcon />
            <Box component="span" ml={1}>
                Upload
            </Box>
            <input
                type="file"
                // accept="image/*"
                hidden
                onChange={handleChange}
            />
        </Button>
    );

    const gridAndListButton = (
        <Box component="div" mx={2} display="flex" justifyContent="center">
            <IconButton onClick={() => setShowTable(!showTable)} size="small">
                {showTable ? <ViewGridOutlineIcon /> : <ListIcon />}
            </IconButton>
        </Box>
    );

    return (
        <div className={classes.mainContainer}>
            <div className={classes.header}>
                <Typography color="textSecondary" variant="body2">
                    {`Showing ${documents.length} out of ${documents.length} documents`}
                </Typography>
                <div className={classes.iconsHeader}>
                    {uploadButton}
                    <IconButton
                        size="small"
                        color="primary"
                        id={open ? "simple-popover" : undefined}
                        aria-haspopup="true"
                        onClick={handlePopoverOpen}
                    >
                        <Badge
                            // badgeContent={filterValue ? 1 : 0}
                            badgeContent={0}
                            color="primary"
                        >
                            <FilterListIcon />
                        </Badge>
                    </IconButton>
                    {gridAndListButton}
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
                    <CustomFilterPanel
                        data={documents}
                        columns={gridColumns}
                        baseColumn={baseColumn}
                        onClear={onClear}
                        currentRowsInLabel={currentRowsInLabel}
                        allRowsCount={allRowsCount}
                    />
                </Popover>
            </div>
            {!showTable && (
                <div className={classes.grid}>
                    {documents.map((document) => (
                        <DocumentItem
                            key={document.filename}
                            document={document}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
            {/* {!showGrid && <DocumentsTable documents={documents} onDelete={handleDelete} />} */}
            {/* {showTable && (
                <DataGridContainer
                    documents={documents}
                    uploadButton={uploadButton}
                    gridAndListButton={gridAndListButton}
                    onDelete={handleDelete}
                />
            )} */}
        </div>
    );
}

const styles = (theme) => ({
    mainContainer: {
        width: "80%",
        margin: "auto",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginBottom: 2,
    },
    iconsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    grid: {
        display: "grid",
        gridGap: 16,
        gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
        padding: 5,
    },
});

export default App;
