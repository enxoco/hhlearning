import { IColumnHeadingProps } from "#/types";
import { Box } from "@chakra-ui/react";

export interface ITableProps {
    tableHeading: string;
    columnHeadings: IColumnHeadingProps[];
}
function renderColumn(element) {
    const wrapHOC = (WrappedComponent) => (props) => (
        <WrappedComponent {...props} />
    )
    const WrappedApp = wrapHOC(element);
    return WrappedApp
}

function CellRender(column: IColumnHeadingProps, row) {
    const rowKey = column.accessor || column.fieldName;
    if (column.element) {
        const RowComponent = renderColumn(column.element)
        return <RowComponent key={column.fieldName + "-" + row[rowKey]} {...row} />
    }
    return (
        <Box key={row[rowKey]} textAlign="left" alignItems="center">
            {row[rowKey]}
        </Box>
    )
}

const GridTemplateColumns = (columnHeadings: IColumnHeadingProps[]) => {
    const columns: string[] = [];
    for (let i = 0; i < columnHeadings.length; i++) {
        columns.push(`${Math.floor(100 / columnHeadings.length)}%`)
    }
    return columns.join(" ");
    
}
export { renderColumn, CellRender, GridTemplateColumns }