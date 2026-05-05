import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        publishedDate: string;
        authors?: string[];
        description?: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
};

type ApiResponseType = { items: BookItem[] };

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function Search() {

    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<BookItem[]>([]);

    useEffect(() => {
        if (!keyword) {
            return;
        }

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.items);
            })
            .catch(err => {
                console.log(err);
            });
    }, [keyword]);

    return (
        <div>
            <div>
                {list.map((value, index) => (
                    <div key={index}>
                        {value.volumeInfo.imageLinks ? (
                            <img
                                src={value.volumeInfo.imageLinks?.thumbnail}
                                alt={value.volumeInfo.title}
                            />
                        ) : (
                            <div>No Cover</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
