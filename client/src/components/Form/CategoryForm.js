import React from "react";
import "../../styles/CategoryForm.css";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Create New Category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary category-submit"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
