import _, { lowerCase } from "lodash";
import { stringOperatorsValues } from "./stringAndDateOperators";

interface StringFilterFunctionsInt {
    value: string;
    getApplyFilterFn: (filterItem: FilterItem) => (value: Item) => boolean;
}

type FilterItem = {
    value: string;
};

type Item = string;

export const stringFilterFunctions = [
    {
        value: "contains",
        getApplyFilterFn: (filterItem: FilterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                return value != null ? value.includes(filterItem.value) : false;
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
                return value != null
                    ? _.lowerCase(value) === lowerCase(filterItem.value)
                    : false;
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
                const lowerCaseValue = value !== null ? lowerCase(value) : "";

                return value != null
                    ? lowerCaseValue.startsWith(lowerCase(filterItem.value))
                    : false;
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
                const lowerCaseValue = value !== null ? lowerCase(value) : "";

                return value != null
                    ? lowerCaseValue.endsWith(lowerCase(filterItem.value))
                    : false;
            };
        },
    },
    {
        value: "isEmpty",
        getApplyFilterFn: () => {
            return (value: Item) => {
                return value === undefined || value === null || value === "";
            };
        },
    },
    {
        value: "isNotEmpty",
        getApplyFilterFn: () => {
            return (value: Item) => {
                return value !== undefined && value !== null && value !== "";
            };
        },
    },
];
