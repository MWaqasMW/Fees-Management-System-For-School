// index.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

import { connectDb } from "./src/db/index.js";
import studentRoutes from "./src/routes/studentRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);


// Connect DB and Start Server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  try{
     await connectDb();
     console.log("DB Connected");
  }catch(err){
    console.log("DB Connection Failed",err.message);
  }
});
