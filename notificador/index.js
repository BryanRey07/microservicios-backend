// notificador/index.js
const express = require('express');
const app = express();
const PORT = 4001;

app.use(express.json());

app.post('/notificar', (req, res) => {
  const { dispositivoId, mensaje } = req.body;

  // Simulación del envío de push notification
  console.log(`📲 Enviando notificación al dispositivo ${dispositivoId}: ${mensaje}`);

  res.json({ estado: 'notificación enviada' });
});

app.listen(PORT, () => {
  console.log(`🔔 Servicio notificador activo en el puerto ${PORT}`);
});
