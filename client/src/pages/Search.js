import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { Link } from "react-router-dom";

const Search = () => {
    const [values, useValues] = useSearch();
    return (
        <Layout title={"Seach Results | Nescafé"}>
            <div className="container mt-4 mb-4">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>
                        {values?.result.length < 1
                            ? "No Products Found"
                            : `Found ${values?.result.length} results`}
                    </h6>
                    <div className="d-flex parent">
                        {values?.result.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                            >
                                <div
                                    className="card m-2 child child-homepage"
                                    style={{
                                        width: "15.6rem",
                                    }}
                                >
                                    <img
                                        className="card-img-top product-img"
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name}
                                    />
                                    <div className="card-body card-body-homepage">
                                        <p
                                            className="card-text-homepage"
                                            style={{ color: "#6464ab" }}
                                        >
                                            Tap for more details
                                        </p>
                                        <h5 className="card-title-homepage">
                                            {p.name}
                                        </h5>
                                        <p className="card-text card-title-text-homepage">
                                            {p.description.substring(0, 90)}
                                            ...
                                        </p>
                                        <p className="card-text card-title-text-homepage card-title-text-homepage-price">
                                            ₹ {p.price}
                                        </p>
                                        <button className="btn btn-primary homepage-btn product-submit-btn">
                                            Add To Orders
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
