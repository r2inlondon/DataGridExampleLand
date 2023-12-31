import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";

import CustomPagination from "../Pagination/CustomPagination";
import ToolbarContainer from "../CustomFilter/ToolbarContainer";

import { DocumentsColumnsInt } from "../rootTypes/columnsTypes";
import { StoredFilesType } from "../sampleData/storedFiles";

// type ComponentProps = {
//     data: StoredFilesType[];
//     gridColumns: DocumentsColumnsInt[];
//     baseColumn: DocumentsColumnsInt;
//     // onDelete: (id: string) => void;
// };

function DataGridComp({ data, gridColumns, baseColumn }) {
    const [page, setPage] = useState(1);
    const [columns, setColumns] = useState(gridColumns);
    const [allRowsCount, setAllRowsCount] = useState(0);
    const [currentRowsInLabel, setCurrentRowsInLabel] = useState(0);
    const [resetRows, setResetRows] = useState(true);
    const [selectedColumn, setSelectedColumn] = useState(baseColumn.field);
    const [selectedColumnType, setSelectedColumnType] = useState(
        baseColumn.type
    );
    const [applicableOperators, setApplicableOperators] = useState(
        baseColumn.filterOperators
    );
    const [selectedOperator, setSelectedOperator] = useState(
        baseColumn.filterOperators[0].value
    );
    const [filterValue, setFilterValue] = useState("");
    const [filterModelItems, setFilterModelItems] = useState({
        columnField: selectedColumn,
        operatorValue: selectedOperator,
        value: filterValue,
    });

    const classes = useStyles();

    useEffect(() => {
        if (resetRows) {
            setFilterValue("");
            setAllRowsCount(data.length);
            setResetRows(false);
        }
    }, [resetRows]);

    // useEffect(() => {
    //     const columnsOperatorsOk = gridColumns.map((column) =>
    //         column?.type === "number"
    //             ? { ...column, filterOperators: getGridNumberOperators() }
    //             : column
    //     );
    //     console.log({ columnsOperatorsOk });
    //     setColumns(columnsOperatorsOk);
    // }, [selectedColumn]);

    useEffect(() => {
        setFilterModelItems({
            columnField: selectedColumn,
            operatorValue: selectedOperator,
            value:
                selectedColumnType === "number"
                    ? filterValue.replace(/,/g, "")
                    : filterValue,
        });
    }, [applicableOperators, selectedOperator, filterValue]);

    useEffect(() => {
        if (columns.length > 0) {
            const column = columns.find(
                (column) => column.field === selectedColumn
            );

            console.log(column);
            handleOperators(column);
        }
    }, [columns, selectedColumn]);

    function handleOperators(column) {
        if (!column) return;
        console.log("entering case");

        setFilterValue("");
        switch (column?.type) {
            case "number":
                setSelectedOperator("notEquals");
                setApplicableOperators(column.filterOperators);
                break;
            case "date":
                setSelectedOperator("is");
                setApplicableOperators(dateOperators());
                break;
            default:
                setSelectedOperator("contains");
                setApplicableOperators(stringOperators());
        }
    }

    const rowsPerPage = 4;
    const pageCount = Math.ceil(allRowsCount / rowsPerPage);

    function onClear() {
        setSelectedColumn(baseColumn.field);
        setSelectedColumnType(baseColumn.type);
        setResetRows(true);
    }

    function updateRowCountInLabel(virtualRowsCount) {
        if (virtualRowsCount !== currentRowsInLabel) {
            setCurrentRowsInLabel(virtualRowsCount);
        }
    }

    function updateTotalLabel(filteredRowsArr) {
        if (filteredRowsArr.length !== allRowsCount) {
            setAllRowsCount(filteredRowsArr.length);
            setPage(1);
        }
    }

    function resetTotalLabelCount(totalRows) {
        if (totalRows !== allRowsCount) {
            setAllRowsCount(totalRows);
        }
    }

    function handlePanelRowsLabelCount(
        virtualRowsCount,
        isFiltering,
        filteredRowsArr
    ) {
        if (isFiltering && filterValue) updateTotalLabel(filteredRowsArr);
        if (!isFiltering && !filterValue && filteredRowsArr.length === 0)
            resetTotalLabelCount(data.length);
        updateRowCountInLabel(virtualRowsCount);
    }

    return (
        <Fragment>
            <div className={classes.gridContainer}>
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
                    page={page - 1}
                    disableColumnFilter={true}
                    onStateChange={(state) => {
                        const virtualRowsCount =
                            state.containerSizes?.virtualRowsCount;
                        const isFiltering = Boolean(
                            state.visibleRows.visibleRows
                        );
                        const filteredRowsArr = isFiltering
                            ? state.visibleRows.visibleRows
                            : [];

                        handlePanelRowsLabelCount(
                            virtualRowsCount,
                            isFiltering,
                            filteredRowsArr
                        );
                    }}
                />
                <CustomPagination
                    pageCount={pageCount}
                    page={page}
                    onPageChange={setPage}
                />
            </div>
        </Fragment>
    );
}

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

export default DataGridComp;
