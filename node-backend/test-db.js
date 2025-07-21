const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'formularioDB',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión exitosa a la base de datos:', res.rows[0]);
  }
  pool.end();
});
