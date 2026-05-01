import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";
import MovieHome from "../pages/movie/MovieHome.tsx";
import MovieSearch from "../pages/movie/components/MovieSearch.tsx";
import MovieDetail from "../pages/movie/MovieDetail.tsx";

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
        ],
    },
]);

export default GetRouter;
