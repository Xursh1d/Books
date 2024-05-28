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
                <TableCell >Pages</TableCell>
                <TableCell >Published</TableCell>
                <TableCell >Status</TableCell>
                <TableCell width={"20px"}></TableCell>
            </TableRow>
        </TableHead>
    )
}
