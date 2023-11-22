export const numberFilterFunctions = [
    {
        value: "notEquals",
        label: "Not equals",
        // getApplyFilterFn: (filterItem) => {
        //     if (filterItem.value === undefined) {
        //         return null;
        //     }
        //     return ({ value }) => {
        //         return value != null
        //             ? Number(value) !== Number(filterItem.value)
        //             : true;
        //     };
        // },
    },
    {
        value: "equals",
        label: "Equals",
        // getApplyFilterFn: (filterItem) => {
        //     if (filterItem.value === undefined) {
        //         return null;
        //     }
        //     return ({ value }) => {
        //         return value != null
        //             ? Number(value) === Number(filterItem.value)
        //             : false;
        //     };
        // },
    },
    {
        value: "greaterThan",
        label: "Greater than",
        // getApplyFilterFn: (filterItem) => {
        //     if (filterItem.value === undefined) {
        //         return null;
        //     }
        //     return ({ value }) => {
        //         return value != null
        //             ? Number(value) > Number(filterItem.value)
        //             : false;
        //     };
        // },
    },
    {
        value: "lessThan",
        label: "Less than",
        // getApplyFilterFn: (filterItem) => {
        //     if (filterItem.value === undefined) {
        //         return null;
        //     }
        //     return ({ value }) => {
        //         return value != null
        //             ? Number(value) < Number(filterItem.value)
        //             : false;
        //     };
        // },
    },
    // ... more operators like lessThan, greaterThanOrEqual, lessThanOrEqual
    {
        value: "isEmpty",
        label: "Is empty",
        // getApplyFilterFn: () => {
        //     return ({ value }) => {
        //         return value === undefined || value === null || value === "";
        //     };
        // },

        // requiresFilterValue: false,
    },
    {
        value: "isNotEmpty",
        label: "Is not empty",
        // getApplyFilterFn: () => {
        //     return ({ value }) => {
        //         return value !== undefined && value !== null && value !== "";
        //     };
        // },

        // requiresFilterValue: false,
    },
    // Add more custom number operators as needed
];
