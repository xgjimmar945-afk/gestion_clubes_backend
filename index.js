// ============================================
// IMPORTACIONES
// ============================================
const express = require("express");
const path = require("path");
const cors = require("cors");

// Rutas de la API
const clubRoutes = require("./routes/clubRoutes");
const ramaRoutes = require("./routes/ramaRoutes");
const socioRoutes = require("./routes/socioRoutes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();
const port = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE - PARSEO
// ============================================
app.use(express.json());

// ============================================
// MIDDLEWARE - CORS - Cualquier origen
// ============================================
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Permite cookies y headers de autorización
}));

// ============================================
// MIDDLEWARE - ARCHIVOS ESTÁTICOS
// ============================================
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// RUTAS - API REST
// ============================================
app.use("/api/clubs", clubRoutes);
app.use("/api/ramas", ramaRoutes);
app.use("/api/socios", socioRoutes)
// ============================================
// RUTAS - SPA (Catch-all)
// ============================================
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// ============================================
// SERVIDOR
// ============================================
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}

module.exports = app;
