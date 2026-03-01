require('dotenv').config();
const express = require('express');
const mysql = require("mysql2/promise");
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// ========== DATABASE CONNECTION (MySQL Pool) ==========
const dbConfig = {
  host: process.env.DB_HOST || "cloud-pj.cliu62ai6o1e.ap-southeast-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "awd486S5",
  database: process.env.DB_NAME || "cloud-pj",
  port: Number(process.env.DB_PORT) || 3306,
  ssl: { 
    rejectUnauthorized: false // จำเป็นสำหรับการเชื่อมต่อ RDS ภายนอก VPC หรือผ่าน SSL
  },
  waitForConnections: true,
  connectionLimit: 20, // ปรับเพิ่มได้ถ้าทำ Load Test หนักๆ
  queueLimit: 0,
  connectTimeout: 10000 // 10 วินาทีให้เลิกคอยถ้าต่อไม่ได้
};

const pool = mysql.createPool(dbConfig);

// ตรวจสอบสถานะการเชื่อมต่อทันทีที่เริ่ม Server
async function checkDB() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ [Database] Connected to MySQL RDS successfully!");
    connection.release(); // คืน connection กลับเข้า pool
  } catch (err) {
    console.error("❌ [Database] Connection failed!");
    console.error("Message:", err.message);
  }
}
checkDB();

// ========== ROUTES AUTOMATION ==========
try {
  readdirSync('./routers').forEach((file) => {
    if (file.endsWith('.js')) {
      app.use('/api', require('./routers/' + file));
    }
  });
} catch (error) {
  console.error("❌ [Routes] Error loading routers:", error.message);
}

app.get("/", (req, res) => {
  res.status(200).send("Backend is running on AWS EKS 🚀");
});

// ========== START SERVER ==========
// บังคับใช้ Port จาก ENV ถ้าไม่มีจะใช้ 5000
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Backend is running on port: ${PORT}`);
  console.log(`📅 Started at: ${new Date().toLocaleString()}`);
  console.log(`-----------------------------------------`);
});