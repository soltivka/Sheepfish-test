import Pagination from 'react-bootstrap/Pagination';

export interface SfPaginationProps {
    page: number,
    setPage: (n: number) => void
    maxPage: number,
}

function SfPagination(props: SfPaginationProps) {
    const {page, setPage, maxPage} = props
    return (
        <Pagination>
            <Pagination.First disabled={page === 0} onClick={() => setPage(0)}/>
            <Pagination.Prev disabled={page === 0} onClick={() => setPage(page - 1)}/>
            <Pagination.Item disabled={page - 1 < 0}
                             onClick={() => setPage(page - 1)}>{(page + 1) - 1}</Pagination.Item>
            <Pagination.Item active>{page + 1}</Pagination.Item>
            <Pagination.Item disabled={page + 1 >= maxPage}
                             onClick={() => setPage(page + 1)}>{(page + 1) + 1}</Pagination.Item>
            <Pagination.Next disabled={page + 1 >= maxPage} onClick={() => setPage(page + 1)}/>
            <Pagination.Last disabled={page >= maxPage} onClick={() => setPage(maxPage-1)}/>
        </Pagination>
    );
}

export default SfPagination;