import { getGridNumberOperatorsValues } from "./getGridNumberOperators";
import {
    stringOperatorsValues,
    dateOperatorsValues,
} from "./stringAndDateOperators";
import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "../rootTypes/columnsTypes";

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
                    operatorsValues: getGridNumberOperatorsValues,
                };
            case "date":
                return { ...column, operatorsValues: dateOperatorsValues };
            default:
                return { ...column, operatorsValues: stringOperatorsValues };
        }
    });

    return processedColumns;
}
