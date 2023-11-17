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
    const [columnsWithOperators, setColumnsWithOperators] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState(baseColumn.field);
    const [selectedOperator, setSelectedOperator] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [applicableOperators, setApplicableOperators] = useState([]);
    const [columnDefault, setColumnDefault] = useState("");
    const [defaultOperatorForDropDownMenu, setDefaultOperatorForDropDownMenu] =
        useState("");
    const [indexOperatorSelector, setIndexOperatorSelector] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        const newColumns = addOperatorsToColumn(columns);
        setColumnsWithOperators(newColumns);

        const baseColumnOperators = newColumns.find(
            (column) => column.field === baseColumn.field
        ).filterOperators;

        setApplicableOperators(baseColumnOperators);
        setSelectedOperator(baseColumnOperators[0].value);
    }, []);

    useEffect(() => {
        // selectedOperator === "is" ? setIsDate(true) : setIsDate(false);
        if (columnsWithOperators.length > 0) {
            console.log({ selectedColumn });

            const operators = columnsWithOperators.find(
                (column) => column.field === selectedColumn
            ).filterOperators;
            console.log(operators);

            setSelectedOperator(operators[0].value);
            setApplicableOperators(operators);
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (selectedColumn) {
            console.log({ selectedColumn });
            const column = columns.find(
                (column) => column.field === selectedColumn
            );
            setColumnDefault(column.headerName);
        }
    }, [selectedColumn]);

    useEffect(() => {
        if (applicableOperators.length > 0) {
            console.log(applicableOperators);
            console.log(selectedOperator);
            const operator = applicableOperators.find(
                (operator) => operator.value === selectedOperator
            );
            console.log({ operator });
            setDefaultOperatorForDropDownMenu(operator.label);
        }
    }, [applicableOperators]);

    useEffect(() => {
        if (defaultOperatorForDropDownMenu) {
            const indexLabel = applicableOperators.findIndex(
                (obj) => obj.label === defaultOperatorForDropDownMenu
            );

            console.log({ indexLabel });
            setIndexOperatorSelector(indexLabel);
            console.log(applicableOperators[indexLabel].label);
        }
    }, [defaultOperatorForDropDownMenu]);

    function handleSelectedColumn(columnName) {
        console.log({ columnName });
        const column = columns.find(
            (column) => column.headerName === columnName
        );
        // handleOperators(column);
        setSelectedColumn(column.field);
        // setSelectedColumnType(column.type);
    }

    function handleSelectedOperator(operatorLabel) {
        console.log({ operatorLabel });
        const operator = applicableOperators.find(
            (operator) => operator.label === operatorLabel
        );
        setSelectedOperator(operator.value);
    }

    // const columnsNamesOnly = columnsWithOperators.map((column) => ({
    //     headerName: column.headerName,
    // }));

    const operatorNamesOnly = [...applicableOperators];

    const indexLabel = operatorNamesOnly.findIndex(
        (obj) => obj.label === defaultOperatorForDropDownMenu
    );

    // const indexLabel = operatorNamesOnly.findIndex(
    //     (obj) => obj.label === selectedOperator
    // );

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
                    {columnsWithOperators.map((column, index) => (
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
                        indexLabel !== -1
                            ? operatorNamesOnly[indexLabel].label
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
