import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import '../../styles/Search.css'

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, result: data });
            navigate("/search");
        } catch (error) {
            
            ConsoleHelperFrontend(error);
        }
    };
    return (
        <div>
            <form className="form-inline my-2 my-lg-0 search-bar" onSubmit={handleSubmit}>
                <input
                    className="form-control mr-sm-2 search-bar-input"
                    type="search"
                    placeholder="What are you craving for?"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) =>
                        setValues({ ...values, keyword: e.target.value })
                    }
                />
                <button
                    className="btn btn-outline-success my-2 my-sm-0 search-bar-btn"
                    type="submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
