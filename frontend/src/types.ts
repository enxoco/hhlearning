import { ReactNode, Component } from "react";
import { User } from "./generated/graphql";

export interface IColumnHeadingProps {
    fieldName: string;
    disableSort?: boolean;
    element?: (data: any) => JSX.Element;
    accessor?: string;
}

export interface ITableRowProps {
    element?: ReactNode;
    accessor: string;
}