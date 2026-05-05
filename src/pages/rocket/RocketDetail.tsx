import { useEffect, useState } from "react";
import type { RocketType } from "./components/RocketPage.tsx";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

type Props = {
    selected: RocketType | null;
    setSelected: (selected: RocketType) => void;
};

const Info = styled.div`
    padding: 40px;
    width: 100%;
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.theme.colors.divider};
    border-radius: 15px;
`;

const InfoText = styled.p`
    font-size: 16px;

`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 20px;
`;

const Img = styled.img`
    height: 35dvh;
    border-radius: 10px;
    min-width: 520px;
`;

const Desc = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
`;


const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    max-width: 1300px;
    gap: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

function RocketDetail({ selected }: Props) {
    const id = selected?.id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`API주소/${id}`)
            .then(res => res.json())
            .then((json: RocketType) => {
                setSelected(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err, err);
                setLoading(false);
            });
    }, [id]);

    if (!selected) {
        return (
            <Info>
                <FaInfoCircle />
                <InfoText>로켓을 선택해주세요</InfoText>
            </Info>
        );
    }

    if (loading) return <div>로딩중...</div>;

    return (
        <Container>
            <h1>{selected?.name}</h1>
            <Box>
                <Img src={selected?.flickr_images[0]} alt="" />
                <Desc>{selected.description}</Desc>
            </Box>
        </Container>
    );
}

export default RocketDetail;
