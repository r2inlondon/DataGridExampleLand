import React, { useEffect, useState } from "react";
import {
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

import { StoredFilesType } from "../sampleData/storedFiles";
import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "../rootTypes/columnsTypes";
import { OperatorsBaseInt } from "../rootTypes/columnsTypes";
import { CachedFilterType } from "../app";
import { set } from "date-fns";

import { addOperatorsToColumn } from "./addOperatorsToColumn";
import { filterForm } from "./FilterForm";

type CustomFilterPanelProps = {
    data: StoredFilesType[];
    columns: DocumentsColumnsInt[];
    baseColumn: DocumentsColumnsInt;
    filteredItems: StoredFilesType[];
    setFilteredItems: (items: StoredFilesType[]) => void;
    setIsFilterOn: (isFilterOn: boolean) => void;
    isFilterOn: boolean;
    cachedFilter: CachedFilterType | undefined;
    setCachedFilter: (filter: CachedFilterType | undefined) => void;
};

const useStyles = makeStyles((theme) => styles(theme));

const CustomFilterPanel = (props: CustomFilterPanelProps) => {
    const {
        data,
        columns,
        baseColumn,
        filteredItems,
        setFilteredItems,
        isFilterOn,
        setIsFilterOn,
        cachedFilter,
        setCachedFilter,
    } = props;

    const [isDate, setIsDate] = useState<boolean>(false);
    const [resetFilter, setResetFilter] = useState<boolean>(true);
    const [columnsWithOperators, setColumnsWithOperators] = useState<
        DocumentsColumnsWithOpValues[]
    >([]);
    const [selectedColumn, setSelectedColumn] =
        useState<DocumentsColumnsWithOpValues>();
    const [selectedOperator, setSelectedOperator] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");
    const [operatorsForSelectMenu, setOperatorsForSelectMenu] = useState<
        OperatorsBaseInt[]
    >([]);
    const [operatorForLabelIndex, setOperatorForLabelIndex] =
        useState<number>(0);
    const [columnForLabel, setColumnForLabel] = useState<string>("");
    const classes = useStyles();

    function setFilterUp(
        initColumn: DocumentsColumnsWithOpValues | DocumentsColumnsInt,
        operator = "",
        filterValue = ""
    ) {
        const newColumns = addOperatorsToColumn(columns);
        setColumnsWithOperators(newColumns);

        const foundColumn = newColumns.find(
            (column) => column.field === initColumn.field
        );

        if (foundColumn) {
            setSelectedColumn(foundColumn);

            setOperatorsForSelectMenu(foundColumn.operatorsValues);

            const isOperatorPresent = Boolean(operator)
                ? operator
                : foundColumn.operatorsValues[0].value;
            const isfilterValPresent = Boolean(filterValue) ? filterValue : "";

            setSelectedOperator(isOperatorPresent);
            setFilterValue(isfilterValPresent);
            setResetFilter(false);
        }
        console.log("init Filter");
    }

    useEffect(() => {
        if (resetFilter && !isFilterOn) {
            setFilterUp(baseColumn);
        }
    }, [resetFilter]);

    useEffect(() => {
        if (isFilterOn && cachedFilter) {
            setFilterUp(
                cachedFilter.column,
                cachedFilter.operator,
                cachedFilter.value
            );
        }
    }, []);

    useEffect(() => {
        if (columnsWithOperators.length > 0 && !cachedFilter) {
            const foundColumn = columnsWithOperators.find(
                (column) => column.field === selectedColumn?.field
            );

            if (foundColumn) {
                const operators = foundColumn.operatorsValues;
                setSelectedOperator(operators[0].value);
                setOperatorsForSelectMenu(operators);
            }
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (selectedColumn) {
            const foundColumn = columnsWithOperators.find(
                (column) => column.field === selectedColumn.field
            );

            if (foundColumn) setColumnForLabel(foundColumn.headerName);
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (operatorsForSelectMenu && operatorsForSelectMenu.length > 0) {
            const operator = operatorsForSelectMenu.find(
                (operator) => operator.value === selectedOperator
            );

            selectedColumn?.type === "date"
                ? setIsDate(true)
                : setIsDate(false);

            if (operator) {
                const operatorIndex = operatorsForSelectMenu.findIndex(
                    (obj) => obj.label === operator.label
                );

                setOperatorForLabelIndex(operatorIndex);
            }
        }
    }, [operatorsForSelectMenu, selectedOperator]);

    function handleClearFilter() {
        setIsFilterOn(false);
        setResetFilter(true);

        // TODO: reset filtered data
        // onClear()
    }

    function handleSelectedColumn(columnName: string) {
        const column = columnsWithOperators.find(
            (column) => column.headerName === columnName
        );
        setFilterValue("");
        setCachedFilter(undefined);
        setSelectedColumn(column);
    }

    function handleSelectedOperator(operatorLabel: string) {
        if (operatorsForSelectMenu) {
            const operator = operatorsForSelectMenu.find(
                (operator) => operator.label === operatorLabel
            );

            if (operator) setSelectedOperator(operator.value);
        }
    }

    useEffect(() => {
        if (selectedColumn !== undefined) {
            const filterModel = {
                column: selectedColumn,
                operator: selectedOperator,
                value: filterValue,
            };

            setCachedFilter(filterModel);

            const results = filterForm(data, filterModel);
            setFilteredItems(results);
        }
    }, [selectedOperator, filterValue]);

    function handleFilterValue(userInput: string) {
        setFilterValue(userInput);
    }

    const columnsIndex = columnsWithOperators.findIndex(
        (obj) => obj.headerName === columnForLabel
    );

    return (
        <div className={classes.container}>
            <IconButton onClick={handleClearFilter} size="small">
                <ClearIcon />
            </IconButton>
            <FormControl className={classes.inputs} variant="standard">
                <InputLabel id="column-select-label">Columns</InputLabel>
                <Select
                    labelId="column-select-label"
                    id="column-select"
                    value={
                        columnsIndex !== -1
                            ? columnsWithOperators[columnsIndex].headerName
                            : ""
                    }
                    onChange={(e: any) => handleSelectedColumn(e.target.value)}
                    label="Columns"
                >
                    {columnsWithOperators.map((column, index) => (
                        <MenuItem key={index} value={column.headerName}>
                            {column.headerName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.inputs} variant="standard">
                <InputLabel id="operator-select-label">Operators</InputLabel>
                {operatorsForSelectMenu.length > 0 && (
                    <Select
                        labelId="operator-select-label"
                        id="operator-select"
                        value={
                            operatorForLabelIndex !== -1
                                ? operatorsForSelectMenu[operatorForLabelIndex]
                                      .label
                                : ""
                        }
                        onChange={(e: any) =>
                            handleSelectedOperator(e.target.value)
                        }
                        label="Operators"
                    >
                        {operatorsForSelectMenu?.map((operator, index) => (
                            <MenuItem key={index} value={operator.label}>
                                {operator.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>
            <TextField
                id="filter-value-input"
                label={isDate ? " " : "Value"}
                type={isDate ? "date" : "text"}
                inputProps={{
                    autoComplete: "off",
                }}
                value={filterValue}
                onChange={(e: any) => handleFilterValue(e.target.value)}
                className={classes.inputs}
                style={{ flexGrow: 1 }}
            />
        </div>
    );
};

const styles = (theme: any) => ({
    container: {
        display: "flex",
        alignItems: "center",
        padding: 15,
        "& > .MuiFormControl-root": {
            width: "150px",
        },
    },
    inputs: {
        "& .MuiInputBase-root": {
            "&:before": {
                borderBottom: "1px solid #e2e2e1",
            },
            "&:hover": {
                borderBottom: "1px solid green",
            },
            "&:after": {
                borderBottom: "2px solid red",
            },
        },
    },
});

export default CustomFilterPanel;
