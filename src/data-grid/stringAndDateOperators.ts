export const dateOperators = () => [
    { value: "is", label: "Is" },
    { value: "not", label: "Not" },
    { value: "after", label: "After" },
    { value: "onOrAfter", label: "On or after" },
    { value: "before", label: "Before" },
    { value: "onOrBefore", label: "On or before" },
];
export const stringOperators = () => [
    {
        label: "Contains",
        value: "contains",
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
    { label: "Equals", value: "equals" },
    { label: "Starts with", value: "startsWith" },
    { label: "Ends with", value: "endsWith" },
    { label: "Is empty", value: "isEmpty" },
    { label: "Is not empty", value: "isNotEmpty" },
];
