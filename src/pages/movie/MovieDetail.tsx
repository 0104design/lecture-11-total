import { useNavigate, useParams } from "react-router";
import type { MovieType } from "./components/MovieSearch.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Img = styled.img`
    height: 60dvh;
    width: calc((100%) / 4.5);
    border-radius: 5%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    padding: 0;
    color: ${props => props.theme.colors.text.default};
`;

const Flex = styled.div`
    display: flex;
    flex: 1;
    border-radius: 10px;
    gap: 30px;
`;

const MainWrapper = styled.div`
    display: flex;
    gap: 40px;
    flex-direction: column;
`;

const Card = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    flex: 1;
    flex-direction: column;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 20px;
`;

const TextButton = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 10px;
`;

const Circle1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-color: #eaf4ff;
    font-size: 20px;
    font-weight: 900;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.09);
`;

const Circle2 = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-color: #c6ddf4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.09);
    flex-direction: column;
    gap: 10px;
`;

const Circle3 = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-color: #8cbbe9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.09);
    flex-direction: column;
    gap: 10px;
`;

const Circle4 = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-color: #70aae4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 900;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.01);
`;

const CircleFlex = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors.background.default}
    padding: 40px;
    width: 100%;
    border-radius: 20px;
    justify-content: space-around;
`;

const Hr = styled.hr`
    width: 150px;
`;

const Subtext = styled.p`
    font-size: 15px;
    width: 60%;
    text-align: center;
    font-weight: 400;
`;

function MovieDetail() {
    const { imdbID } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieType | null>(null);
    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`)
            .then(res => res.json())
            .then((json: MovieType) => setMovie(json))
            .catch(err => console.log(err));
    }, [imdbID]);

    if (!movie) return <div>loading...</div>;
    return (
        <>
            <MainWrapper>
                <TextButton>
                    <Title>{movie.Title}</Title>
                    <Button onClick={() => navigate(-1)}> &larr; 뒤로가기</Button>
                </TextButton>
                <hr />
                <Flex>
                    <Img src={movie.Poster} />
                    <Card>
                        <CircleFlex>
                            <Circle1>
                                제목
                                <Hr />
                                <Subtext>{movie.Title}</Subtext>
                            </Circle1>
                            <Circle2>
                                개봉 시기
                                <Hr />
                                <Subtext>{movie.Year}</Subtext>
                            </Circle2>
                            <Circle3>
                                감독 <Hr />
                                <Subtext>{movie.Director}</Subtext>
                            </Circle3>
                            <Circle4>
                                구분
                                <Hr />
                                <Subtext>{movie.Type}</Subtext>
                            </Circle4>
                        </CircleFlex>
                    </Card>
                </Flex>
            </MainWrapper>
        </>
    );
}

export default MovieDetail;
