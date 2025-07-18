import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

// 🔷 Importing all routes

// import aiRoutes from './routes/parseRoutes.js';
// // import customerRoutes from './routes/customerRoutes.js';
// import invoiceRoutes from './routes/invoiceRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// // import queryRoutes from './routes/queryRoutes.js';
// import reminderRoutes from './routes/reminderRoutes.js';
// import dueRoutes from "./routes/dueRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"
const app = express();

const allowedOrigins = [
  "http://localhost:5173",                  // local Vite frontend

  "https://invoice-jade-nine.vercel.app",  // deployed Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy: Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// 🔷 Routes declarations

// app.use("/api/v1/ai", aiRoutes);
// app.use("/api/v1/customers", customerRoutes);
// app.use("/api/v1/invoices", invoiceRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// // app.use("/api/v1/queries", queryRoutes);
// app.use("/api/v1/reminders", reminderRoutes);
// app.use("/api/v1/due", dueRoutes);
// import chatRoutes from './routes/chat.js';
app.use('/api/v1/chat', chatRoutes);


export default app;