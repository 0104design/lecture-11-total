import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar.tsx";
import styled from "styled-components";
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 95%;
    margin: 0 auto;
`;

const Box = styled.div`
    padding: 20px;
    border-radius: 15px;
    box-shadow: 10px 10px 10px -9px rgba(0, 0, 0, 0.1);
    display: flex;
    background-color: ${props => props.theme.colors.background.paper};
    width: calc((100% - 40px)/ 3);
    gap: 20px;
`;

const Img = styled.img`
    box-shadow: 10px 10px 10px -7px rgba(0, 0, 0, 0.35);
    border-radius: 15px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 800;
    margin-top: 20px;
`;

const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 65%;
`
const Author = styled.div`
    color: ${props => props.theme.colors.text.disabled};
`;

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
        <Container>
            <SearchBar />
            <Wrapper>
                {list.map((value, index) => (
                    <Box key={index}>
                        {value.volumeInfo.imageLinks ? (
                            <Img
                                src={value.volumeInfo.imageLinks?.thumbnail}
                                alt={value.volumeInfo.title}
                            />
                        ) : (
                            <div>No Cover</div>
                        )}
                        <BookInfo>
                            <Title>{value.volumeInfo.title}</Title>
                            <Author>{value.volumeInfo.authors}</Author>
                        </BookInfo>
                    </Box>
                ))}
            </Wrapper>
        </Container>
    );
}

export default Search;
