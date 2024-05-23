import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDatabase from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import axios from "axios";
import uniqid from "uniqid";
import sha256 from "sha256";

dotenv.config();

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", productRoutes);

app.use(bodyParser.json());

// let totalPrice=0;
// app.post("/api/v1/total-price", (req, res) => {
//     totalPrice = req.body.totalPrice; // Assuming the total price is sent in the request body
//     console.log("Received total price:", totalPrice);
//     // Do something with the total price, such as saving it to a database
//     res.send("Total price received successfully");
// });


// payment api integration

const HOST_URL = "https://api-preprod.phonepe.com/apis/hermes";
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

app.get("/pay", (req, res) => {
    const endPoint = "/pg/v1/pay";
    const merchantTransactionId = uniqid();
    const userId = 123;

    const payload = {
        merchantId: MERCHANT_ID,
        // install uniqid
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: 1,
        redirectUrl: `http://localhost:8080/redirect-url/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf-8");
    const base63EncodedPayload = bufferObj.toString("base64");
    const xVerify =
        sha256(base63EncodedPayload + endPoint + SALT_KEY) + "###" + SALT_INDEX;

    const options = {
        method: "post",
        url: `${HOST_URL}${endPoint}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": xVerify,
        },
        data: {
            request: base63EncodedPayload,
        },
    };
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            const url = response.data.data.instrumentResponse.redirectInfo.url;
            res.redirect(url);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get("/redirect-url/:merchantTransactionId", (req, res) => {
    const { merchantTransactionId } = req.params;
    console.log("merchantTransactionId", merchantTransactionId);
    if (merchantTransactionId) {
        const xVerify =
            sha256(
                `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` +
                    SALT_KEY
            ) +
            "###" +
            SALT_INDEX;
        const options = {
            method: "get",
            url: `${HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-MERCHANT-ID": merchantTransactionId,
                "X-VERIFY": xVerify,
            },
        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                // res.send(response.data);
                res.redirect("http://localhost:3000/");
                // if (response.data.code === "PAYMENT_SUCCESS") {
                //     res.redirect("http://localhost:3000/")
                // } else if (response.data.code === "PAYMENT_ERROR") {
                //     res.redirect("http://localhost:3000/api/v1/orders/pay")
                // } else {
                //     //pending
                // }
                res.send({ merchantTransactionId });
            })
            .catch(function (error) {
                console.error(error);
            });
    } else {
        res.send({ error: "Error" });
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Welcome To Nescafe NIT Patna</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
    console.log(
        `Server is running on ${process.env.DEV} on port ${PORT}`.bgCyan.white
    );
});
