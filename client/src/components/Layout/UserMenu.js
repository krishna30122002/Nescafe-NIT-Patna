import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/UserMenu.css";

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group list-group-admin-user">
                    <h4 style={{ marginTop: "0.65rem" }}>User Menu</h4>
                    <NavLink
                        to="/dashboard/user/profile "
                        className="list-group-item list-group-item-action list-group-item-user"
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/orders"
                        className="list-group-item list-group-item-action list-group-item-user"
                    >
                        Orders
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default UserMenu;
