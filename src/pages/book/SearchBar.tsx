import { type ChangeEvent, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

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
        <form onSubmit={onSubmit}>
            <input onChange={onChange} />
            <button type={"submit"}>
                검색
            </button>
        </form>
    );
}

export default SearchBar;
