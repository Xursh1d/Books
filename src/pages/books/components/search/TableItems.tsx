import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { BookWithoutIdAndPages } from "../../../../types/booksTypes";

interface ITableItemsProps { books: BookWithoutIdAndPages[] }

export default function TableItems({ books }: ITableItemsProps) {
    return (
        <>
            {books?.map((data: BookWithoutIdAndPages, index: number) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="books">{index + 1}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.isbn}</TableCell>
                    <TableCell>{data.author}</TableCell>
                    <TableCell>{data.published}</TableCell>
                </TableRow>
            ))}
        </>
    )
}
