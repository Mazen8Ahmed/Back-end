import { Application, Request, Response, NextFunction } from "express";
import customErrors from "../Utils/Errors";
import userRoute from './userRoute';
import authRoute from './authRoute';
import { protectRoute } from "../controllers/authController";
import homeRouter from "./home";
import transactionRouter from './transactionRouter';
import accountRouter from './accountRouter';
import certificateRoutes from './certificateRoutes';

const AllRoutes = (app: Application): void => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/profile', protectRoute, homeRouter);
    app.use('/api/v1/transactions', transactionRouter);
    app.use('/api/v1/accounts', accountRouter);
    app.use('/api/v1/certificates', certificateRoutes); // ✅ Move this ABOVE the 404 handler

    // ❌ Fix: Move this BELOW all valid routes
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new customErrors(`The router ${req.originalUrl} is not found`, 400));
    });

    // app.use(globalErrors);
};

export default AllRoutes;
