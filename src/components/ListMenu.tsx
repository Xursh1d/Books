import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../features/store';
import { setUpdatedBook } from '../features/booksSlice';
import { IAllBooksData } from '../types/booksTypes';

const ITEM_HEIGHT = 48;

interface IListMenuProps {
    book: IAllBooksData
}
export default function ListMenu({ book }: IListMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClickCapture={() => navigate(`${book?.book?.id}/delete`)} sx={{ color: "red" }} onClick={handleClose}>
                    Delete
                </MenuItem>
                <MenuItem onClickCapture={() => dispatch(setUpdatedBook(book))} sx={{ color: "blue" }} onClick={handleClose} >
                    Edit
                </MenuItem>
            </Menu>
        </div>
    );
}
