// api-gateway/index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/facturar', async (req, res) => {
  try {
    // Cambiado a procesador1 directamente
    const respuesta = await axios.post('http://procesador1:3002/procesar', req.body);
    res.json(respuesta.data);
  } catch (error) {
    console.error('❌ Error al procesar la tarea:', error.message);
    res.status(500).json({ error: 'Error interno al facturar', mensaje: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚪 API Gateway corriendo en el puerto ${PORT}`);
});
