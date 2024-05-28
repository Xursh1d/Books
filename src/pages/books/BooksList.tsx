import { useAllBooksQuery } from "../../features/api/booksApi";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UpdateBook from "../updateBook";
import { useAppSelector } from "../../features/store";
import Toaster from "../../helpers/Toaster";
import { ErrorMessage } from "../../types/authTypes";
import TableComponent from "./components/Table";

export default function BooksList() {
    const { updatedBook, errorMessage, successMessage } = useAppSelector(state => state.booksSlice)
    const { data: allBooks, isLoading, isError, error } = useAllBooksQuery();
    const responseError = error as ErrorMessage;

    return (
        <Container maxWidth="lg" sx={{ margin: "40px auto" }}>
            <TableComponent
                isLoading={isLoading}
                books={allBooks?.data || []}
            />
            {updatedBook && <UpdateBook />}
            <Outlet />
            {(errorMessage || isError) && <Toaster type="error" message={errorMessage || responseError?.data?.message} />}
            {successMessage && <Toaster type="success" message={successMessage} />}
        </Container>
    );
}
