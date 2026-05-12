import { type ChangeEvent, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const H2 = styled.h2`
    margin: 0 auto;
    color: ${props => props.theme.colors.primary};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 80%;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.primary};
`;

const Button = styled.button`
    padding: 12px;
    border-radius: 8px;
    border: none;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
`;

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const k = keyword.trim();
        if (!k) return;

        navigate(`/book/search/?keyword=${encodeURIComponent(k)}`);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <Container>
            <H2>Google Books 검색</H2>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} />
                <Button type={"submit"}>검색</Button>
            </Form>
        </Container>
    );
}

export default SearchBar;
