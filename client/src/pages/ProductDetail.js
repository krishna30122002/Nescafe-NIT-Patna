import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetail = () => {
    const params = useParams();
    const [cart, setCart] = useCart();

    const [product, setProduct] = useState({});
    const [category, setCategory] = useState("");
    // const [categoryId, setCategoryId] = useState("");
    // const [similarProduct, setSimilarProduct] = useState([]);

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);

    useEffect(() => {
        if (product.category) {
            setCategory(product.category.name);
        }
    }, [product.category]);

    // useEffect(() => {
    //     if (product.category) {
    //         setCategoryId(product.category._id);
    //     }
    // }, [product.category]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.products);

            //important

            // getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    // const getSimilarProduct = async (pid, cid) => {
    //     try {
    //         const { data } = await axios.get(
    //             `http://localhost:8080/api/v1/product/similar-products/${pid}/${cid}`
    //         );
    //         setSimilarProduct(data?.products);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Layout title="Item Details | Nescafé">
            <div className="row d-flex flex-row">
                <div className="col-md-3 dashboard-menu-product ml-5 mt-5 p-3">
                    <img
                        className="card-img-top product-img"
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                    />
                </div>
                <div className="col-md-9 dashboard-content-product m-5 p-3">
                    <h3 className="text-center text-underline">Item Details</h3>
                    <h5>Name -: {product.name}</h5>
                    <h5>Description -: {product.description}</h5>
                    <h5>Category -: {category}</h5>
                    <hr />
                    <h2>Price -: {product.price}</h2>
                    <Link onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                            toast.success("Product added to Orders");
                        }}
                        to={""}
                        className="btn btn-primary homepage-btn product-submit-btn details-btn"
                    >
                        Add To Orders
                    </Link>
                </div>
            </div>
            {/* <div className="row dashboard-content-similar">
                <h3>Similar Products</h3>
                {JSON.stringify(similarProduct, null, 4)}
            </div> */}
        </Layout>
    );
};

export default ProductDetail;
