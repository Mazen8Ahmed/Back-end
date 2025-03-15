import { Request, Response } from "express";
import CertificateModel from "../Models/certificateModel";
import UserModel from "../Models/usersModel";

// Create Certificate
export const createCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, certificateType, validUntil, purchaseAmount } = req.body;

        if (!userId || !certificateType || !validUntil || !purchaseAmount) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const newCertificate = await CertificateModel.create({
            userId,
            certificateType,
            issuedAt: new Date(),
            validUntil: new Date(validUntil),
            status: "valid",
            purchaseAmount,
        });

        res.status(201).json({ message: "Certificate created successfully", certificate: newCertificate });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
    }
};

// Update Certificate
export const updateCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { certificateType, validUntil, status } = req.body;

        const updatedCertificate = await CertificateModel.findByIdAndUpdate(
            id,
            { certificateType, validUntil, status },
            { new: true }
        );

        if (!updatedCertificate) {
            res.status(404).json({ message: "Certificate not found" });
            return;
        }

        res.status(200).json({ message: "Certificate updated successfully", certificate: updatedCertificate });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", eerror: (error as any).message });
    }
};

// Delete Certificate
export const deleteCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedCertificate = await CertificateModel.findByIdAndDelete(id);

        if (!deletedCertificate) {
            res.status(404).json({ message: "Certificate not found" });
            return;
        }

        res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
    }
};

// Buy Certificate
export const buyCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, certificateType, purchaseAmount, validUntil } = req.body;

        if (!userId || !certificateType || !purchaseAmount || !validUntil) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const certificate = await CertificateModel.create({
            userId,
            certificateType,
            issuedAt: new Date(),
            validUntil: new Date(validUntil),
            status: "valid",
            purchaseAmount,
        });

        res.status(201).json({
            message: "Certificate purchased successfully",
            certificate,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: (error as any).message});
    }
};
