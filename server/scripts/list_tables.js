const mysql = require('mysql2/promise');
require('dotenv').config();

(async ()=>{
  try{
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306
    });
    const [rows] = await conn.query("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = ?", [process.env.DB_NAME]);
    console.log('Tables in', process.env.DB_NAME, rows.map(r=>r.TABLE_NAME));
    await conn.end();
  }catch(err){
    console.error('Error listing tables:', err.message);
    process.exit(1);
  }
})();
