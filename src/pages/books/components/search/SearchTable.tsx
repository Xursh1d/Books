import TableBody from '@mui/material/TableBody';
import { EmptyContent, Loader } from "../../../../components";
import { BookWithoutIdAndPages } from "../../../../types/booksTypes";
import Table from '@mui/material/Table';
import TableItems from './TableItems';
import TableHeading from './TableHead';

interface ISearchTableProps {
    books: BookWithoutIdAndPages[]
    isLoading: boolean
}

export default function SearchTable({ isLoading, books }: ISearchTableProps) {
    return (
        <Table>
            <TableHeading />
            <TableBody>
                {isLoading ? <Loader /> :
                    books.length ?
                        <TableItems books={books} />
                        : <EmptyContent />}
            </TableBody>
        </Table>
    )
}
