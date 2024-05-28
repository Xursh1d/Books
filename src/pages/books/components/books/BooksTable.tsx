import TableBody from '@mui/material/TableBody';
import { IAllBooksData } from "../../../../types/booksTypes";
import { EmptyContent, Loader } from "../../../../components";
import TableHeading from "./TableHead";
import Table from '@mui/material/Table';
import TableItems from "./TableItems";

interface IBooksTableProps {
    books: IAllBooksData[]
    isLoading: boolean
}
export default function BooksTable({ books, isLoading }: IBooksTableProps) {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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