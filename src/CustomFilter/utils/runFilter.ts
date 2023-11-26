import { DocumentsColumnsWithOpValues } from "./columnsTypes";
import { StoredFilesType } from "../../sampleData/storedFiles";
import {
    stringFilterFunctions,
    StringFilterFunctionsInt,
} from "./stringFilterFunctions";
import {
    numberFilterFunctions,
    NumberFilterFunctionsInt,
} from "./numberFilterFunctions";
import {
    dateFilterFunctions,
    DateFilterFunctionsInt,
} from "./dateFilterFunctions";

type FilterModelType = {
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

type FilterFunctionsArrayType =
    | StringFilterFunctionsInt[]
    | NumberFilterFunctionsInt[]
    | DateFilterFunctionsInt[];

export function runFilter(
    data: StoredFilesType[],
    filterModel: FilterModelType
) {
    const { column, operator, value } = filterModel;

    const filterItem = { value };
    const columnField = column.field;
    const columnType = column.type;
    const filterFunctionObj = {
        string: stringFilterFunctions,
        number: numberFilterFunctions,
        date: dateFilterFunctions,
    };

    const filterFunctions: FilterFunctionsArrayType =
        filterFunctionObj[columnType as keyof typeof filterFunctionObj];

    let result: StoredFilesType[] = [];

    const filterOperator = filterFunctions.find((fnc) => fnc.value == operator);

    if (filterOperator) {
        const filterFunction = filterOperator.getApplyFilterFn(filterItem);

        if (filterFunction) {
            result = data.filter((item) =>
                //TODO: StoredFilesType will need to get renamed
                filterFunction(item[columnField as keyof StoredFilesType])
            );
        }
    }
    return result;
}
