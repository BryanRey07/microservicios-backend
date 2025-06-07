const axios = require('axios');

const tareas = [
  { tareaId: 'T-001', descripcion: 'Factura evento 1' },
  { tareaId: 'T-002', descripcion: 'Factura evento 2' },
  { tareaId: 'T-003', descripcion: 'Factura evento 3' },
  { tareaId: 'T-004', descripcion: 'Factura evento 4' },
  { tareaId: 'T-005', descripcion: 'Factura evento 5' }
];

tareas.forEach(async (tarea) => {
  try {
    const res = await axios.post('http://localhost:3000/api/facturar', tarea);
    console.log(`[✅ ${tarea.tareaId}]`, res.data);
  } catch (err) {
    console.error(`[❌ ${tarea.tareaId}]`, err.response?.data || err.message);
  }
});
