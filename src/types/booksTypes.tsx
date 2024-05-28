export interface IBooksResponse<T> {
    data: T | null | undefined,
    isOk: boolean,
    message: string
}

export interface IBookType {
    id: number,
    isbn: string,
    title: string,
    cover: string,
    author: string,
    published: number,
    pages: number
}

export interface IAllBooksData {
    book: IBookType
    status: number
}

export type BookWithoutIdAndPages = Omit<IBookType, 'id' | 'pages'>;

export type ISearchResponse = IBooksResponse<BookWithoutIdAndPages[]>

export type IAllBooksResponse = IBooksResponse<IAllBooksData[]>

export type CreateBookResponse = IBooksResponse<IAllBooksData>