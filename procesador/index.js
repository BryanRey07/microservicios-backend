const express = require('express');
const { Worker } = require('worker_threads');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/procesar', (req, res) => {
  const { tareaId, descripcion } = req.body;

  const worker = new Worker('./trabajo_pesado.js', {
    workerData: { tareaId, descripcion }
  });

  worker.on('message', async (resultado) => {
    console.log('Tarea completada:', resultado);

    // ✅ Puerto corregido de 3002 a 4001
    try {
      await axios.post('http://notificador:4001/notificar', {
        dispositivoId: 'usuario123',
        mensaje: `Tarea ${tareaId} completada: ${descripcion}`
      });
    } catch (err) {
      console.error('Error al notificar:', err.message);
    }

    res.json({ status: 'Tarea en proceso', tareaId });
  });

  worker.on('error', (err) => {
    console.error('Error en worker:', err);
    res.status(500).json({ error: 'Error procesando tarea' });
  });
});

app.listen(3002, () => {
  console.log('Procesador activo en puerto 3002');
});
