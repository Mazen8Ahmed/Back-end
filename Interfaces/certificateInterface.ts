import { Document, Types } from "mongoose";

export interface ICertificate extends Document {
    userId: Types.ObjectId;
    certificateType: string;
    issuedAt: Date;
    validUntil: Date;
    status: "valid" | "revoked" | "expired";
    purchaseAmount?: number;
    profit?: number;
}
