import SearchBar from "./components/SearchBar.tsx";
import { FaInfoCircle } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`;
const DivWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 60dvh;
    background-color: ${props => props.theme.colors.divider};
    width: 1465px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    svg {
        color: ${props => props.theme.colors.text.disabled}
    }
`;


function MovieHome() {
    return (
        <Wrapper>
            <SearchBar />
            <DivWrap>
                <FaInfoCircle size={50} />
                <p>영화를 검색해 주세요</p>
            </DivWrap>
        </Wrapper>
    );
}

export default MovieHome;
