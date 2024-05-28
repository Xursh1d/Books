import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography, Card } from '@mui/material';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useUpdateBookMutation } from '../../features/api/booksApi';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { setErrorMessage, setSuccessMessage, setUpdatedBook } from '../../features/booksSlice';
import { cardStyle, centerStyle } from '../styles';
import { ErrorMessage } from '../../types/authTypes';
import { useEffect } from "react";

const validationSchema = Yup.object({
    status: Yup.string().required("status is required"),
});

export default function UpdateBook() {
    const [updateBook, { data, isLoading, isError, isSuccess, error }] = useUpdateBookMutation()
    const { updatedBook } = useAppSelector(state => state.booksSlice)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            status: updatedBook?.status || 0,
        },
        validationSchema,
        onSubmit: async (values: { status: number }) => {
            if (updatedBook) {
                await updateBook({ data: { status: Number(values.status) }, id: updatedBook?.book.id }).unwrap();
            }
        }
    });

    useEffect(() => {
        if (isSuccess && data?.isOk) {
            cancelCallBack()
            dispatch(setSuccessMessage("Updated successfully"))
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError && error) {
            const responseError = error as ErrorMessage
            dispatch(setErrorMessage(responseError?.data?.message || "Internal server error"))
        }
    }, [isError, error]);

    const cancelCallBack = () => dispatch(setUpdatedBook(null))

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
                        Update Book
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl >
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="0"
                                name="status"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.status}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="New" />
                                <FormControlLabel value="1" control={<Radio />} label="Reading" />
                                <FormControlLabel value="2" control={<Radio />} label="Finished" />
                            </RadioGroup>
                        </FormControl>
                        <Box sx={centerStyle}>
                            <Button type="button" variant="outlined" color="primary" onClick={() => cancelCallBack()}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                {isLoading ? 'Updating...' : 'Update'}
                            </Button>
                        </Box>
                    </form>
                </Card>

            </>
        </Modal>
    );
}
