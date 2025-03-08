import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDatabase from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ConsoleHelperBackend from "./ConsoleHelperBackend.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));

const BASE_URL=process.env.BASE_URL;

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/category`, categoryRoutes);
app.use(`/api/v1/product`, productRoutes);

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(`${PORT}`, () => {
    ConsoleHelperBackend(
        `Server is running on ${process.env.DEV} on port ${PORT}`.bgCyan.white
    );
});
