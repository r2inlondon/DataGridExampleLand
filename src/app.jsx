import React, { useEffect, useState, useRef, Fragment } from "react";

import ListIcon from "@material-ui/icons/List";
import ViewGridOutlineIcon from "mdi-react/ViewGridOutlineIcon";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";

import {
    Box,
    Button,
    Typography,
    makeStyles,
    IconButton,
} from "@material-ui/core";

import DocumentItem from "./grid/DocumentItem";
import DataGridContainer from "./data-grid/DataGridContainer";

import { storedFiles } from "./storedFiles";

const useStyles = makeStyles((theme) => styles(theme));

function App() {
    const classes = useStyles();
    const [documents, setDocuments] = useState([]);
    const [showGrid, setShowGrid] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        setDocuments(storedFiles);
    }, [storedFiles]);

    function handleChange(event) {
        console.log(event);
    }

    function handleSubmission(file) {
        console.log(file);
    }

    function handleDelete(id) {
        console.log(id);
    }

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
            <IconButton onClick={() => setShowGrid(!showGrid)} size="small">
                {showGrid ? <ViewGridOutlineIcon /> : <ListIcon />}
            </IconButton>
        </Box>
    );

    return (
        <>
            {showGrid && (
                <Fragment>
                    <div className={classes.header}>
                        <Typography color="textSecondary" variant="body2">
                            Showing {documents.length} out of {documents.length}{" "}
                            documents
                        </Typography>
                        <Box component="div" display="flex">
                            {uploadButton}
                            {gridAndListButton}
                        </Box>
                    </div>
                    <div className={classes.grid}>
                        {documents.map((document) => (
                            <DocumentItem
                                key={document.filename}
                                document={document}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </Fragment>
            )}
            {/* {!showGrid && <DocumentsTable documents={documents} onDelete={handleDelete} />} */}
            {!showGrid && (
                <DataGridContainer
                    documents={documents}
                    uploadButton={uploadButton}
                    gridAndListButton={gridAndListButton}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}

const styles = (theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginBottom: 2,
    },
    grid: {
        display: "grid",
        gridGap: 16,
        gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
        padding: 5,
    },
});

export default App;
