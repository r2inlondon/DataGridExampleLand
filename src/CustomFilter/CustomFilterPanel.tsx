import React, { useEffect, useState } from "react";

import { StoredFilesType } from "../sampleData/storedFiles";
import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "../rootTypes/columnsTypes";
import { OperatorsBaseInt } from "../rootTypes/columnsTypes";
import { CachedFilterType } from "./FilterContainer";
import { addOperatorsToColumn } from "./addOperatorsToColumn";
import { runFilter } from "./runFilter";
import FilterForm from "./FilterForm";

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

            const results = runFilter(data, filterModel);
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
        <FilterForm
            handleClearFilter={handleClearFilter}
            columnsWithOperators={columnsWithOperators}
            columnsIndex={columnsIndex}
            handleSelectedColumn={handleSelectedColumn}
            operatorsForSelectMenu={operatorsForSelectMenu}
            operatorForLabelIndex={operatorForLabelIndex}
            isDate={isDate}
            handleSelectedOperator={handleSelectedOperator}
            filterValue={filterValue}
            handleFilterValue={handleFilterValue}
        />
    );
};

export default CustomFilterPanel;
