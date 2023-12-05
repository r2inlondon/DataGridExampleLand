import React from "react";

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

import {
    DocumentsColumnsWithOpValues,
    OperatorsBaseInt,
} from "./utils/columnsTypes";

type ComponentProps = {
    handleClearFilter: () => void;
    columnsIndex: number;
    columnsWithOperators: DocumentsColumnsWithOpValues[];
    handleSelectedColumn: (value: string) => void;
    operatorsForSelectMenu: OperatorsBaseInt[];
    operatorForLabelIndex: number;
    isDate: boolean;
    handleSelectedOperator: (value: string) => void;
    filterValue: string;
    handleFilterValue: (value: string) => void;
};

const useStyles = makeStyles((theme) => styles(theme));

function FilterForm(props: ComponentProps) {
    const classes = useStyles();
    const {
        handleClearFilter,
        columnsIndex,
        columnsWithOperators,
        handleSelectedColumn,
        operatorsForSelectMenu,
        operatorForLabelIndex,
        isDate,
        handleSelectedOperator,
        filterValue,
        handleFilterValue,
    } = props;

    return (
        <div className={classes.container}>
            <IconButton
                data-test="clear-filter-button"
                onClick={handleClearFilter}
                size="small"
            >
                <ClearIcon />
            </IconButton>
            <FormControl className={classes.inputs} variant="standard">
                <InputLabel id="column-select-label">Columns</InputLabel>
                <Select
                    data-test="form-column"
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
                        data-test="form-operator"
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
                data-test="form-input"
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
}

export default FilterForm;

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
