📘 Proyecto: Control de Accesos con Blockchain, FastAPI y PostgreSQL
🎯 Problema a Resolver
En una organización, los accesos de proveedores y técnicos externos a dependencias críticas suelen gestionarse de forma manual (correos, hojas de cálculo, registros físicos).
Esto genera varios problemas:

Falta de seguridad: no hay evidencia verificable de quién autorizó el acceso.

Dificultad de auditoría: los registros pueden alterarse o perderse.

Exposición de datos sensibles: si se guardan documentos completos en sistemas inseguros.

La solución propuesta separa responsabilidades:

PostgreSQL guarda los datos completos del acceso (proveedor, dependencia, fecha, motivo).

Blockchain (Ganache + contrato Solidity) guarda evidencia verificable mediante hashes, sin exponer datos sensibles.

FastAPI expone endpoints REST para registrar y verificar accesos.

Swagger permite probar la API sin necesidad de frontend.

Docker Compose orquesta todos los servicios localmente.

🎯 Objetivos
Implementar un contrato inteligente en Solidity para registrar accesos con evidencia inmutable.

Desplegar el contrato en una blockchain local (Ganache).

Construir una API con FastAPI para interactuar con la base de datos y la blockchain.

Guardar datos completos en PostgreSQL y solo hashes en blockchain.

Probar la API mediante Swagger.

Orquestar todos los servicios con Docker Compose.

Usar Hardhat y Ganache como guía didáctica para comprender cómo se compilan, despliegan y verifican contratos inteligentes, y ver resultados concretos.

🛠️ Arquitectura
text
Usuario / Swagger
      |
      v
API Accesos - FastAPI
      |
      | guarda datos completos
      v
PostgreSQL

      |
      | registra hashes
      v
Contrato AccessControl
      |
      v
Ganache - blockchain local
Servicios usados:

hardhat-node: nodo Ganache local en el puerto 8545.

contract-tools: contenedor con Hardhat para compilar y desplegar contratos.

postgres: base de datos PostgreSQL.

api-accesos: API FastAPI con Swagger en el puerto 8001.

📂 Estructura del Proyecto
text
control_acceso/
  README.md
  .env.example
  docker-compose.yml
  Dockerfile
  hardhat.config.ts
  contracts/
    AccessControl.sol
  scripts/
    crear-acceso.ts
    deploy-registro-accesos.ts
  api-accesos/
    main.py
    models.py
    schemas.py
    database.py
    blockchain.py
    requirements.txt
    Dockerfile
📋 Requisitos
Instalar previamente:

Docker Desktop

Node.js 22 o superior (para probar Hardhat localmente)

PowerShell en Windows (para pruebas rápidas)

Verificar versiones:

bash
docker --version
docker compose version
node --version
npm --version
🔑 Variables de Entorno (.env)
env
GANACHE_RPC_URL=http://hardhat-node:8545
GANACHE_PRIVATE_KEY=0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
CONTRACT_ADDRESS=0xDIRECCION_DEL_CONTRATO_DESPLEGADO

POSTGRES_DB=accesos_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
📌 Nota: CONTRACT_ADDRESS se reemplaza con la dirección real que obtienes al desplegar el contrato en Ganache. Ejemplo:

Code
Contrato desplegado correctamente
Dirección del contrato: 0x5FbDB2315678afecb367f032d93F642f64180aa3
🚀 Pasos de Ejecución
1. Compilar y probar contrato con Hardhat
bash
npm install
npx hardhat compile
npx hardhat run scripts/crear-acceso.ts
📌 Esto permitió confirmar que el contrato AccessControl.sol compila y registra/verifica accesos en una red temporal.

2. Levantar Ganache con Docker Compose
bash
docker compose up -d hardhat-node
docker compose ps
Ganache quedó disponible en:

Code
http://localhost:8545
3. Desplegar el contrato en Ganache
bash
docker compose run --rm contract-tools npx hardhat run scripts/deploy-registro-accesos.ts --network ganache
📌 El resultado fue la dirección del contrato (0x...), que se copió en .env.

4. Levantar PostgreSQL y FastAPI
bash
docker compose up -d --build postgres api-accesos
docker compose ps
Swagger quedó disponible en:

Code
http://localhost:8001/docs
5. Probar API
Endpoints principales:

GET /health → estado de la API

POST /accesos → registrar acceso

GET /accesos/{codigo} → consultar acceso en PostgreSQL

GET /accesos/{codigo}/verificar → verificar contra blockchain

Ejemplo de body para POST /accesos:

json
{
  "codigo_acceso": "ACC-2026-001",
  "proveedor": "Proveedor XYZ",
  "dependencia": "Data Center Quito",
  "fecha": "2026-06-21",
  "motivo": "Mantenimiento de servidores",
  "documento": "Orden de trabajo #123"
}
📊 Resultados Obtenidos
Hardhat: compiló y probó el contrato en una red temporal, confirmando la lógica de registro/verificación.

Ganache: desplegó el contrato y mantuvo el estado de la blockchain local.

FastAPI + PostgreSQL: almacenaron los datos completos de accesos y expusieron endpoints REST.

Swagger: verificó el flujo completo (crear acceso, consultar, verificar contra blockchain).

✅ Resumen
Este proyecto integra blockchain y bases de datos tradicionales para resolver un problema real de control de accesos:

PostgreSQL almacena los datos completos.

Blockchain garantiza evidencia inmutable.

FastAPI expone endpoints claros y probados con Swagger.

Docker Compose facilita la orquestación de todos los servicios.

Hardhat y Ganache se usaron como guía didáctica para comprender cómo se compilan, despliegan y verifican contratos inteligentes, y ver resultados concretos.

🎯 Conclusión
La práctica demuestra cómo combinar tecnologías modernas para resolver un problema de seguridad y auditoría en accesos.

Se logra un sistema confiable, replicable y fácil de probar.

La separación de responsabilidades evita exponer datos sensibles en blockchain.

El uso de Hardhat y Ganache permitió entender paso a paso cómo funciona el despliegue y ver resultados concretos.

El proyecto sirve como base para escalar hacia Kubernetes, multi-cloud y despliegues más complejos.
