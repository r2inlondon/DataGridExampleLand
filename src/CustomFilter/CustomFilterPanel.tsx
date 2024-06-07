import React, { useEffect, useState } from "react";

import { GridColDef } from "@mui/x-data-grid";

import { StoredFilesType } from "../sampleData/storedFiles";
import { DocumentsColumnsWithOpValues } from "./utils/columnsTypes";
import { OperatorsBaseInt } from "./utils/columnsTypes";
import { CachedFilterType } from "./FilterContainer";
import { addOperatorsToColumn } from "./utils/addOperatorsToColumn";
import { runFilter } from "./utils/runFilter";
import FilterForm from "./FilterForm";
import FilterFormDeed from "./FilterFormDeed";

type CustomFilterPanelProps = {
    data: StoredFilesType[];
    columns: GridColDef[];
    baseColumn: GridColDef;
    filteredItems: StoredFilesType[];
    setFilteredItems: (items: StoredFilesType[]) => void;
    setIsFilterOn: (isFilterOn: boolean) => void;
    isFilterOn: boolean;
    cachedFilter: CachedFilterType | undefined;
    setCachedFilter: (filter: CachedFilterType | undefined) => void;
    handlePopoverClose: () => void;
    titleDeedFilter: boolean;
};

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
        handlePopoverClose,
        titleDeedFilter,
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

    function setFilterUp(
        initColumn: DocumentsColumnsWithOpValues | GridColDef,
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
    }

    useEffect(() => {
        if (resetFilter) {
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
        if (selectedColumn) {
            const foundColumn = columnsWithOperators.find(
                (column) => column.field === selectedColumn.field
            );

            if (foundColumn?.headerName)
                setColumnForLabel(foundColumn.headerName);
        }
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

    useEffect(() => {
        if (selectedColumn !== undefined) {
            const filterModel = {
                column: selectedColumn,
                operator: selectedOperator,
                value: filterValue,
            };

            setCachedFilter(filterModel);

            const results = runFilter(data, filterModel);
            setFilteredItems(results);
        }
    }, [selectedOperator, filterValue]);

    function handleClearFilter() {
        setIsFilterOn(false);
        setResetFilter(true);
    }

    function handleSelectedColumn(columnName: string) {
        console.log("columnName", columnName);
        const column = columnsWithOperators.find(
            (column) => column.headerName === columnName
        );
        setFilterValue("");
        setCachedFilter(undefined);
        setSelectedColumn(column);
    }

    function handleSelectedOperator(operatorLabel: string) {
        console.log("operatorLabel", operatorLabel);
        if (operatorsForSelectMenu) {
            const operator = operatorsForSelectMenu.find(
                (operator) => operator.label === operatorLabel
            );

            if (operator) setSelectedOperator(operator.value);
        }
    }

    function handleFilterValue(userInput: string) {
        setFilterValue(userInput);
    }

    const columnsIndex = columnsWithOperators.findIndex(
        (obj) => obj.headerName === columnForLabel
    );

    return (
        <>
            {titleDeedFilter ? (
                <FilterFormDeed
                    handleClearFilter={handleClearFilter}
                    columnsWithOperators={columnsWithOperators}
                    columnsIndex={columnsIndex}
                    columnForLabel={columnForLabel}
                    handleSelectedColumn={handleSelectedColumn}
                    operatorsForSelectMenu={operatorsForSelectMenu}
                    operatorForLabelIndex={operatorForLabelIndex}
                    isDate={isDate}
                    handleSelectedOperator={handleSelectedOperator}
                    filterValue={filterValue}
                    handleFilterValue={handleFilterValue}
                    handlePopoverClose={handlePopoverClose}
                />
            ) : (
                <FilterForm
                    handleClearFilter={handleClearFilter}
                    columnsWithOperators={columnsWithOperators}
                    columnsIndex={columnsIndex}
                    columnForLabel={columnForLabel}
                    handleSelectedColumn={handleSelectedColumn}
                    operatorsForSelectMenu={operatorsForSelectMenu}
                    operatorForLabelIndex={operatorForLabelIndex}
                    isDate={isDate}
                    handleSelectedOperator={handleSelectedOperator}
                    filterValue={filterValue}
                    handleFilterValue={handleFilterValue}
                />
            )}
        </>
    );
};

export default CustomFilterPanel;
