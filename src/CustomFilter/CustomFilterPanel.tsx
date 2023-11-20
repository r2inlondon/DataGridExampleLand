import React, { useEffect, useState } from "react";
import {
    IconButton,
    Select,
    MenuItem,
    Input,
    FormControl,
    InputLabel,
    Box,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

import { addOperatorsToColumn } from "./addOperatorsToColumn";
import { StoredFilesType } from "../sampleData/storedFiles";
import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "../rootTypes/columnsTypes";
import { OperatorsBaseInt } from "../rootTypes/columnsTypes";

type CustomFilterPanelProps = {
    data: StoredFilesType[];
    columns: DocumentsColumnsInt[];
    baseColumn: DocumentsColumnsInt;
};

const useStyles = makeStyles((theme) => styles(theme));

const CustomFilterPanel = (props: CustomFilterPanelProps) => {
    const {
        data,
        columns,
        baseColumn,
        // onClear,
        // handleOperators,
    } = props;

    const [isDate, setIsDate] = useState<Boolean>(false);
    const [resetFilter, setResetFilter] = useState<Boolean>(true);
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
    // const [operatorForLabel, setOperatorForLabel] = useState<string>("");
    const [operatorForLabelIndex, setOperatorForLabelIndex] =
        useState<number>(0);
    const [columnForLabel, setColumnForLabel] = useState<string>("");
    const classes = useStyles();

    useEffect(() => {
        if (resetFilter) {
            setFilterValue("");
            const newColumns = addOperatorsToColumn(columns);
            setColumnsWithOperators(newColumns);

            const baseColumWithOperators = newColumns.find(
                (column) => column.field === baseColumn.field
            );

            if (baseColumWithOperators) {
                setSelectedColumn(baseColumWithOperators);

                setOperatorsForSelectMenu(
                    baseColumWithOperators.operatorsValues
                );
                setSelectedOperator(
                    baseColumWithOperators.operatorsValues[0].value
                );
                setResetFilter(false);
            }

            console.log("RESET FILTER !!");
        }
    }, [resetFilter]);

    useEffect(() => {
        if (columnsWithOperators.length > 0) {
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
        setResetFilter(true);

        // TODO: reset filtered data
        // onClear()
    }

    function handleSelectedColumn(columnName: string) {
        const column = columnsWithOperators.find(
            (column) => column.headerName === columnName
        );
        setFilterValue("");
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
                onChange={(e) => setFilterValue(e.target.value)}
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
