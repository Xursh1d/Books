import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAppDispatch } from '../features/store';
import { setErrorMessage, setSuccessMessage } from '../features/booksSlice';

type ToasterType = "error" | "success" | "info" | "warning"

interface IToasterProps { message: string, type: ToasterType }

function Toaster({ message = "", type }: IToasterProps) {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        dispatch(setErrorMessage(null))
        dispatch(setSuccessMessage(null))
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default Toaster;
