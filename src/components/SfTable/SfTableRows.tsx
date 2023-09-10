import {ColumnDefinitionType} from "./SfTable";
import {ReactElement, ReactNode} from "react";

type TableRowsProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const TableRows = <T, K extends keyof T>({data, columns}: TableRowsProps<T, K>): ReactElement | null => {
    const rows = data.map((row, index) => {
        return (
            <tr key={`row-${index}`}>
                {columns.map((column, index2) => {
                        return (
                            <td key={`cell-${index2}`}>
                                {column.content ? column.content : row[column.key] as ReactNode}
                            </td>
                        );
                    }
                )}
            </tr>
        );
    });

    return (
        <tbody>
        {rows}
        </tbody>
    );
};

export default TableRows;