import styled from "styled-components";
import RocketHome from "../RocketHome.tsx";
import RocketDetail from "../RocketDetail.tsx";
import { useEffect, useState } from "react";

export type RocketType = {
    id: string;
    name: string;
    description: string;
    active: boolean;
    cost_per_launch: number;
    country: string;
    flickr_images: string[];
};

const Wrap = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: ${props => props.theme.colors.background.paper};
    padding: 40px;
    height: 80dvh;
    display: flex;
    gap: 20px;
    border-radius: 10px;
    flex-direction: column;
`;

const Flex = styled.div`
    display: flex;
    height: 60dvh;
`;

function RocketPage() {
    const [loading, setLoading] = useState(true);

    const [list, setList] = useState<RocketType[]>([]);

    const [selected, setSelected] = useState<RocketType | null>(null);

    useEffect(() => {
        fetch("https://api.spacexdata.com/v4/rockets")
            .then(response => {
                return response.json();
            })
            .then((json: RocketType[]) => {
                setList(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>로딩 중입니다</div>;
    }

    return (
        <Wrap>
            <h1>로켓 선택</h1>
            <hr />
            <Flex>
                <RocketHome
                    list={list}
                    loading={loading}
                    selected={selected}
                    setSelected={setSelected}
                />
                <RocketDetail selected={selected} setSelected={setSelected} />
            </Flex>
        </Wrap>
    );
}

export default RocketPage;
