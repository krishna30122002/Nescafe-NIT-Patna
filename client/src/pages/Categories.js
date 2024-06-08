import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../styles/Categories.css";

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"Categories | Nescafé"}>
            <div className="category-container">
                <div className="row mt-3 mb-3 main-container">
                    {categories?.map((c) => (
                        <div className="category-link-container">
                            <Link
                                className="btn btn-primary category-link"
                                key={c._id}
                                to={`/category/${c.slug}`}
                            >
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
