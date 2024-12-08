// src/ index.js 
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import authRoutes from './routes/auth.js';
import donorRoutes from './routes/donor.js';
import hospitalRoutes from './routes/hospital.js';
import clinicRoutes from './routes/clinic.js';
import emergencyRoutes from './routes/emergency.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// Middleware

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'], // Add your frontend URLs here
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/emergency', emergencyRoutes);

// Add this after all route declarations but before the database connection
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// Connect to database
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed!", err);
    });