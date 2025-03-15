import express from "express";
import {
    createCertificate,
    updateCertificate,
    deleteCertificate,
    buyCertificate,
} from "../controllers/certificateController";

const router = express.Router();

// Define routes
router.post("/create", createCertificate);
router.put("/update/:id", updateCertificate);
router.delete("/delete/:id", deleteCertificate);
router.post("/buy", buyCertificate);

export default router;
