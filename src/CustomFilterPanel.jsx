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

const useStyles = makeStyles((theme) => styles(theme));

const CustomFilterPanel = ({
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
}) => {
    const [isDate, setIsDate] = useState(false);
    const [columnDefault, setColumnDefault] = useState("");
    const [operatorDefault, setOperatorDefault] = useState("");
    const classes = useStyles();

    console.log(applicableOperators);

    useEffect(() => {
        selectedOperator === "is" ? setIsDate(true) : setIsDate(false);
    }, [selectedColumn]);

    useEffect(() => {
        const column = columns.find(
            (column) => column.field === selectedColumn
        );
        setColumnDefault(column.headerName);
    }, [selectedColumn]);

    useEffect(() => {
        const operator = applicableOperators.find(
            (operator) => operator.value === selectedOperator
        );
        setOperatorDefault(operator.label);
    }, [selectedOperator]);

    function handleSelectedColumn(columnName) {
        const column = columns.find(
            (column) => column.headerName === columnName
        );
        handleOperators(column);
        setSelectedColumn(column.field);
        setSelectedColumnType(column.type);
    }

    function handleSelectedOperator(operatorLabel) {
        const operator = applicableOperators.find(
            (operator) => operator.label === operatorLabel
        );
        setSelectedOperator(operator.value);
    }

    const columnsNamesOnly = columns.map((column) => ({
        headerName: column.headerName,
    }));

    const operatorNamesOnly = applicableOperators.map((operator) => ({
        label: operator.label,
    }));

    return (
        <div className={classes.container}>
            <IconButton onClick={onClear} size="small">
                <ClearIcon />
            </IconButton>
            <FormControl className={classes.inputs} variant="standard">
                <InputLabel id="column-select-label">Columns</InputLabel>
                <Select
                    labelId="column-select-label"
                    id="column-select"
                    value={columnDefault}
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
                    value={operatorDefault}
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
