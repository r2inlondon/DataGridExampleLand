import { getGridNumberOperators } from "./getGridNumberOperators";
import { stringOperators, dateOperators } from "./stringAndDateOperators";

export function addOperatorsToColumn(columns) {
    const onlyVisibleColumns = columns.filter(
        (column) => column?.hide !== true
    );

    const processedColumns = onlyVisibleColumns.map((column) => {
        switch (column?.type) {
            case "number":
                return { ...column, filterOperators: getGridNumberOperators() };
            case "date":
                return { ...column, filterOperators: dateOperators() };
            default:
                return { ...column, filterOperators: stringOperators() };
        }
    });

    return processedColumns;
}
