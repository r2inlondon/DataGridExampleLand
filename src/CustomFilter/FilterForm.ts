import { DocumentsColumnsWithOpValues } from "../rootTypes/columnsTypes";
import { StoredFilesType } from "../sampleData/storedFiles";
import { stringFilterFunctions } from "./stringFilterFunctions";

type filterFormProps = {
    items: StoredFilesType[];
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

export function filterForm({
    items,
    column,
    operator,
    value,
}: filterFormProps) {
    const filterItem = { value };
    const columnField = column.field;

    const filterOperator = stringFilterFunctions.find(
        (fnc) => fnc.value == operator
    );

    if (filterOperator) {
        const filterFunction = filterOperator.getApplyFilterFn(filterItem);

        if (filterFunction) {
            const result = items.filter((item) =>
                //TODO: string need to get removed when working on the numberi Col
                filterFunction(
                    String(item[columnField as keyof StoredFilesType])
                )
            );
            console.log(result);
        }
    }
}
