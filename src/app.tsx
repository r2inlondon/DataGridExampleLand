import React, { useEffect, useState } from "react";

import { parseISO, format } from "date-fns";

import ListIcon from "@material-ui/icons/List";
import ViewGridOutlineIcon from "mdi-react/ViewGridOutlineIcon";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";

import {
    Box,
    Button,
    Typography,
    makeStyles,
    IconButton,
} from "@material-ui/core";

// import DataGridComponent from "./data-grid/DataGridComp";
import DocumentItem from "./grid/DocumentItem";
import DataGridContainer from "./data-grid/DataGridContainer";
import CustomFilter from "./CustomFilter/CustomFilter";
import CustomPagination from "./Pagination/CustomPagination";

import { storedFiles, StoredFilesType } from "./sampleData/storedFiles";

const useStyles = makeStyles((theme) => styles(theme));

function App() {
    const classes = useStyles();
    const [documents, setDocuments] = useState<StoredFilesType[]>([]);
    const [filteredItems, setFilteredItems] = useState<StoredFilesType[]>([]);
    const [showGrid, setShowGrid] = useState(false);
    const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
    const [visibleItems, setVisibleItems] = useState<StoredFilesType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const totalItems = filteredItems.length;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        setDocuments(storedFiles);
        setFilteredItems(storedFiles);
    }, [storedFiles]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedItems = filteredItems.slice(startIndex, endIndex);
        setVisibleItems(slicedItems);
    }, [filteredItems, currentPage]);

    useEffect(() => {
        if (filteredItems.length !== documents.length) {
            setIsFilterOn(true);
        } else {
            setIsFilterOn(false);
        }
    }, [filteredItems]);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalItems]);

    function handlePopoverOpen(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handlePopoverClose() {
        setAnchorEl(null);
    }

    function handleDelete(id: any) {
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
            field: "filename",
            headerName: "Name",
            disableColumnMenu: true,
            flex: 1,
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
            width: 130,
            type: "number",
            valueFormatter: ({ value }: GridValueFormatterParams) => {
                if (value) {
                    return Number(value).toLocaleString();
                } else {
                    return "";
                }
            },
        },
        {
            field: "created_at",
            headerName: "Date",
            disableColumnMenu: true,
            width: 230,
            type: "date",
            valueFormatter: ({ value }: GridValueFormatterParams) => {
                if (typeof value === "string") {
                    const date = parseISO(value);
                    const formattedDate = format(date, "dd/MM/yyyy");
                    return formattedDate;
                } else {
                    return "";
                }
            },
        },
    ];

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
                // onChange={handleChange}
            />
        </Button>
    );

    const gridAndListButton = (
        <Box component="div" mx={2} display="flex" justifyContent="center">
            <IconButton onClick={() => setShowGrid(!showGrid)} size="small">
                {showGrid ? <ViewGridOutlineIcon /> : <ListIcon />}
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
                    <CustomFilter
                        documents={documents}
                        filteredItems={filteredItems}
                        setFilteredItems={setFilteredItems}
                        columns={gridColumns}
                        handlePopoverOpen={handlePopoverOpen}
                        open={open}
                        isFilterOn={isFilterOn}
                        setIsFilterOn={setIsFilterOn}
                        anchorEl={anchorEl}
                        handlePopoverClose={handlePopoverClose}
                    />
                    {gridAndListButton}
                </div>
            </div>
            {showGrid && (
                <div className={classes.grid}>
                    {visibleItems.map((document) => (
                        <DocumentItem
                            key={document.filename}
                            document={document}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
            {!showGrid && (
                <DataGridContainer
                    data={visibleItems}
                    columns={gridColumns}
                    // onDelete={handleDelete}
                />
            )}
            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

const styles = (theme: any) => ({
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
