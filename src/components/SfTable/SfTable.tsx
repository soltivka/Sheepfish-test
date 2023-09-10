import Table from 'react-bootstrap/Table';
import TableRows from "./SfTableRows";
import React, {ReactElement} from "react";


export type ColumnDefinitionType<T, K extends keyof T | string> = {
    key: K;
    header: string;
    onClick?: (e: React.SyntheticEvent) => void
    width?: number;
    content?: ReactElement
}

type SfTableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const SfTable = <T, K extends keyof T>({
                                           data,
                                           columns,
                                       }: SfTableProps<T, K>): ReactElement => {


    return (
        <>
            <Table striped bordered hover variant="dark">
                <TableRows
                    data={data}
                    columns={columns}
                />

            </Table>
        </>
    );
};

export default SfTable;