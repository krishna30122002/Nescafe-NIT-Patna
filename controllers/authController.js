import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import ConsoleHelperBackend from "../ConsoleHelperBackend.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, answer } = req.body;

        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is Required" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered, please login",
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        ConsoleHelperBackend(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(201).send({
                success: false,
                message: "Invalid password",
            });
        }
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "365d",
            }
        );
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Incorrect email or password",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        ConsoleHelperBackend(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error,
        });
    }
};

export const testController = (req, res) => {
    try {
        res.send("Protected Route");
    } catch (error) {
        ConsoleHelperBackend(error);
        res.send({ error });
    }
};

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, answer } = req.body;
        const user = await userModel.findById(req.user._id);
        if (password && password.length < 6) {
            return res.json({
                error: "Password must be atleast 6 characters long!",
            });
        }
        const hashedPassword = password
            ? await hashPassword(password)
            : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                answer: answer || user.answer,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        ConsoleHelperBackend(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error,
        });
    }
};

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        ConsoleHelperBackend(error);
        res.status(500).send({
            success: false,
            message: "Error while getting user orders",
            error,
        });
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 }); 
        res.json(orders);
    } catch (error) {
        ConsoleHelperBackend(error);
        res.status(500).send({
            success: false,
            message: "Error while getting user orders",
            error,
        });
    }
};

export const orderStatusController=async(req,res)=>{
    try {
        const {orderId} =req.params
        const {status} =req.body
        const orders=await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.json(orders)
    } catch (error) {
        ConsoleHelperBackend(error)
        res.status(500).send({
            success:false,
            message:'Error while updating order status',
            error
        })
    }
}