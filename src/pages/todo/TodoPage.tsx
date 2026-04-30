import { useState, type SubmitEvent} from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

const InputSelction = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider}
    color: ${props => props.theme.colors.text.default}
    font-size: 16px;
    outline: none;
    
    &:focus {
        border: 1px solid ${props => props.theme.colors.primary}
    }
`;

const AddButton = styled.button`
    padding: 0 20px;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;

    &:hover {
        opacity: 0.9;
    }
`;



function TodoPage() {
    const [inputValue, setInputValue] = useState("");       // 인푹에 입력된 갑 관리
    const [todos,setTodos] = useState<string[]>([]);                 //

    const handleAddToDo = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        setTodos([...todos, inputValue]);
        setInputValue("");
    };
    return (
        <Container>
            <Title>Todo List</Title>
            <InputSelction onSubmit={handleAddToDo}>
                <StyledInput
                    placeholder={"오늘의 할 일을 입력하세요"}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSelction>

            {todos.map((value, index) => (
                <li key={index}>{value}</li>
            ))}
        </Container>
    );
}

export default TodoPage;
