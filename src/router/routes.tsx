import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signUp";
import { BooksList } from "../pages/books";
import CreateBook from "../pages/createBook";
import DeleteBook from "../pages/deleteBook";
import PrivateRoute from "../PrivateRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <BooksList />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/create",
        element: <CreateBook />
      },
      {
        path: ":id/delete",
        element: <DeleteBook />
      },
    ]
  },
  {
    path: "signUp",
    element:
      <SignUpPage />
  },
  {
    path: "login",
    element:
      <LoginPage />
  },
];
export default routes;
