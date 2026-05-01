import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrap = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
    width: 80%;
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
    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const kw = keyword.trim();
        if (!kw) return;
        navigate(`/movie/search?keyword=${encodeURIComponent(kw)}`);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    return (
        <Wrap>
            <h2>Movie Search</h2>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} />
                <Button type={"submit"}>검색</Button>
            </Form>
        </Wrap>
    );
}

export default SearchBar;
