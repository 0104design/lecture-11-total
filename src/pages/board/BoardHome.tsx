import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const H1 = styled.h1`
    margin: 0 auto;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    font-size: 18px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    display: block;
    border-top: 2px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background.paper};
`;

const Thead = styled.thead`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const Th = styled.th`
    width: 33%;
    padding: 20px;
    background-color: ${props => props.theme.colors.background.default};
    border-bottom: 1px solid ${props => props.theme.colors.text.disabled};
    &:first-child {
        width: 15%;
    }

    &:nth-child(2) {
        width: 70%;
    }
    &:last-child {
        width: 15%;
    }
`;

const Td = styled.td`
    margin-top: 15px;
    text-align: center;
    padding: 15px;

    &:first-child {
        width: 15%;
    }

    &:nth-child(2) {
        width: 70%;
        text-align: left;
    }
    &:last-child {
        width: 15%;
    }
`;

const Tr = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
    transition: all 0.3s;
    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
    &:hover {
        color: ${props => props.theme.colors.primary};
    }

    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const Tbody = styled.tbody`
    margin-top: 20px;
    display: block;
    max-height: 70dvh;
    overflow-y: auto;
    width: 100%;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: ${props => props.theme.colors.primary};
    }
`;

function BoardHome() {
    const [loading, setLoading] = useState<boolean>(true);

    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: PostType[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <div>본문을 불러오는 중입니다...</div>;
    }

    if (!posts) {
        return <div>존재하지 않는 게시글입니다</div>;
    }
    return (
        <>
            <Container>
                <H1>커뮤니티 게시판</H1>
                <Wrap>
                    <Table>
                        <Thead>
                            <tr>
                                <Th>번호</Th>
                                <Th>제목</Th>
                                <Th>작성자ID</Th>
                            </tr>
                        </Thead>
                        <Tbody>
                            {posts.map((value, index) => (
                                <Tr key={index}>
                                    <Td>{value.id}</Td>
                                    <Td>
                                        <Link to={`/board/detail/${value.id}`}>{value.title}</Link>
                                    </Td>
                                    <Td>{value.userId}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Wrap>
            </Container>
        </>
    );
}

export default BoardHome;
