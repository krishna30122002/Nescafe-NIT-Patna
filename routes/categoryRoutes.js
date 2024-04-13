import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getSingleCategoryController,
    updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

router.get("/get-category", getAllCategoryController);

router.get("/single-category/:slug", getSingleCategoryController);

router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteCategoryController);

export default router;
