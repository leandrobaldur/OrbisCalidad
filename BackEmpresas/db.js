import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log('🟢 Conectado a PostgreSQL correctamente'))
  .catch(err => console.error('🔴 Error de conexión a PostgreSQL:', err));

export default db; // ✅ Exportación como ESModule
