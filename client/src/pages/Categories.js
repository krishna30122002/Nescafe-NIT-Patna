import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"Categories | Nescafé"}>
            <div className="container">
                <div className="row mt-3 mb-3">
                    {categories?.map((c) => (
                        <div className="col-md-3">
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
