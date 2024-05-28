import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { IAllBooksData } from '../../../types/booksTypes';
import { useSearchBooksQuery } from '../../../features/api/booksApi';
import { useAppDispatch, useAppSelector } from '../../../features/store';
import { Heading } from '../../../components';
import { ErrorMessage } from '../../../types/authTypes';
import { setErrorMessage } from '../../../features/booksSlice';
import SearchTable from './search/SearchTable';
import BooksTable from './books/BooksTable';

interface ITableComponentProps { books: IAllBooksData[], isLoading: boolean }

export default function TableComponent({ books, isLoading }: ITableComponentProps) {
    const dispatch = useAppDispatch()
    const { queryString } = useAppSelector(state => state.booksSlice)
    const { data, isLoading: isSearchLoading, isError, error } = useSearchBooksQuery(queryString, {
        skip: !queryString,
    })

    if (isError && error) {
        const responseError = error as ErrorMessage;
        dispatch(setErrorMessage(responseError?.data?.message || "Internal server error"))
    }

    return (
        <TableContainer component={Paper}>
            <Heading />
            {!queryString ?
                <BooksTable books={books} isLoading={isLoading} />
                : <SearchTable books={data?.data as []} isLoading={isSearchLoading} />
            }
        </TableContainer >
    );
}
