import {ColumnDefinitionType} from "./SfTable";

type TableHeaderProps<T, K extends keyof T> = {
    columns: Array<ColumnDefinitionType<T, K>>;
}

const TableHeader = <T, K extends keyof T>({columns}: TableHeaderProps<T, K>): JSX.Element => {
    const headers = columns.map((column, index) => {
        const style = {
            width: column.width ?? 100,
            cursor: column.onClick?'pointer':''
        };

        return (
            <th
                key={`headCell-${index}`}
                style={style}
                onClick={column.onClick}
            >
                {column.header}
            </th>
        );
    });

    return (
        <thead>
        <tr>{headers}</tr>
        </thead>
    );
};

export default TableHeader;