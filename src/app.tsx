import React, { useEffect, useState } from "react";

import { parseISO, format, set } from "date-fns";

import ListIcon from "@material-ui/icons/List";
import ViewGridOutlineIcon from "mdi-react/ViewGridOutlineIcon";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";

import {
    Box,
    Button,
    Typography,
    makeStyles,
    IconButton,
} from "@material-ui/core";

import DocumentItem from "./grid/DocumentItem";
import DataGridContainer from "./data-grid/DataGridContainer";
import FilterContainer from "./CustomFilter/FilterContainer";
import CustomPagination from "./Pagination/CustomPagination";

import { storedFiles, StoredFilesType } from "./sampleData/storedFiles";
import { uploadItem } from "./sampleData/uploadItem";

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
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isFileDeleted, setIsFiledDeleted] = useState(false);
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
        if (filteredItems.length !== documents.length && !isFilterOn) {
            setIsFilterOn(true);
            setCurrentPage(1);
            console.log("Turning filter ON");
        }

        if (filteredItems.length !== documents.length && isFilterOn) {
            setIsFilterOn(true);
            setCurrentPage(1);
            console.log("filter updated");
        }

        if (filteredItems.length === documents.length && isFilterOn) {
            setIsFilterOn(false);
            console.log("Turning filter OFF");
        }
    }, [totalItems]);

    useEffect(() => {
        const deleteMovePage =
            isFileDeleted && visibleItems.length === 1 && currentPage > 1;
        const deleteDontMovePage = isFileDeleted && visibleItems.length !== 1;

        if (deleteMovePage) {
            setCurrentPage(currentPage - 1);
            setIsFiledDeleted(false);
            console.log("Deleted");
        }

        if (deleteDontMovePage) setIsFiledDeleted(false);

        if (isFileUploaded) {
            setIsFileUploaded(false);
            setCurrentPage(totalPages);
            console.log("uploaded file");
        }
    }, [totalItems]);

    function handlePopoverOpen(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handlePopoverClose() {
        setAnchorEl(null);
    }

    function handleUpload() {
        const newItem = uploadItem(documents);
        const updatedDocuments = [...documents, newItem];

        setDocuments(updatedDocuments);
        setFilteredItems(updatedDocuments);
        setIsFileUploaded(true);
    }

    function handleDelete(id: number) {
        const updatedDocuments = documents.filter((item) => item.id !== id);

        setDocuments(updatedDocuments);
        setFilteredItems(updatedDocuments);
        setIsFiledDeleted(true);
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
        {
            field: "delete",
            headerName: " ",
            type: "actions",
            width: 50,
            disableColumnMenu: true,
            renderCell: ({ row }: GridValueFormatterParams) => (
                <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <DeleteOutlineIcon color="error" />
                </IconButton>
            ),
        },
    ];

    const uploadButton = (
        <Button
            color="secondary"
            variant="outlined"
            component="label"
            onClick={handleUpload}
        >
            <CloudUploadOutlinedIcon />
            <Box component="span" ml={1}>
                Upload
            </Box>
        </Button>
    );

    const gridAndListButton = (
        <Box component="div" mx={2} display="flex" justifyContent="center">
            <IconButton
                data-test="gridAndListButton"
                onClick={() => setShowGrid(!showGrid)}
                size="small"
            >
                {showGrid ? <ViewGridOutlineIcon /> : <ListIcon />}
            </IconButton>
        </Box>
    );

    return (
        <div className={classes.mainContainer}>
            <div className={classes.header}>
                <Typography
                    data-test="filter-header"
                    color="textSecondary"
                    variant="body2"
                >
                    {`Showing ${visibleItems.length} out of ${filteredItems.length} documents`}
                </Typography>
                <div className={classes.iconsHeader}>
                    {uploadButton}
                    <FilterContainer
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
                <div data-test="grid-ele" className={classes.grid}>
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
