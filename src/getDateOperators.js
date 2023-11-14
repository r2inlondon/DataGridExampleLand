import parse from "date-fns/parse";
import { GridFilterInputDate } from "@mui/x-data-grid";

export const getDateOperators = () => [
    {
        value: "is",
        label: "Is",
    },
    {
        value: "not",
        label: "Not",
    },
    {
        value: "after",
        label: "After",
    },
    {
        value: "onOrAfter",
        label: "On or after",
    },
    {
        value: "before",
        label: "Before",
    },
    {
        value: "onOrBefore",
        label: "On or before",
    },
];
