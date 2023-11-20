export type DocumentsColumnsType = {
    field: string;
    headerName: string;
    disableColumnMenu: Boolean;
    type: string;
    width?: number;
    flex?: number;
    hide?: Boolean;
    filterOperators?:
        | DateOperatorsInt[]
        | NumberOperatorsInt[]
        | StringOperatorsInt[];
};

interface OperatorsBase {
    label: string;
    value: string;
}

export interface StringOperatorsInt extends OperatorsBase {}

export interface DateOperatorsInt extends OperatorsBase {}

export interface NumberOperatorsInt extends OperatorsBase {}
