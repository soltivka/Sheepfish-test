import Table from 'react-bootstrap/Table';
import TableHeader from "./SfTableHeader";
import TableRows from "./SfTableRows";
import React, {useEffect, useState} from "react";
import SfPagination from "./SfPagination";


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
                                           rows,
                                           maxPage,
                                           onPageChanged
                                       }: SfTableProps<T, K>): JSX.Element => {
    const [page, setPage] = useState(0)
    const dataToView = (rows && data.length > rows) ? data.slice(page * rows, (page * rows) + rows) : data
    useEffect(() => {
        if (onPageChanged) {
            onPageChanged(page)
        }
    }, [page])

    return (
        <>
            <Table striped bordered hover variant="dark">
                <TableHeader columns={columns}/>
                <TableRows
                    data={dataToView}
                    columns={columns}
                />

            </Table>
            {rows ? <SfPagination page={page} setPage={setPage}
                                  maxPage={maxPage || Math.round(data.length / rows)}></SfPagination> : null}
        </>
    );
};

export default SfTable;