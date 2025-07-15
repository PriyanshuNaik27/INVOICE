import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

// 🔷 Importing all routes

import aiRoutes from './routes/parseRoute.js';
import customerRoutes from './routes/customerRoute.js';
import invoiceRoutes from './routes/invoiceRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import queryRoutes from './routes/queryRoute.js';
import reminderRoutes from './routes/reminderRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// 🔷 Routes declarations

app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/queries", queryRoutes);
app.use("/api/v1/reminders", reminderRoutes);

export default app;
