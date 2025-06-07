const { parentPort, workerData } = require('worker_threads');

function tareaPesada() {
  // Simulación de una tarea intensiva en CPU
  let count = 0;
  for (let i = 0; i < 1e9; i++) {
    count += i;
  }
  return count;
}

const resultado = tareaPesada();

parentPort.postMessage({
  tareaId: workerData.tareaId,
  resultado
});
