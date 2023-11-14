import {
    getGridNumberOperators,
    stringOperators,
} from "./getGridNumberOperators";
import { getDateOperators } from "./getDateOperators";

export function initColumnsWithOperators(columns) {
    const processedColumns = columns.map((column) => {
        switch (column?.type) {
            case "number":
                return { ...column, filterOperators: getGridNumberOperators() };
            case "date":
                return { ...column };
            default:
                return column;
        }
    });

    return processedColumns;
}
