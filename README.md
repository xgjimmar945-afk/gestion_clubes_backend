# Clubes de Ciencia - Backend

Backend API REST para la gestión de clubes de ciencia, desarrollado con Node.js, Express y MySQL.

## 📋 Tabla de Contenidos

- [Repositorio](#-repositorio)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)

## 🔗 Repositorio

**GitHub:** [https://github.com/Epsiloon66/gestion_clubes_backend](https://github.com/Epsiloon66/gestion_clubes_backend)


## 📦 Configurar la base de datos

Ejecuta el script SQL ubicado en `sql/clubes_ciencia (1).sql` en tu servidor MySQL:

```bash
mysql -u root -p < sql/clubes_ciencia\ \(1\).sql
```

O importa el archivo manualmente usando MySQL Workbench u otra herramienta de gestión.

## ⚙️ Configuración

### Archivo de Variables de Entorno (config.js)

```js
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de la Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=clubes_ciencia
```

### Valores por Defecto

Si no se especifica un archivo `.env`, el sistema usará los siguientes valores por defecto:

| Variable      | Valor por Defecto |
| ------------- | ----------------- |
| `PORT`        | 3000              |
| `DB_HOST`     | localhost         |
| `DB_PORT`     | 3306              |
| `DB_USER`     | root              |
| `DB_PASSWORD` | test              |
| `DB_NAME`     | clubes_ciencia    |
| `SECRET_KEY`  | default_secret    |

## ▶️ Ejecución

### Modo Desarrollo (con auto-recarga)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000` (o el puerto especificado en `.env`).

### Verificar la Conexión

Si todo está configurado correctamente, verás en la consola:

```
Servidor escuchando en el puerto 3000
Conexión exitosa a la base de datos MySQL
```

## 📁 Estructura del Proyecto

```
clubes_ciencia_backend/
├── config/              # Configuración de la aplicación
│   ├── config.js        # Variables de entorno
│   ├── sequelize.js     # Configuración de Sequelize
│   └── sequelize-auto.js
├── controllers/         # Lógica de negocio
│   ├── clubController.js
│   ├── socioController.js
│   └── ramaController.js
├── models/             # Modelos de datos (Sequelize)
│   ├── Club.js
│   ├── Socio.js
│   ├── Rama.js
│   └── init-models.js
├── routes/             # Definición de rutas
│   ├── clubRoutes.js
│   ├── socioRoutes.js
│   └── ramaRoutes.js
├── services/           # Servicios de datos
│   ├── clubService.js
│   ├── socioService.js
│   └── ramaService.js
├── utils/              # Utilidades
│   └── logger.js
├── request/            # Archivos de prueba REST
│   ├── clubRequest.rest
│   ├── socioRequest.rest
│   └── ramaRequest.rest
├── sql/                # Scripts SQL
│   └── clubes_ciencia (1).sql
├── index.js            # Punto de entrada
├── package.json
└── README.md
```

## 🌐 API Endpoints

### Clubes (`/api/clubs`)

| Método | Endpoint               | Descripción                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/clubs`           | Obtener todos los clubes      |
| GET    | `/api/clubs/:id`       | Obtener un club por ID        |
| GET    | `/api/clubs/ramas/:id` | Obtener clubes por ID de rama |
| POST   | `/api/clubs`           | Crear un nuevo club           |
| PUT    | `/api/clubs/:id`       | Actualizar un club            |
| DELETE | `/api/clubs/:id`       | Eliminar un club              |

### Socios (`/api/socios`)

| Método | Endpoint                  | Descripción                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/socios`             | Obtener todos los socios           |
| GET    | `/api/socios/:id`         | Obtener un socio por ID            |
| GET    | `/api/socios/club/:id`    | Obtener socios por ID de club      |
| GET    | `/api/socios/rango-fecha` | Obtener socios por rango de fechas |
| POST   | `/api/socios`             | Crear un nuevo socio               |
| PUT    | `/api/socios/:id`         | Actualizar un socio                |
| DELETE | `/api/socios/:id`         | Eliminar un socio                  |

### Ramas (`/api/ramas`)

| Método | Endpoint         | Descripción             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/ramas`     | Obtener todas las ramas |
| GET    | `/api/ramas/:id` | Obtener una rama por ID |


## 🗄️ Base de Datos

### Diagrama de Entidades

```
RAMA
├── id_rama (PK)
└── nombre_rama

CLUB
├── id_club (PK)
├── nombre
├── descripcion
├── direccion
├── fecha_fundacion
├── id_rama (FK → RAMA)
├── presupuesto_anual
└── esta_activo

SOCIO
├── id_socio (PK)
├── nombre
├── apellido
├── email (UNIQUE)
├── id_club (FK → CLUB)
├── fecha_nacimiento
├── altura_metros
└── ha_pagado_cuota
```

### Relaciones

- Una **RAMA** puede tener muchos **CLUBES**
- Un **CLUB** puede tener muchos **SOCIOS**
- Un **SOCIO** pertenece a un **CLUB**


## 🔧 Solución de Problemas

### CORS errors

El backend está configurado para aceptar peticiones desde `http://localhost:5173` (frontend). Si tu frontend corre en otro puerto, modifica la configuración CORS en `index.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:TU_PUERTO",
    credentials: true,
  })
);
```
