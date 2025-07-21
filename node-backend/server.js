const http = require('http');
const { Pool } = require('pg');

// Configuración de PostgreSQL
const pool = new Pool({
  host: 'host.docker.internal',
  user: 'admin',
  password: 'admin123',
  database: 'formularioDB',
  port: 5432,
});

// Crear tabla si no existe
pool.query(`
  CREATE TABLE IF NOT EXISTS mensajes (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    email TEXT,
    mensaje TEXT
  )
`, (err) => {
  if (err) console.error('❌ Error creando tabla:', err);
  else console.log('✅ Tabla "mensajes" lista');
});

const server = http.createServer((req, res) => {
  if (req.url === '/formulario') {
    // Cabeceras CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('📨 Datos recibidos:', data);

        const query = 'INSERT INTO mensajes (nombre, email, mensaje) VALUES ($1, $2, $3)';
        const values = [data.nombre, data.email, data.mensaje];

        pool.query(query, values, (err, result) => {
          if (err) {
            console.error('❌ Error insertando en BD:', err);
            res.writeHead(500);
            res.end('Error en la base de datos');
          } else {
            console.log('✅ Datos guardados en la base');
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Datos guardados con éxito' }));
          }
        });
      } catch (err) {
        console.error('❌ Error procesando datos:', err);
        res.writeHead(400);
        res.end('Error en los datos recibidos');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Ruta no encontrada');
  }
});

server.listen(3000, () => {
  console.log('🚀 Servidor escuchando en puerto 3000');
});
