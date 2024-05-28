import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ListMenu } from "../../../../components";
import { IAllBooksData } from "../../../../types/booksTypes";

interface ITableItemsProps { books: IAllBooksData[] }

export default function TableItems({ books }: ITableItemsProps) {
    return (
        <>
            {books?.map((data: IAllBooksData, index: number) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="books">{index + 1}</TableCell>
                    <TableCell>{data.book.title}</TableCell>
                    <TableCell>{data.book.isbn}</TableCell>
                    <TableCell>{data.book.author}</TableCell>
                    <TableCell>{data.book.pages}</TableCell>
                    <TableCell>{data.book.published}</TableCell>
                    <TableCell>{
                        data.status == 0 ? <Chip label="New" size="small" /> :
                            data?.status == 1 ? <Chip color='primary' label="Reading" size="small" /> :
                                <Chip color='success' label="Finished" size="small" />
                    }</TableCell>
                    <TableCell>
                        <ListMenu book={data} />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
