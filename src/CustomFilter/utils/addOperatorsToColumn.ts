import { GridColDef } from "@mui/x-data-grid";

import {
    stringOperatorsValues,
    dateOperatorsValues,
    numberOperatorsValues,
} from "./operatorsValues";

import { DocumentsColumnsWithOpValues } from "./columnsTypes";

export function addOperatorsToColumn(
    columns: GridColDef[]
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
