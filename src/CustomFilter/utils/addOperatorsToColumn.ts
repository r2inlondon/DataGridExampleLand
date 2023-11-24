import {
    stringOperatorsValues,
    dateOperatorsValues,
    numberOperatorsValues,
} from "./operatorsValues";

import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "../../rootTypes/columnsTypes";

export function addOperatorsToColumn(
    columns: DocumentsColumnsInt[]
): DocumentsColumnsWithOpValues[] {
    const onlyVisibleColumns = columns.filter(
        (column) => column?.hide !== true
    );

    const processedColumns = onlyVisibleColumns.map((column) => {
        switch (column?.type) {
            case "number":
                return {
                    ...column,
                    operatorsValues: numberOperatorsValues,
                };
            case "date":
                return { ...column, operatorsValues: dateOperatorsValues };
            default:
                return { ...column, operatorsValues: stringOperatorsValues };
        }
    });

    return processedColumns;
}
