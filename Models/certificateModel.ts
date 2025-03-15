import mongoose, { Schema } from "mongoose";
import { ICertificate } from "../Interfaces/certificateInterface";

const CertificateSchema = new Schema<ICertificate>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        certificateType: { type: String, required: true },
        issuedAt: { type: Date, default: Date.now },
        validUntil: { type: Date, required: true },
        status: { type: String, enum: ["valid", "revoked", "expired"], default: "valid" },
        purchaseAmount: { type: Number },
        profit: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<ICertificate>("Certificate", CertificateSchema);
