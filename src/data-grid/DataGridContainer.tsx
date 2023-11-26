import React from "react";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";

import { StoredFilesType } from "../sampleData/storedFiles";

// import DataGridComponent from "./DataGridComp";
// import { parseISO, format, parse } from "date-fns";

type ContainerProps = {
    data: StoredFilesType[];
    columns: GridColDef[];

    // onDelete: (id: string) => void;
};

const DataGridContainer = ({ data, columns }: ContainerProps) => {
    // const columnsWithOperators = initColumnsWithOperators(gridColumns);
    // const baseColumn = columnsWithOperators[1];

    const classes = useStyles();
    const rowsPerPage = 5;

    return (
        <div
            style={{
                backgroundColor: "#e3e3e3",
                // height: "120vh",
            }}
        >
            <DataGrid
                autoHeight
                pagination
                className={classes.root}
                rows={data}
                columns={columns}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
                disableSelectionOnClick
                // disableColumnSelector
                hideFooter
                getRowId={(row) => row.id}
                // page={page - 1}
                disableColumnFilter={true}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        border: "none",
        "& .MuiDataGrid-cell": {
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: "black",
        },
        "& .MuiDataGrid-columnSeparator": {
            display: "none",
        },
        "& .MuiDataGrid-columnsContainer": {
            background: "#69d1ca",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: "black",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
            lineHeight: "large",
        },
    },
    gridContainer: {
        backgroundColor: "white",
        // width: "100%",
        position: "relative",
    },
}));

export default DataGridContainer;
