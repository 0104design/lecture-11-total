import { useState, type SubmitEvent, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
};

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

const InputSelection = styled.form`
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

const TodoList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TodoItem = styled.li<{ $isCompleted: boolean }>`
    background-color: ${props => props.theme.colors.background.paper};
    padding: 15px 20px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.5s;

    :hover {
        border-color: ${props => props.theme.colors.primary};
    }

    span {
        flex: 1;
        font-size: 16px;
        color: ${props =>
            props.$isCompleted
                ? props.theme.colors.text.disabled
                : props.theme.colors.text.default};
        text-decoration: ${props => (props.$isCompleted ? "line-through" : "none")};
    }
`;

const IconButton = styled.button<{ $colorType: "success" | "error" }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: all 0.5s;
    color: ${props => props.theme.colors[props.$colorType]};

    &:hover {
        opacity: 1;
    }
`;
function TodoPage() {
    const [inputValue, setInputValue] = useState(""); // 인푹에 입력된 갑 관리

    // todos라는 state가 TodoPage 컴포넌트가 불러와 질 ㄸ때마자 마련되는데,
    // 그 저장소ㅓ의 초기값은 이 함수에서 리턴된 값으로 걀정함
    // localStorage 에서 "todos" 라는키를 가진 값을 불러오고
    // 그 값이 있으묜 자바스크립트의 객체, 배열 형태로 반환하고 그 값이 없으면 빈 배열을 반환함.
    const [todos, setTodos] = useState<TodoType[]>(() => {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    }); // 할 일 목록을 관리

    const handleAddToDo = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        const newTodo: TodoType = {
            id: Date.now(), // 고유값으로, 사용자가 저장하는 "지금 시간"을 id로 쓰겠다.
            text: inputValue,
            isCompleted: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    useEffect(() => {
        // todos 라는 state는 현재 array 를 저장하고 있기 때문에
        // 그 값을 localstorage에 저장하기 위해서는 JSON 형식으로 바꿔줘야 함
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(value => {
                return value.id === id ? { ...value, isCompleted: !value.isCompleted } : value;
            }),
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(value => value.id !== id))
    };

    return (
        <Container>
            <Title>Todo List</Title>
            <InputSelection onSubmit={handleAddToDo}>
                <StyledInput
                    placeholder={"오늘의 할 일을 입력하세요"}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSelection>
            <TodoList>
                {todos.map((value, index) => (
                    <TodoItem key={index} $isCompleted={value.isCompleted}>
                        <IconButton $colorType={"success"} onClick={() => toggleTodo(value.id)}>
                            <FaCheck />
                        </IconButton>
                        <span>{value.text}</span>
                        <IconButton $colorType={"error"} onClick={() => deleteTodo(value.id)}>
                            <FaTrash />
                        </IconButton>
                    </TodoItem>
                ))}
            </TodoList>
        </Container>
    );
}

export default TodoPage;
