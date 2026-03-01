require('dotenv').config(); // อย่าลืมลง npm install dotenv และสร้างไฟล์ .env
const express = require('express');
const mysql = require("mysql2/promise"); // แนะนำให้ใช้ /promise จะเขียนง่ายกว่า
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// ========== DATABASE CONNECTION ==========
// ใช้ createPool และดึงค่าจาก env เป็นหลัก
const pool = mysql.createPool({
  host: process.env.DB_HOST || "cloud-pj.cliu62ai6o1e.ap-southeast-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "awd486S5",
  database: process.env.DB_NAME || "cloud-pj",
  port: Number(process.env.DB_PORT) || 3306, // Port ควรเป็นตัวเลข
  ssl: { 
    rejectUnauthorized: false // จำเป็นสำหรับ AWS RDS ในบางกรณี
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ตรวจสอบการเชื่อมต่อแบบ Async/Await
const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Pool Connected to AWS RDS!");
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:");
    console.error("Reason:", err.message); // จะบอกชัดเจนว่า Timeout หรือ Access Denied
  }
};
checkConnection();

// Routes
readdirSync('./routers').map((c) => {
  if (c.endsWith('.js')) { // ป้องกันไฟล์อื่นที่ไม่ใช่ js
    app.use('/api', require('./routers/' + c));
  }
});

app.get("/", (req, res) => {
  res.send("Backend OK");
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});