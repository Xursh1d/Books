import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, Button, Typography, Card } from '@mui/material';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useCreateBookMutation } from '../../features/api/booksApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/store';
import { setErrorMessage, setSuccessMessage } from '../../features/booksSlice';
import { cardStyle, centerStyle } from '../styles';
import { ErrorMessage } from '../../types/authTypes';
import { useEffect } from "react";

const validationSchema = Yup.object({
    isbn: Yup.string().required("Isbn is required"),
});

export default function CreateBook() {
    const [createBook, { data, isLoading, isError, isSuccess, error }] = useCreateBookMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: { isbn: "" },
        validationSchema,
        onSubmit: async (values: { isbn: string }) => {
            await createBook(values).unwrap();
        }
    });

    useEffect(() => {
        if (isSuccess && data?.isOk) {
            navigate("/")
            dispatch(setSuccessMessage("Created successfully"))
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError && error) {
            const responseError = error as ErrorMessage;
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
                        Create Book
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="isbn"
                            label="Isbn"
                            value={formik.values.isbn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.isbn && Boolean(formik.errors.isbn)}
                            helperText={formik.touched.isbn && formik.errors.isbn}
                        />
                        <Box sx={centerStyle}>
                            <Button type="button" variant="outlined" color="primary" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create'}
                            </Button>
                        </Box>
                    </form>
                </Card>
            </>
        </Modal>
    );
}
