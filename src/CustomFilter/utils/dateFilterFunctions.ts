import _, { lowerCase } from "lodash";

export interface DateFilterFunctionsInt {
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

export const dateFilterFunctions: DateFilterFunctionsInt[] = [
    {
        value: "is",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value).setHours(0, 0, 0, 0);
            return (value: Item) => {
                return value != null
                    ? new Date(value).setHours(0, 0, 0, 0) === targetDate
                    : false;
            };
        },
    },
    {
        value: "not",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value).setHours(0, 0, 0, 0);
            return (value: Item) => {
                return value != null
                    ? new Date(value).setHours(0, 0, 0, 0) !== targetDate
                    : true;
            };
        },
    },
    {
        value: "after",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value).setHours(0, 0, 0, 0);
            return (value: Item) => {
                return value != null
                    ? new Date(value).setHours(0, 0, 0, 0) > targetDate
                    : false;
            };
        },
    },
    {
        value: "onOrAfter",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value).setHours(0, 0, 0, 0);
            return (value: Item) => {
                return value != null
                    ? new Date(value).setHours(0, 0, 0, 0) >= targetDate
                    : false;
            };
        },
    },
    {
        value: "before",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value);
            return (value: Item) => {
                return value != null ? new Date(value) < targetDate : false;
            };
        },
    },
    {
        value: "onOrBefore",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            const targetDate = new Date(filterItem.value).setHours(0, 0, 0, 0);
            return (value: Item) => {
                return value != null
                    ? new Date(value).setHours(0, 0, 0, 0) <= targetDate
                    : false;
            };
        },
    },
];
