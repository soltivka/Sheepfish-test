import Table from 'react-bootstrap/Table';
import TableHeader from "./SfTableHeader";
import TableRows from "./SfTableRows";
import React from "react";


export type ColumnDefinitionType<T, K extends keyof T | string> = {
    key: K;
    header: string;
    onClick?:(e:React.SyntheticEvent)=>void
    width?: number;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const SfTable = <T, K extends keyof T>({data, columns}: TableProps<T, K>): JSX.Element => {
    return (
        <Table striped bordered hover variant="dark">
            <TableHeader columns={columns}/>
            <TableRows
                data={data}
                columns={columns}
            />
        </Table>
    );
};

export default SfTable;