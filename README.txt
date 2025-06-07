# Proyecto: Arquitectura de Microservicios con Docker y Paralelismo en Node.js

## Descripción General

Este proyecto simula una arquitectura distribuida con los siguientes componentes:

* **API Gateway** (Node.js): Recibe las solicitudes del cliente y redirige tareas.
* **Procesador** (Node.js): Procesa tareas usando `worker_threads` en paralelo.
* **Notificador** (Node.js): Simula el envío de notificaciones.
* **NGINX**: Balanceador de carga entre múltiples procesadores.
* **Docker & Docker Compose**: Orquestación de los microservicios.

## Estructura de Carpetas

```
/microservicios_backend
  |- api-gateway
  |- procesador1
  |- procesador2
  |- notificador
  |- nginx
  |- docker-compose.yml
```

## Requisitos

* Docker Desktop instalado
* Postman para pruebas

## Pasos para levantar los servicios

1. Asegúrate de estar en la carpeta `microservicios_backend`
2. Ejecuta:

```bash
docker compose down
```

```bash
docker compose up --build
```

Esto construirá y levantará todos los contenedores.

## Prueba desde Postman

**Endpoint:**

```
POST http://localhost:3000/api/facturar
```

**Body (JSON):**

```json
{
  "tareaId": "T-001",
  "descripcion": "Procesar factura de evento"
}
```

**Respuesta esperada:**

```json
{
  "status": "Tarea en proceso",
  "tareaId": "T-001"
}
```

## Verificación en terminal

* En la terminal del contenedor `procesador`, deberías ver:

  ```
  Tarea completada: { tareaId: 'T-001', resultado: 499999999067109000 }
  ```
* En el contenedor `notificador`, deberías ver:

  ```
  📢 Enviando notificación al dispositivo usuario123: Tarea T-001 completada: Procesar factura de evento
  ```

## Explicación técnica

* El `gateway` envía las solicitudes a NGINX.
* NGINX balancea entre `procesador1` y `procesador2`.
* El procesador lanza un hilo usando `Worker` para simular trabajo pesado.
* Al finalizar, notifica al servicio de `notificador`.

## Notas finales

* El procesamiento paralelo está implementado mediante `worker_threads`, lo cual permite usar todos los hilos de CPU disponibles sin bloquear el hilo principal.
* Las rutas están correctamente direccionadas gracias a la configuración de NGINX.
