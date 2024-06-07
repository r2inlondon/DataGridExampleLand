import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";

import {
    IconButton,
    Button,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

interface ICommonFileExt {
    value: string;
    label: string;
}

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
    handlePopoverClose: () => void;
};

const useStyles = makeStyles((theme) => styles(theme));

function FilterFormDeed(props: ComponentProps) {
    const classes = useStyles();
    const [optionsSelect, setOptionsSelect] = useState<
        ICommonFileExt[] | undefined
    >(undefined);
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
        handlePopoverClose,
    } = props;

    useEffect(() => {
        const columnOptions = columnsWithOperators.filter(
            (column) => column.headerName === columnForLabel
        );

        // extracting the options from the type column which are for the AutoComplete
        setOptionsSelect(columnOptions[0]?.options);
    }, [columnForLabel]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        handleFilterValue(event.target.value as string);
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography>Filter</Typography>
                <IconButton onClick={handlePopoverClose} size="small">
                    <ClearIcon />
                </IconButton>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.body}>
                <Typography>Document Type</Typography>
                <FormControl variant="filled">
                    <InputLabel id="demo-simple-select-filled-label">
                        Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={filterValue}
                        onChange={handleChange}
                    >
                        {optionsSelect &&
                            optionsSelect.map((option) => (
                                <MenuItem
                                    key={uniqueId("deed-option-")}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.footer}>
                <Button
                    className={classes.footerButton}
                    variant="outlined"
                    onClick={handleClearFilter}
                >
                    Clear Filter
                </Button>
            </div>
        </div>
    );
}

export default FilterFormDeed;

const styles = (theme: any) => ({
    container: {
        // display: "flex",
        // alignItems: "center",
        // padding: 15,
        // "& > .MuiFormControl-root": {
        //     width: "150px",
        // },
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
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        padding: "0 20px",
    },
    body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        width: 400,
        "& > .MuiFormControl-root": {
            width: "250px",
        },
    },
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        padding: "0 20px",
    },
    footerButton: {
        width: "100%",
    },
    divider: {
        margin: "10px 0",
    },
});
