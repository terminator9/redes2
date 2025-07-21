const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/formulario') {
    // Agregar cabeceras CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas las fuentes
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight request (OPTIONS)
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
        console.log('Datos recibidos:', data);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensaje: 'Formulario recibido' }));
      } catch (err) {
        res.writeHead(500);
        res.end('Error procesando datos');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Ruta no encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor Node.js escuchando en puerto 3000');
});
