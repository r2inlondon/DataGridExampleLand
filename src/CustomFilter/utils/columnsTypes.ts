export type DocumentsColumnsInt = {
    field: string;
    headerName: string;
    disableColumnMenu: boolean;
    type: string;
    width?: number;
    flex?: number;
    hide?: boolean;
};

export interface DocumentsColumnsWithOpValues extends DocumentsColumnsInt {
    operatorsValues: OperatorsBaseInt[];
}

export interface OperatorsBaseInt {
    [key: string]: string;
}

export interface StringOperatorsInt extends OperatorsBaseInt {}

export interface DateOperatorsInt extends OperatorsBaseInt {}

export interface NumberOperatorsInt extends OperatorsBaseInt {}
