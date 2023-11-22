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

import FilterListIcon from "@material-ui/icons/FilterList";

import { storedFiles, StoredFilesType } from "./sampleData/storedFiles";
import CustomFilterPanel from "./CustomFilter/CustomFilterPanel";
// import DataGridComponent from "./data-grid/DataGridComp";

import DataGridContainer from "./data-grid/DataGridContainer";

import { DocumentsColumnsInt } from "./rootTypes/columnsTypes";
import { DocumentsColumnsWithOpValues } from "./rootTypes/columnsTypes";

const useStyles = makeStyles((theme) => styles(theme));

export type CachedFilterType = {
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

function App() {
    const classes = useStyles();
    const [documents, setDocuments] = useState<StoredFilesType[]>([]);
    const [filteredItems, setFilteredItems] = useState<StoredFilesType[]>([]);
    const [showGrid, setShowGrid] = useState(false);
    const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
    const [cachedFilter, setCachedFilter] = useState<
        CachedFilterType | undefined
    >();
    // const [currentRowsInLabel, setCurrentRowsInLabel] = useState(0);
    // const [allRowsCount, setAllRowsCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setDocuments(storedFiles);
        setFilteredItems(storedFiles);
    }, [storedFiles]);

    useEffect(() => {
        if (filteredItems.length !== documents.length) {
            console.log("filter ON");
            setIsFilterOn(true);
        } else {
            console.log("filter OFF");
            setIsFilterOn(false);
        }
    }, [filteredItems]);

    const handlePopoverOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

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
        },
        {
            field: "created_at",
            headerName: "Date",
            disableColumnMenu: true,
            width: 230,
            type: "date",
            // valueFormatter: ({ value }) => {
            //     if (value) {
            //         const date = parseISO(value);
            //         const formattedDate = format(date, "dd/MM/yyyy");
            //         return formattedDate;
            //     } else {
            //         return "";
            //     }
            // },
            // filterOperators: getGridNumberOperators()
        },
    ];

    const baseColumn: DocumentsColumnsInt = gridColumns[1];

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
                    <IconButton
                        size="small"
                        color="primary"
                        id={open ? "simple-popover" : undefined}
                        aria-haspopup="true"
                        onClick={handlePopoverOpen}
                    >
                        <Badge
                            badgeContent={isFilterOn ? 1 : 0}
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
                        filteredItems={filteredItems}
                        setFilteredItems={setFilteredItems}
                        columns={gridColumns}
                        baseColumn={baseColumn}
                        setIsFilterOn={setIsFilterOn}
                        isFilterOn={isFilterOn}
                        cachedFilter={cachedFilter}
                        setCachedFilter={setCachedFilter}
                        // onClear={onClear}
                        // currentRowsInLabel={currentRowsInLabel}
                        // allRowsCount={allRowsCount}
                    />
                </Popover>
            </div>
            {showGrid && (
                <div className={classes.grid}>
                    {filteredItems.map((document) => (
                        <DocumentItem
                            key={document.filename}
                            document={document}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
            {/* {!showGrid && <DocumentsTable documents={documents} onDelete={handleDelete} />} */}
            {!showGrid && (
                <DataGridContainer
                    data={filteredItems}
                    columns={gridColumns}
                    // onDelete={handleDelete}
                />
            )}
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
