import { GridColDef } from "@mui/x-data-grid";

export interface IDocColumns extends GridColDef {
    options?: any;
}

export interface DocumentsColumnsWithOpValues extends IDocColumns {
    operatorsValues: OperatorsBaseInt[];
}

export interface OperatorsBaseInt {
    [key: string]: string;
}

export interface StringOperatorsInt extends OperatorsBaseInt {}

export interface DateOperatorsInt extends OperatorsBaseInt {}

export interface NumberOperatorsInt extends OperatorsBaseInt {}
