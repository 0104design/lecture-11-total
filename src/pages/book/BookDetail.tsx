import {  useParams } from "react-router";
import { useEffect, useState } from "react";
import type { BookItem } from "./Search";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function BookDetail() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState<BookItem | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
            .then(res => res.json())
            .then((json: BookItem) => {
                setPage(json);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [id]);

    if (loading) {
        return <div>loading...</div>;
    }

    if (!page) {
        return <div>책 정보가 없습니다.</div>;
    }

    return <></>;
}

export default BookDetail;
