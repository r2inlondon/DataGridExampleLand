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

import { addOperatorsToColumn } from "../data-grid/addOperatorsToColumn";

const useStyles = makeStyles((theme) => styles(theme));

const CustomFilterPanel = (props) => {
    const {
        data,
        columns,
        baseColumn,
        onClear,
        // handleOperators,
    } = props;

    const [isDate, setIsDate] = useState(false);
    const [resetFilter, setResetFilter] = useState(true);
    const [columnsWithOperators, setColumnsWithOperators] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState("");
    const [selectedOperator, setSelectedOperator] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [operatorsForSelectMenu, setOperatorsForSelectMenu] = useState([]);
    const [operatorForLabel, setOperatorForLabel] = useState("");
    const [columnForLabel, setColumnForLabel] = useState("");
    const classes = useStyles();

    useEffect(() => {
        if (resetFilter) {
            setFilterValue("");
            const newColumns = addOperatorsToColumn(columns);
            setColumnsWithOperators(newColumns);

            const baseColumWithOperators = newColumns.filter(
                (column) => column.field === baseColumn.field
            );

            setSelectedColumn(baseColumWithOperators[0]);
            setOperatorsForSelectMenu(
                baseColumWithOperators[0].filterOperators
            );
            setSelectedOperator(
                baseColumWithOperators[0].filterOperators[0].value
            );
            setResetFilter(false);
            console.log("RESET FILTER !!");
        }
    }, [resetFilter]);

    useEffect(() => {
        if (columnsWithOperators.length > 0) {
            const operators = columnsWithOperators.find(
                (column) => column.field === selectedColumn.field
            ).filterOperators;
            setSelectedOperator(operators[0].value);
            setOperatorsForSelectMenu(operators);
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (selectedColumn) {
            const column = columnsWithOperators.find(
                (column) => column.field === selectedColumn.field
            );
            setColumnForLabel(column.headerName);
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (operatorsForSelectMenu.length > 0) {
            const operator = operatorsForSelectMenu.find(
                (operator) => operator.value === selectedOperator
            );
            selectedOperator === "is" ? setIsDate(true) : setIsDate(false);

            setOperatorForLabel(operator.label);
        }
    }, [operatorsForSelectMenu, selectedOperator]);

    function handleClearFilter() {
        setResetFilter(true);

        // TODO: reset filtered data
        // onClear()
    }

    function handleSelectedColumn(columnName) {
        const column = columnsWithOperators.find(
            (column) => column.headerName === columnName
        );
        setFilterValue("");
        setSelectedColumn(column);
    }

    function handleSelectedOperator(operatorLabel) {
        const operator = operatorsForSelectMenu.find(
            (operator) => operator.label === operatorLabel
        );
        setSelectedOperator(operator.value);
    }

    const columnsNamesOnly = [...columnsWithOperators];
    const columnsIndex = columnsNamesOnly.findIndex(
        (obj) => obj.headerName === columnForLabel
    );

    const operatorNamesOnly = [...operatorsForSelectMenu];
    const operatorIndex = operatorNamesOnly.findIndex(
        (obj) => obj.label === operatorForLabel
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
                            ? columnsNamesOnly[columnsIndex].headerName
                            : ""
                    }
                    onChange={(e) => handleSelectedColumn(e.target.value)}
                    label="Columns"
                >
                    {columnsNamesOnly.map((column, index) => (
                        <MenuItem key={index} value={column.headerName}>
                            {column.headerName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.inputs} variant="standard">
                <InputLabel id="operator-select-label">Operators</InputLabel>
                <Select
                    labelId="operator-select-label"
                    id="operator-select"
                    value={
                        operatorIndex !== -1
                            ? operatorNamesOnly[operatorIndex].label
                            : ""
                    }
                    onChange={(e) => handleSelectedOperator(e.target.value)}
                    label="Operators"
                >
                    {operatorNamesOnly.map((operator, index) => (
                        <MenuItem key={index} value={operator.label}>
                            {operator.label}
                        </MenuItem>
                    ))}
                </Select>
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

const styles = (theme) => ({
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
