import { DocumentsColumnsWithOpValues } from "../rootTypes/columnsTypes";
import { StoredFilesType } from "../sampleData/storedFiles";
import { stringFilterFunctions } from "./stringFilterFunctions";

type filterModelType = {
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

export function filterForm(
    data: StoredFilesType[],
    filterModel: filterModelType
) {
    // if (!data) return;

    const { column, operator, value } = filterModel;

    const filterItem = { value };
    const columnField = column.field;
    let result: StoredFilesType[] = [];

    const filterOperator = stringFilterFunctions.find(
        (fnc) => fnc.value == operator
    );

    if (filterOperator) {
        const filterFunction = filterOperator.getApplyFilterFn(filterItem);

        if (filterFunction) {
            result = data.filter((item) =>
                //TODO: string need to get removed when working on the numberic Col
                filterFunction(
                    String(item[columnField as keyof StoredFilesType])
                )
            );
        }
    }
    return result;
}
