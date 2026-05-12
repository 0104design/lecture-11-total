import { type Dispatch, type SetStateAction } from "react";
import styled from "styled-components";
import type { RocketType } from "./components/RocketPage.tsx";

type Props = {
    list: RocketType[];
    loading: boolean;
    selected: RocketType | null;
    setSelected: Dispatch<SetStateAction<RocketType | null>>;
};

const Wrap = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: ${props => props.theme.colors.background.paper};
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    flex: 1;
`;

const Card = styled.div`
    color: ${props => props.theme.colors.primary};
    width: calc(50% - 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 20px;
    transition: all 0.2s;

    &:hover {
        color: ${props => props.theme.colors.background.paper};
        background-color: ${props => props.theme.colors.primary};
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name   = styled.div`
    font-size: 25px;
    font-weight: 700;
`;

const Country = styled.div`
    color: ${props => props.theme.colors.text.default};
`

function RocketHome({ list, loading, setSelected }: Props) {
    return (
        <Wrap>
            {loading ? (
                <div>데이터를 불러오는 중입니다</div>
            ) : (
                <Container>
                    {list.map((list, index) => {
                        return (
                            <Card
                                key={index}
                                onClick={() => {
                                    setSelected(list);
                                }}>
                                <Box>
                                    <Name>{list.name}</Name>
                                    <Country>{list.country}</Country>
                                </Box>
                            </Card>
                        );
                    })}
                </Container>
            )}
        </Wrap>
    );
}

export default RocketHome;
