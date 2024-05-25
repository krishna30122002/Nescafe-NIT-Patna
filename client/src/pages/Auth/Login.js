import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import ConsoleHelperFrontend from "../../ConsoleHelperFrontend";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password }
            );
            if (res && res.data.success) {
                toast.success("Login Successfully!", {
                    position: "top-center",
                });
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error("Something Went Wrong!", {
                    position: "top-center",
                });
            }
        } catch (error) {
            ConsoleHelperFrontend(error);
            toast.error("Something Went Wrong!", {
                position: "top-center",
            });
        }
    };

    return (
        <Layout title="Log In | Nescafè">
            <div className="register-page login-page">
                <h1>Wanna Have A Coffee?</h1>
                <h2>Log In Here</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter your e-mail"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <div id="emailHelp" className="form-text">
                        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                    </div>
                    <button
                        type="submit"
                        className="btn btn-login-pass"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "0.125rem solid black",
                        }}
                        onClick={() => {
                            navigate("/forgot-password");
                        }}
                    >
                        Forgot Password?
                    </button>
                    <span>‎ </span>
                    <button type="submit" className="btn btn-login">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
