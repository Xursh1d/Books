import { IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateQueryString } from "../features/booksSlice";
import { useAppDispatch } from "../features/store";
import SearchIcon from '@mui/icons-material/Search';

export default function Heading() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };

    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        dispatch(updateQueryString(search))
    };

    const handleClick = () => search && dispatch(updateQueryString(search))

    return (
        <Box sx={{ p: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Typography variant="h4" >
                    Books
                </Typography>
                <Box sx={{ position: "relative" }}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Search"
                        size="small"
                        onChange={handleChange}
                        onKeyPress={keyPressHandler}
                    />
                    <IconButton onClick={handleClick} sx={{ position: "absolute", right: 5, top: 3 }} aria-label="delete" size="small">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <Button onClick={() => navigate("create")} variant="contained">Add</Button>
        </Box>
    )
}
