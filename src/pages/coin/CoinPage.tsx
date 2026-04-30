import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinList from "./CoinList.tsx";
import CoinDetail from "./CoinDetail.tsx";

export type CoinType = {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: string;
    price_usd: string;
    percent_change_24h: string;
    market_cap_usd: string;
    volume24: string;
};

type ApiResponseType = {
    data: CoinType[];
};

const Container = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100dvh - 150px);
`;

function CoinPage() {
    const [coins, setCoins] = useState<CoinType[]>([]); // 목록 저장용
    const [loading, setLoading] = useState(true); // 로딩 상태용
    const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null); // 사용자가 선택한 그 코인 코인 정보를 저장하는 state

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(response => response.json())
            .then((json: ApiResponseType) => {
                setCoins(json.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                // finally 는 성공이든 실패든 그 항목을 실행하고 난 마자막에 실행되는 내용을 기재
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <CoinList
                coins={coins}
                loading={loading}
                selectedCoin={selectedCoin}
                setSelectedCoin={setSelectedCoin}
            />
            <CoinDetail selectedCoin={selectedCoin} />
        </Container>
    );
}

export default CoinPage;
