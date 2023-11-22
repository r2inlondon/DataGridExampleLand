import _, { lowerCase } from "lodash";

interface StringFilterFunctionsInt {
    value: string;
    getApplyFilterFn: (
        filterItem: FilterItem
    ) => ((value: number | string) => boolean | null) | null;
    requiresFilterValue?: boolean;
}

type FilterItem = {
    value: number | string;
};

type Item = string | number;

export const stringFilterFunctions: StringFilterFunctionsInt[] = [
    {
        value: "contains",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                if (
                    typeof value !== "string" ||
                    typeof filterItem.value !== "string"
                ) {
                    return null;
                }

                const userInput = _.lowerCase(filterItem.value);
                const itemValue = _.lowerCase(value);

                return value != null ? itemValue.includes(userInput) : false;
            };
        },
    },
    {
        value: "equals",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                if (
                    typeof value !== "string" ||
                    typeof filterItem.value !== "string"
                ) {
                    return null;
                }
                const userInput = _.lowerCase(filterItem.value);
                const itemValue = _.lowerCase(value);
                return value != null ? itemValue === userInput : false;
            };
        },
    },
    {
        value: "startsWith",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                if (
                    typeof value !== "string" ||
                    typeof filterItem.value !== "string"
                ) {
                    return null;
                }
                const userInput = _.lowerCase(filterItem.value);
                const itemValue = _.lowerCase(value);

                return value != null ? itemValue.startsWith(userInput) : false;
            };
        },
    },
    {
        value: "endsWith",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                if (
                    typeof value !== "string" ||
                    typeof filterItem.value !== "string"
                ) {
                    return null;
                }
                const userInput = _.lowerCase(filterItem.value);
                const itemValue = _.lowerCase(value);

                return value != null ? itemValue.endsWith(userInput) : false;
            };
        },
    },
    {
        value: "isEmpty",
        getApplyFilterFn: (filterItem: FilterItem) => {
            return (value: Item) => {
                return value === undefined || value === null || value === "";
            };
        },
        requiresFilterValue: false,
    },
    {
        value: "isNotEmpty",
        getApplyFilterFn: (filterItem: FilterItem) => {
            return (value: Item) => {
                return value !== undefined && value !== null && value !== "";
            };
        },
        requiresFilterValue: false,
    },
];
