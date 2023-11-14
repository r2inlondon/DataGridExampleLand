import parse from "date-fns/parse";
import { GridFilterInputDate } from "@mui/x-data-grid";

export const getDateOperators = () => [
  {
    value: "is",
    label: "Is",
    getApplyFilterFn: (filterItem) => {
      console.log(filterItem);
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) === filterDate
          : false;
      };
    },
    InputComponent: GridFilterInputDate
  },
  {
    value: "not",
    label: "Not",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) !== filterDate
          : true;
      };
    },
    InputComponent: GridFilterInputDate
  },
  {
    value: "after",
    label: "After",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) > filterDate
          : false;
      };
    },
    InputComponent: GridFilterInputDate
  },
  {
    value: "onOrAfter",
    label: "On or after",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) >= filterDate
          : false;
      };
    },
    InputComponent: GridFilterInputDate
  },
  {
    value: "before",
    label: "Before",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) < filterDate
          : false;
      };
    },
    InputComponent: GridFilterInputDate
  },
  {
    value: "onOrBefore",
    label: "On or before",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) {
        return null;
      }
      const filterDate = parse(
        filterItem.value,
        "MM/dd/yyyy",
        new Date()
      ).setHours(0, 0, 0, 0);
      return ({ value }) => {
        return value
          ? new Date(value).setHours(0, 0, 0, 0) <= filterDate
          : false;
      };
    },
    InputComponent: GridFilterInputDate
  }
];
