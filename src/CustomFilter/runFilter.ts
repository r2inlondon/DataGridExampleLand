import { DocumentsColumnsWithOpValues } from "../rootTypes/columnsTypes";
import { StoredFilesType } from "../sampleData/storedFiles";
import { stringFilterFunctions } from "./stringFilterFunctions";
import { numberFilterFunctions } from "./numberFilterFunctions";

type FilterModelType = {
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

export function runFilter(
    data: StoredFilesType[],
    filterModel: FilterModelType
) {
    // if (!data) return;

    const { column, operator, value } = filterModel;

    const filterItem = { value };
    const columnField = column.field;
    const columnType = column.type;
    const filterFunctions =
        columnType === "string" ? stringFilterFunctions : numberFilterFunctions;

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
