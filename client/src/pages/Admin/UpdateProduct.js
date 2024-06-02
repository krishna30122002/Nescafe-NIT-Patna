import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import '../../styles/UpdateProduct.css'

const UpdateProduct = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const { Option } = Select;
    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("");

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
            );
            setId(data.products._id);
            setCategory(data.products.category._id);
            setName(data.products.name);
            setDescription(data.products.description);
            setPrice(data.products.price);
            setQuantity(data.products.quantity);
        } catch (error) {
            ConsoleHelperFrontend(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/get-category`
            );
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = axios.put(
                `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error("Something went wrong!");
            } else {
                toast.success("Product updated successfully!");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong!");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.prompt("Delete Product? (Yes/No)");
            if (answer === "No" || answer === "no") return;
            else if (answer === "Yes" || answer === "yes") {
                await axios.delete(
                    `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
                );
                toast.success("Product Deleted Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Update Product | Admin">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 dashboard-menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-updateproduct">
                        <h1 className="text-center">Update Products</h1>
                        <div>
                            <Select
                                variant={false}
                                placeholder="Select a category"
                                size="larger"
                                showSearch
                                className="form-select mb-3 col-md-12 category-search"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        hidden
                                    />
                                </label>
                                <div className="mb-3">
                                    {photo ? (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="photo_product"
                                                height={"150rem"}
                                                width={"150rem"}
                                                className="img img-responsive product-img"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                                alt="photo_product"
                                                height={"150rem"}
                                                width={"150rem"}
                                                className="img img-responsive product-img"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder="Product's Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={price}
                                        placeholder="Product's price"
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        type="text"
                                        value={description}
                                        placeholder="Product's description"
                                        className="form-control"
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={quantity}
                                        placeholder="Quantity"
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3 product-update">
                                    <button
                                        className="btn category-link-update-product"
                                        onClick={handleUpdate}
                                    >
                                        Update Product
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: "#ffdee9",
                                            color: "#474d52",
                                            border: "0.15rem solid #ffdee9",
                                            height: "2.5rem",
                                        }}
                                        className="btn btn-category product-delete-btn"
                                        onClick={() => handleDelete()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
