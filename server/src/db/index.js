// db.js or connectDb.js
import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER,           
  password: process.env.DB_PASSWORD,   
  server: "localhost",                
  database:process.env.DB_DATABASE,
  options: {
    encrypt: false,                   
    trustServerCertificate: true       
  }
};

// const connectDb = async () => {
//   try {
//     await sql.connect(config);
//     console.log("✅ Connected to SQL Server");
//   } catch (err) {
//     console.error("❌ Connection Failed:", err.message);
//   }
// };

export const pool = new sql.ConnectionPool(config);
export const connectDb = () => pool.connect();