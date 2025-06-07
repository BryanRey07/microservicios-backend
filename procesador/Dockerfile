# Imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias necesarias
RUN npm install express axios

# Exponer el puerto 3001
EXPOSE 3001

# Comando que se ejecutará al iniciar el contenedor
CMD ["node", "index.js"]
