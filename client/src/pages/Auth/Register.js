import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    // const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, answer}
            );
            if (res && res.data.success) {
                toast.success("Registered Successfully!", {
                    position: "top-center",
                });
                navigate("/login");
            } else {
                toast.error("Something Went Wrong!", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!", {
                position: "top-center",
            });
        }
    };

    return (
        <Layout title="Registration | Nescafè">
            <div className="register-page">
                <h1>Welcome Folks!</h1>
                <h2>Register Here</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter your Phone Number"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="What is your Security Keyword?"
                            required
                        />
                    </div>

                    <div id="emailHelp" className="form-text">
                        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                    </div>
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
