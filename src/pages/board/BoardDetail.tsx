import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { PostType } from "./BoardHome.tsx";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.paper};
`;

const Card = styled.div`
    width: 80%;
    padding: 40px;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const ButtonLink = styled(Link)`
    width: 13%;
    height: 10%;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background.paper};
    border-radius: 10px;
    padding: 10px;
    text-align: center;
`;

const SubText = styled.div`
    display: flex;
    gap: 20px;
`

function BoardDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<PostType | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: PostType) => {
                setPost(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>본문을 불러오는 중입니다...</div>;
    }

    if (!post) {
        return <div>존재하지 않는 게시글입니다</div>;
    }

    return (
        <Wrap>
            <Card>
                <ButtonLink to={"/board"}>&larr; 목록으로 돌아가기</ButtonLink>
                <h2>{post.title}</h2>
                <SubText>
                    <div>게시물 번호: {post.id}</div>
                    <div>작성자: {post.userId}</div>
                </SubText>
            </Card>
        </Wrap>
    );
}

export default BoardDetail;
