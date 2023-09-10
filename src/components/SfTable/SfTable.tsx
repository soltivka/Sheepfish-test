import Table from 'react-bootstrap/Table';
import TableHeader from "./SfTableHeader";
import TableRows from "./SfTableRows";
import React from "react";


export type ColumnDefinitionType<T, K extends keyof T | string> = {
    key: K;
    header: string;
    onClick?: (e: React.SyntheticEvent) => void
    width?: number;
}

type SfTableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
    rows?: number;
    maxPage?: number;
    onPageChanged?: (page: number) => void
}

const SfTable = <T, K extends keyof T>({
                                           data,
                                           columns,
                                       }: SfTableProps<T, K>): JSX.Element => {


    return (
        <>
            <Table striped bordered hover variant="dark">
                <TableHeader columns={columns}/>
                <TableRows
                    data={data}
                    columns={columns}
                />

            </Table>
        </>
    );
};

export default SfTable;