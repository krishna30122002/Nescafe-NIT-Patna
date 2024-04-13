import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",
            },
        ],
        payment: {}, 
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            default: "Not in Process",
            enum: [
                "Not in Process",
                "Accepted",
                "Processing",
                "Ready to Collect",
                "Cancel",
            ],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
