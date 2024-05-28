import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography, Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteBooksMutation } from '../../features/api/booksApi';
import { useAppDispatch } from '../../features/store';
import { setErrorMessage, setSuccessMessage } from '../../features/booksSlice';
import { cardStyle, centerStyle } from '../styles';
import { ErrorMessage } from '../../types/authTypes';
import { useEffect } from "react";

export default function DeleteBook() {
    const navigate = useNavigate()
    const [deleteBooks, { isLoading, isError, error, isSuccess, data }] = useDeleteBooksMutation()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const handleDelete = async () => {
        if (id) {
            await deleteBooks(Number(id))
        }
    }

    useEffect(() => {
        if (isSuccess && data?.isOk) {
            navigate("/")
            dispatch(setSuccessMessage("Deleted successfully"))
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError && error) {
            const responseError = error as ErrorMessage
            dispatch(setErrorMessage(responseError.data.message || "Internal server error"))
        }
    }, [isError, error]);


    return (
        <Modal
            open={true}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Card variant='outlined' sx={cardStyle}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Do you want to delete?
                    </Typography>
                    <Box sx={centerStyle}>
                        <Button type="button" variant="outlined" color="primary" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} type="submit" variant="contained" color="error" disabled={isLoading}>
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </Box>
                </Card>
            </>
        </Modal>
    );
}
