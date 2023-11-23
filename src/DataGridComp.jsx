import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@mui/x-data-grid";

import CustomPagination from "./CustomPagination";
import ToolbarContainer from "./ToolbarContainer";
import { customNumberOperators } from "./numberOperators";
import { stringOperators, dateOperators } from "./stringAndDateOperators";

const useStyles = makeStyles((theme) => styles(theme));

function DataGridComp({ data, gridColumns, baseColumn, baseColumnOperators }) {
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
        baseColumnOperators[0].value
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

            handleOperators(column);
        }
    }, [columns, selectedColumn]);

    function handleOperators(column) {
        if (!column) return;

        setFilterValue("");
        switch (column?.type) {
            case "number":
                setSelectedOperator("notEquals");
                setApplicableOperators(customNumberOperators());
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
                    hideFooter
                    getRowId={(row) => row.id}
                    page={page - 1}
                    disableColumnFilter={true}
                    filterModel={{
                        items: [filterModelItems],
                    }}
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
                    components={{
                        Toolbar: ToolbarContainer,
                    }}
                    componentsProps={{
                        toolbar: {
                            currentRowsInLabel,
                            allRowsCount,
                            columns,
                            applicableOperators,
                            setSelectedColumnType,
                            selectedColumn,
                            setSelectedColumn,
                            selectedOperator,
                            setSelectedOperator,
                            filterValue,
                            setFilterValue,
                            onClear,
                            handleOperators,
                        },
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

const styles = (theme) => ({
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
        position: "relative",
    },
});

export default DataGridComp;
