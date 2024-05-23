import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group list-group-admin">
                    <h4 style={{ marginTop: "0.65rem" }}>Admin Menu</h4>
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="list-group-item list-group-item-action list-group-item-admin"
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="list-group-item list-group-item-action list-group-item-admin"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="list-group-item list-group-item-action list-group-item-admin"
                    >
                        All Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="list-group-item list-group-item-action list-group-item-admin"
                    >
                        Orders
                    </NavLink>
                    {/* <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action list-group-item-admin"
                    >
                        Users
                    </NavLink> */}
                </div>
            </div>
        </>
    );
};

export default AdminMenu;
