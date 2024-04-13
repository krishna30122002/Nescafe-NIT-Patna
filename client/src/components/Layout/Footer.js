import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";
import "../../styles/AuthStyles.css";

const Footer = () => {
    return (
        <>
            <footer
                className="footer-container text-center text-white"
                style={{ backgroundColor: "#f1f1f1" }}
            >
                <div className="container">
                    <section className="footer-section">
                        <Link
                            className="btn btn-link btn-floating btn-lg text-dark m-1 social"
                            to="https://www.facebook.com/kkverma30122002/"
                            role="button"
                            data-mdb-ripple-color="dark"
                            target="_blank"
                        >
                            <FiFacebook />
                        </Link>

                        <Link
                            className="btn btn-link btn-floating btn-lg text-dark m-1 social"
                            to="https://www.linkedin.com/in/kkverma30122002/"
                            role="button"
                            data-mdb-ripple-color="dark"
                            target="_blank"
                        >
                            <FiLinkedin />
                        </Link>
                        <Link
                            className="btn btn-link btn-floating btn-lg text-dark m-1 social"
                            to="https://www.instagram.com/krishnaa_verma__/"
                            role="button"
                            data-mdb-ripple-color="dark"
                            target="_blank"
                        >
                            <FiInstagram />
                        </Link>
                        <Link
                            className="btn btn-link btn-floating btn-lg text-dark m-1 social"
                            to="https://github.com/krishna30122002?tab=repositories"
                            role="button"
                            data-mdb-ripple-color="dark"
                            target="_blank"
                        >
                            <FiGithub />
                        </Link>
                    </section>
                </div>
                <div
                    className="text-center text-dark p-2"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                >
                    &copy; 2024 Copyright :
                    <Link className="text-dark" to="/">
                        ‎ Krishna
                    </Link>
                    {/* <hr /> */}
                    <div>
                        <NavLink className="footer-comp text-dark" to="/about">
                            About
                        </NavLink>
                        |
                        <NavLink
                            className="footer-comp text-dark"
                            to="/contact"
                        >
                            Contact
                        </NavLink>
                        |
                        <NavLink className="footer-comp text-dark" to="/policy">
                            Privacy Policy
                        </NavLink>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
