import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar.tsx";
import styled from "styled-components";
export type MovieType = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
    Type: string;
    Director: string;
    Genre: string;
    Plot: string;
    Writer: string;
    Actors: string;
};

const DivGap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
`;
const Card = styled.div`
    display: flex;
    gap: 20px;
    width: calc((100% - 120px) / 5);
    background-color: ${props => props.theme.colors.background.paper};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: transparent;
    transition: all 0.5s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const MovieWrap = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const Img = styled.img`
    margin-top: 20px;
    height: 30dvh;
    border-radius: 10px;
    width: 80%;
`;


const TextTitle = styled.div`
    text-align: center;
    margin: 20px;
    font-weight: 800;
`;

const LinkA = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
`;

type Res = { Search: MovieType[] };

function MovieSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<MovieType[]>([]);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: Res) => {
                setList(json.Search);
            })
            .catch(err => {
                console.log(err);
            });
    }, [keyword]);

    return (
        <DivGap>
            <SearchBar />
            <MovieWrap>
                {list.map((value, index) => (
                    <Card key={index}>
                        <LinkA to={`/movie/detail/${value.imdbID}`}>
                            <Img src={value.Poster} alt={value.Title} />
                            <TextTitle>{value.Title}</TextTitle>
                        </LinkA>
                    </Card>
                ))}
            </MovieWrap>
        </DivGap>
    );
}

export default MovieSearch;
