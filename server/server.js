require('dotenv').config();
const express = require('express');
const mysql = require("mysql2/promise");
const morgan = require('morgan');
const { readdirSync, existsSync } = require('fs');
const cors = require('cors');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// ========== DATABASE CONNECTION ==========
const dbConfig = {
  host: process.env.DB_HOST || "cloud-pj.cliu62ai6o1e.ap-southeast-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "awd486S5",
  database: process.env.DB_NAME || "cloud-pj",
  port: parseInt(process.env.DB_PORT) || 3306,
  ssl: { 
    rejectUnauthorized: false 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// ตรวจสอบการเชื่อมต่อ
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Pool Connected to AWS RDS!");
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
  }
})();

// Routes - เพิ่มการเช็คว่าโฟลเดอร์มีจริงไหมป้องกัน Error
const routePath = './routers';
if (existsSync(routePath)) {
  readdirSync(routePath).map((c) => {
    if (c.endsWith('.js')) {
      app.use('/api', require(`${routePath}/${c}`));
    }
  });
}

app.get("/", (req, res) => {
  res.send("Backend OK - Server is Alive");
});

// ========== START SERVER ==========
// ดึง PORT จาก env ถ้าไม่มีให้ใช้ 5000
const PORT = process.env.PORT || 5000;

// สำคัญ: ห้ามใส่ Hostname ของ AWS ลงในนี้ ให้ใช้ 0.0.0.0 หรือไม่ต้องใส่เลย
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 Deployment Environment: ${process.env.NODE_ENV || 'development'}`);
});