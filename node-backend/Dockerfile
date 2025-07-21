# Imagen base
FROM node:18

# Crear carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY server.js .

# Instalar dependencias (en este caso, nada más que node)
RUN npm install

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
