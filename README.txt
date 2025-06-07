Proyecto: Arquitectura de Microservicios con Docker y Paralelismo en Node.js

Descripción General

Este proyecto simula una arquitectura distribuida con los siguientes componentes:

- API Gateway (Node.js): Recibe las solicitudes del cliente y redirige tareas.
- Procesador (Node.js): Procesa tareas usando worker_threads en paralelo.
- Notificador (Node.js): Simula el envío de notificaciones.
- NGINX: Balanceador de carga entre múltiples procesadores.
- Docker & Docker Compose: Orquestación de los microservicios.

Estructura de Carpetas

/microservicios_backend
  |- api-gateway
  |- procesador1
  |- procesador2
  |- notificador
  |- nginx
  |- docker-compose.yml

Requisitos

- Docker Desktop instalado
- Postman para pruebas

Pasos para levantar los servicios

1. Asegúrate de estar en la carpeta microservicios_backend
2. Ejecuta:

docker compose down
docker compose up --build

Esto construirá y levantará todos los contenedores.

Prueba desde Postman

Endpoint:
POST http://localhost:3000/api/facturar

Body (JSON):

{
  "tareaId": "T-001",
  "descripcion": "Procesar factura de evento"
}

Respuesta esperada:

{
  "status": "Tarea en proceso",
  "tareaId": "T-001"
}

Verificación en terminal

En la terminal del contenedor procesador, deberías ver:
Tarea completada: { tareaId: 'T-001', resultado: 499999999067109000 }

En el contenedor notificador, deberías ver:
📢 Enviando notificación al dispositivo usuario123: Tarea T-001 completada: Procesar factura de evento

🧪 Prueba de carga paralela

También puedes probar el procesamiento paralelo ejecutando múltiples tareas al mismo tiempo usando el script test-carga.js.

Paso para ejecutarlo:

node test-carga.js

Este script envía 5 tareas distintas al endpoint /api/facturar, simulando una carga real con procesamiento paralelo.

Ejemplo de salida esperada:

[✅ T-001] { status: 'Tarea en proceso', tareaId: 'T-001' }
[✅ T-002] { status: 'Tarea en proceso', tareaId: 'T-002' }
[✅ T-003] { status: 'Tarea en proceso', tareaId: 'T-003' }
...

Revisa los logs en procesador1, procesador2 y notificador para confirmar que las tareas se distribuyeron y se ejecutaron correctamente en paralelo.

Explicación técnica

- El gateway envía las solicitudes a NGINX.
- NGINX balancea entre procesador1 y procesador2.
- El procesador lanza un hilo usando Worker para simular trabajo pesado.
- Al finalizar, notifica al servicio de notificador.

Notas finales

- El procesamiento paralelo está implementado mediante worker_threads, lo cual permite usar todos los hilos de CPU disponibles sin bloquear el hilo principal.
- Las rutas están correctamente direccionadas gracias a la configuración de NGINX.

Evidencia recomendada:
- Captura de los contenedores corriendo en Docker Desktop
- Captura de la solicitud en Postman con respuesta exitosa
- Captura de logs en procesador y notificador
