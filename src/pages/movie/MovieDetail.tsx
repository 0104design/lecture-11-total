import { useNavigate, useParams } from "react-router";
import type { MovieType } from "./components/MovieSearch.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
    padding: 20px;
    width: 100%;
`;

const Card = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    flex: 1;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 100px;
    width: 100%;
    height: 70dvh;
`;

const Img = styled.img`
    width: calc((100%) / 4.5);
    border-radius: 5%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
`;

const MainWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
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
    width: 50%;
    height: 50svh;
    max-height: 170px;
    max-width: 170px;
    background-color: ${props => props.theme.colors.background.default};
    font-size: 20px;
    font-weight: 900;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${props => props.theme.colors.primary};
    color: #555;
`;

const CircleFlex = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors.background.default}
    padding: 40px;
    gap: 20px;
    flex: 1;
    height: 75dvh;
`;

const Hr = styled.hr`
    width: 100%;
    border-color: ${props => props.theme.colors.primary};
    opacity: 0.1;   
`;

const Subtext = styled.p`
    font-size: 15px;
    width: 60%;
    text-align: center;
    font-weight: 400;
`;

const FlexDiv = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors.background.default};
    padding: 100px 80px;
    border-radius: 20px;
    gap: 50px;
    flex: 1;
    align-items: center;
    height: 35dvh;
`;


const Box = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.disabled};
    padding: 20px 55px;
    width: 100%;
    font-size: 20px;
    line-height: 35px;
    overflow-y: auto;
    height: 30dvh;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.primary};
    }
`;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MainTitle = styled.p`
    color: ${props => props.theme.colors.primary};
`;

const H3Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    background-color: ${props => props.theme.colors.background.paper};
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary};
`;

const SubFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: space-between;
`;
const SubText = styled.p`
    text-align: center;
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
                <Flex>
                    <Card>
                        <Img src={movie.Poster} />
                        <MainDiv>
                            <CircleFlex>
                                <Circle1>
                                    <MainTitle>제목</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Title}</Subtext>
                                </Circle1>
                                <Circle1>
                                    <MainTitle>개봉 시기</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Year}</Subtext>
                                </Circle1>
                                <Circle1>
                                    <MainTitle>감독</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Director}</Subtext>
                                </Circle1>
                                <Circle1>
                                    <MainTitle>구분</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Type}</Subtext>
                                </Circle1>
                                <Circle1>
                                    <MainTitle>장르</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Genre}</Subtext>
                                </Circle1>
                                <Circle1>
                                    <MainTitle>작가</MainTitle>
                                    <Hr />
                                    <Subtext>{movie.Writer}</Subtext>
                                </Circle1>
                            </CircleFlex>
                            <FlexDiv>
                                <SubFlex>
                                    <H3Flex>
                                        <h3>영화 줄거리</h3>
                                    </H3Flex>
                                    <Hr />
                                    <SubText>
                                        다음은 <strong>{movie.Title}</strong>에 대한 상세 입니다!{" "}
                                        <br />
                                        영화의 상세 설명을 확인해 보세요!
                                    </SubText>
                                </SubFlex>
                                <Box>{movie.Plot}</Box>
                            </FlexDiv>
                        </MainDiv>
                    </Card>
                </Flex>
            </MainWrapper>
        </>
    );
}

export default MovieDetail;
