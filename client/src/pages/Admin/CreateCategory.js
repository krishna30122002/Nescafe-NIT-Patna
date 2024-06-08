import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";
import "../../styles/CreateCategory.css";

const CreateCategory = () => {
    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "../../img/favicon.ico";

        return () => {
            favicon.href = "";
        };
    }, []);

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/category/create-category`,
                { name }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };

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
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (e, cname) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete-category/${e}`,
                { name: cname }
            );
            if (data?.success) {
                toast.success(`${cname} is deleted`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title="Create Category | Admin">
            <div className="container-fluid ">
                <div className="row container-category">
                    <div className="col-md-3 dashboard-menu">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 dashboard-content-createcategory">
                        <h1 className="text-center">Manage Categories</h1>
                        <div className="p-3">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="main-container-dashboard">
                            <table classname="table table-category">
                                <thead>
                                    <tr className="table-row-category">
                                        <th
                                            scope="col"
                                            className="col-category-c1"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="col-category-c2"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="table-data-row">
                                    {categories?.map((c) => (
                                        <tr>
                                            <div>
                                                <td className="table-data-1">
                                                    <div className="table-data-row-data-1">
                                                        <p key={c._id}>
                                                            {c.name}
                                                        </p>
                                                    </div>
                                                    <div className="table-data-row-data-2">
                                                        <button
                                                            className="btn-category-1"
                                                            onClick={() => {
                                                                setVisible(
                                                                    true
                                                                );
                                                                setUpdatedName(
                                                                    c.name
                                                                );
                                                                setSelected(c);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            style={{
                                                                backgroundColor:
                                                                    "#ffdee9",
                                                                color: "#474d52",
                                                                border: "0.15rem solid #ffdee9",
                                                            }}
                                                            className=" btn-category-2"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    c._id,
                                                                    c.name
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </div>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        open={visible}
                    >
                        <CategoryForm
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                        />
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
