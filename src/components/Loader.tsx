import CircularProgress from "@mui/material/CircularProgress";
import TableCell from "@mui/material/TableCell";

export default function Loader() {
    return (
        <TableCell colSpan={7} align="center"><CircularProgress /></TableCell>
    )
}
