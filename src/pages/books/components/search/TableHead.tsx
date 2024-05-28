import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


export default function TableHeading() {
    return (
        <TableHead>
            <TableRow>
                <TableCell width={"20px"}>№</TableCell>
                <TableCell >Title</TableCell>
                <TableCell >Isbn</TableCell>
                <TableCell >Author</TableCell>
                <TableCell >Published</TableCell>
            </TableRow>
        </TableHead>
    )
}
