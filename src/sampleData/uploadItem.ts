import _, { sortBy } from "lodash";
import { StoredFilesType } from "./storedFiles";

export function uploadItem(items: StoredFilesType[]) {
    const sortedItems = _.sortBy(items, ["id"]);
    const lastItem = sortedItems.pop();
    const newId = lastItem ? lastItem.id + 1 : 1;
    const fileExtension = ["Word file", "Excel file", "PDF file"];

    const newItem = {
        id: newId,
        filename: `file${newId}`,
        filetype: fileExtension[_.random(0, 2)],
        size: _.random(100, 10000),
        created_at: new Date().toISOString(),
    };

    return newItem;
}
