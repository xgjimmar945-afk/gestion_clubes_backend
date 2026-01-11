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
  origin: 'http://localhost:5173', // El puerto exacto de tu frontend (sin barra al final)
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
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
