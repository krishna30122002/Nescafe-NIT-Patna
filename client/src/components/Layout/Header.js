import React from "react";
import { Link, NavLink } from "react-router-dom";
import imgLogo from "../../img/nescafelogo.png";
import nitpLogo from "../../img/nitplogo.png";
import "../../styles/AuthStyles.css";
import "../../index.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();

    // important
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully!", {
            position: "top-center",
        });
    };

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light navbar-template" style={{position: "fixed",
            top: 0,
            zIndex: 1,
            width: "100%",
            paddingTop:"0.7rem",
            background: "rgb(217 204 204)"}}>
                <NavLink to="/">
                    <img className="navbar-logo" src={imgLogo} alt="logo" />
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo03"
                    aria-controls="navbarTogglerDemo03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo03"
                >
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <SearchInput />
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">
                                Home <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                // to={"/categories"}
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                            >
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={"/categories"}
                                    >
                                        All Categories
                                    </Link>
                                </li>
                                {categories?.map((c) => (
                                    <li key={c.id}>
                                        <Link
                                            className="dropdown-item"
                                            to={`/category/${c.slug}`}
                                        >
                                            {c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {!auth.user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <NavLink
                                        className="nav-link dropdown-toggle"
                                        // to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {auth?.user?.name}
                                    </NavLink>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <NavLink
                                            className="dropdown-item"
                                            to={`/dashboard/${
                                                auth?.user?.role === 1
                                                    ? "admin"
                                                    : "user"
                                            }`}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <div className="dropdown-divider" />
                                        <NavLink
                                            onClick={handleLogout}
                                            className="dropdown-item"
                                            to="/login"
                                        >
                                            Logout
                                        </NavLink>
                                    </div>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Badge className="badge-small" count={cart?.length}>
                                <NavLink className="nav-link" to="/orders">
                                    <h6 className="mt-1">Orders</h6>
                                </NavLink>
                            </Badge>
                        </li>
                    </ul>
                </div>
                <NavLink
                    className="navbar-brand"
                    to="https://www.nitp.ac.in/"
                    target="_blank"
                >
                    <img className="nitplogo" src={nitpLogo} alt="logo" />
                </NavLink>
            </nav>
        </div>
    );
};

export default Header;
