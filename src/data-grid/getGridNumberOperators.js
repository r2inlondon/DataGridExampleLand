import { GridFilterInputValue } from "@mui/x-data-grid";

export const getGridNumberOperators = () => [
    {
        value: "notEquals",
        label: "Not equals",
        getApplyFilterFn: (filterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return ({ value }) => {
                return value != null
                    ? Number(value) !== Number(filterItem.value)
                    : true;
            };
        },
        InputComponent: GridFilterInputValue,
    },
    {
        value: "equals",
        label: "Equals",
        getApplyFilterFn: (filterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return ({ value }) => {
                return value != null
                    ? Number(value) === Number(filterItem.value)
                    : false;
            };
        },
        InputComponent: GridFilterInputValue,
    },
    {
        value: "greaterThan",
        label: "Greater than",
        getApplyFilterFn: (filterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return ({ value }) => {
                return value != null
                    ? Number(value) > Number(filterItem.value)
                    : false;
            };
        },
        InputComponent: GridFilterInputValue,
    },
    {
        value: "lessThan",
        label: "Less than",
        getApplyFilterFn: (filterItem) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return ({ value }) => {
                return value != null
                    ? Number(value) < Number(filterItem.value)
                    : false;
            };
        },
        InputComponent: GridFilterInputValue,
    },
    // ... more operators like lessThan, greaterThanOrEqual, lessThanOrEqual
    {
        value: "isEmpty",
        label: "Is empty",
        getApplyFilterFn: () => {
            return ({ value }) => {
                return value === undefined || value === null || value === "";
            };
        },
        InputComponent: GridFilterInputValue,
        requiresFilterValue: false,
    },
    {
        value: "isNotEmpty",
        label: "Is not empty",
        getApplyFilterFn: () => {
            return ({ value }) => {
                return value !== undefined && value !== null && value !== "";
            };
        },
        InputComponent: GridFilterInputValue,
        requiresFilterValue: false,
    },
    // Add more custom number operators as needed
];
