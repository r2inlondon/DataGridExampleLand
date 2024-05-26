import React, { useState, useEffect } from "react";

import {
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClearIcon from "@material-ui/icons/Clear";

import {
    DocumentsColumnsWithOpValues,
    OperatorsBaseInt,
} from "./utils/columnsTypes";

type ComponentProps = {
    handleClearFilter: () => void;
    columnsIndex: number;
    columnForLabel: string;
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
    const [optionsSelect, setOptionsSelect] = useState<string[] | undefined>();
    const {
        handleClearFilter,
        columnsIndex,
        columnForLabel,
        columnsWithOperators,
        handleSelectedColumn,
        operatorsForSelectMenu,
        operatorForLabelIndex,
        isDate,
        handleSelectedOperator,
        filterValue,
        handleFilterValue,
    } = props;

    useEffect(() => {
        const columnOptions = columnsWithOperators.filter(
            (column) => column.headerName === columnForLabel
        );

        // extracting the options from the type column which are for the AutoComplete
        setOptionsSelect(
            columnOptions[0]?.options ? columnOptions[0]?.options : undefined
        );
    }, [columnForLabel]);

    const textfieldNoAuto = (
        <TextField
            id="filter-value-input"
            label={isDate ? " " : "Value"}
            type={isDate ? "date" : "text"}
            inputProps={{
                autoComplete: "off",
            }}
            value={filterValue}
            onChange={(e: any) => handleFilterValue(e.target.value)}
            classes={{ root: classes.inputs }}
            style={{ flexGrow: 1 }}
        />
    );

    const textfieldAuto = (
        <Autocomplete
            freeSolo
            clearOnBlur
            clearOnEscape
            disableClearable
            onInputChange={(event, value) => handleFilterValue(value)}
            value={filterValue}
            options={optionsSelect || []}
            renderInput={(params) => (
                <TextField
                    {...params}
                    color="secondary"
                    fullWidth={true}
                    id="filter-value-input"
                    label="Enter Value"
                    classes={{ root: classes.autoTextfield }}
                />
            )}
        />
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
            {/* <TextField
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
            /> */}
            {optionsSelect && optionsSelect.length > 1
                ? textfieldAuto
                : textfieldNoAuto}
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
    autoTextfield: {
        width: 150,
    },
    "&. MuiInputBase-root": {
        "&:after": {
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
    },
});
