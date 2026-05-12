import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";
import MovieHome from "../pages/movie/MovieHome.tsx";
import MovieSearch from "../pages/movie/components/MovieSearch.tsx";
import MovieDetail from "../pages/movie/MovieDetail.tsx";
import BoardHome from "../pages/board/BoardHome.tsx";
import BoardDetail from "../pages/board/BoardDetail.tsx";
import RocketPage from "../pages/rocket/components/RocketPage.tsx";
import BookHome from "../pages/book/BookHome.tsx";
import Search from "../pages/book/Search.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> }, // => /
            { path: "todo", element: <TodoPage /> }, // => /todo
            { path: "coin", element: <CoinPage /> }, // => /coin
            {
                path: "movie",
                children: [
                    { index: true, element: <MovieHome /> }, // => /movie
                    { path: "search", element: <MovieSearch /> }, // => /movie/search
                    { path: "detail/:imdbID", element: <MovieDetail /> },
                ],
            },
            {
                path: "board",
                children: [
                    { index: true, element: <BoardHome /> },
                    { path: "detail/:id", element: <BoardDetail /> },
                ],
            },
            {
                path: "rocket",
                element: <RocketPage />,
            },
            {
                path: "book",
                children: [
                    {
                        index: true,
                        element: <BookHome />,
                    },
                    {
                        path: "search", element: <Search />
                    }
                ],
            },
        ],
    },
]);

export default GetRouter;
