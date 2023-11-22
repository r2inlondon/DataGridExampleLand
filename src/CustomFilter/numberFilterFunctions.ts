interface numberFilterFunctionsInt {
    value: string;
    getApplyFilterFn: (
        newItem: FilterItemNumber
    ) => ((value: number | string) => boolean | null) | null;
    requiresFilterValue?: boolean;
}

type FilterItemNumber = {
    value: number | string;
};

type Item = number | string;

export const numberFilterFunctions: numberFilterFunctionsInt[] = [
    {
        value: "notEquals",
        getApplyFilterFn: (filterItem: FilterItemNumber) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                const userInput =
                    typeof filterItem.value === "string"
                        ? Number(filterItem.value.replace(/,/g, ""))
                        : filterItem.value;

                return value != null
                    ? Number(value) !== Number(userInput)
                    : true;
            };
        },
    },
    {
        value: "equals",
        getApplyFilterFn: (filterItem: FilterItemNumber) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                const userInput =
                    typeof filterItem.value === "string"
                        ? Number(filterItem.value.replace(/,/g, ""))
                        : filterItem.value;

                return value != null
                    ? Number(value) === Number(userInput)
                    : false;
            };
        },
    },
    {
        value: "greaterThan",
        getApplyFilterFn: (filterItem: FilterItemNumber) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                const userInput =
                    typeof filterItem.value === "string"
                        ? Number(filterItem.value.replace(/,/g, ""))
                        : filterItem.value;

                return value != null
                    ? Number(value) > Number(userInput)
                    : false;
            };
        },
    },
    {
        value: "lessThan",
        getApplyFilterFn: (filterItem: FilterItemNumber) => {
            if (filterItem.value === undefined) {
                return null;
            }
            return (value: Item) => {
                const userInput =
                    typeof filterItem.value === "string"
                        ? Number(filterItem.value.replace(/,/g, ""))
                        : filterItem.value;

                return value != null
                    ? Number(value) < Number(userInput)
                    : false;
            };
        },
    },
    // // ... more operators like lessThan, greaterThanOrEqual, lessThanOrEqual
    // {
    //     value: "isEmpty",
    //     getApplyFilterFn: () => {
    //         return ({ value }) => {
    //             return value === undefined || value === null || value === "";
    //         };
    //     },

    //     requiresFilterValue: false,
    // },
    // {
    //     value: "isNotEmpty",
    //     getApplyFilterFn: () => {
    //         return ({ value }) => {
    //             return value !== undefined && value !== null && value !== "";
    //         };
    //     },

    //     requiresFilterValue: false,
    // },
    // Add more custom number operators as needed
];
