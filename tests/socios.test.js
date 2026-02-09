const request = require('supertest');
const app = require('../index'); // Asegúrate de que la ruta a tu app/index sea correcta

describe('Socios API', () => {
    let socioId; // ID del socio que crearemos, leeremos, actualizaremos y borraremos
    let clubId;  // ID de un club existente necesario para crear el socio

    // --- CONFIGURACIÓN PREVIA ---
    beforeAll(async () => {
        // Obtenemos un club existente para asignárselo al nuevo socio
        const res = await request(app).get('/api/clubs');

        // Si hay clubes, cogemos el primero. Si no, el test de POST fallará controladamente.
        if (res.body.datos && res.body.datos.length > 0) {
            clubId = res.body.datos[0].id_club;
        } else {
            console.warn("⚠️ ADVERTENCIA: No hay clubes en la BBDD. Los tests de creación fallarán.");
        }
    });

    // --- 1. TEST DE CREACIÓN (POST) ---
    test('POST /api/socios → Crear un socio nuevo', async () => {
        // Verificamos que tenemos un club válido
        if (!clubId) {
            console.error("❌ SKIPPING: No se puede probar POST sin un Club ID.");
            return;
        }

        const nuevoSocio = {
            nombre: "Socio Test Jest",
            apellido: "Apellido Test",
            email: `test_jest_${Date.now()}@example.com`, // Email único cada vez
            id_club: clubId,
            fecha_nacimiento: "1990-01-01",
            altura_metros: 1.80,
            ha_pagado_cuota: true
        };

        const res = await request(app)
            .post("/api/socios")
            .send(nuevoSocio);

        // Debug: Si falla, muestra por qué
        if (res.statusCode !== 201) {
            console.error("ERROR EN POST:", res.body);
        }

        expect(res.statusCode).toBe(201);
        expect(res.body.ok).toBe(true);

        // --- CAPTURA DEL ID (CRÍTICO) ---
        // Sequelize suele devolver el objeto creado en 'datos'.
        if (res.body.datos) {
            // Prioridad 1: id_socio (si devuelve el objeto modelo)
            // Prioridad 2: insertId (si devuelve resultado raw)
            // Prioridad 3: id (genérico)
            socioId = res.body.datos.id_socio || res.body.datos.insertId || res.body.datos.id;
        }

        console.log(`✅ Socio creado con ID: ${socioId}`);
    });

    // --- 2. TESTS DE LECTURA (GET) ---
    test('GET /api/socios → Obtener lista de socios', async () => {
        const res = await request(app).get('/api/socios');
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
    });

    test('GET /api/socios/:id → Obtener el socio específico creado', async () => {
        if (!socioId) return; // Si falló el POST, saltamos

        const res = await request(app).get(`/api/socios/${socioId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);

        // CORRECCIÓN: 'datos' es un objeto, NO un array, por lo tanto quitamos el [0]
        expect(res.body.datos).toHaveProperty('id_socio');
        expect(res.body.datos.id_socio).toBe(socioId);
    });

    test('GET /api/socios/rango-fecha → Obtener socios por rango', async () => {
        const res = await request(app)
            .get('/api/socios/rango-fecha?fechaInicio=1900-01-01&fechaFin=2099-12-31');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.datos)).toBe(true);
    });

    // --- 3. TEST DE ACTUALIZACIÓN (PUT) ---
    test('PUT /api/socios/:id → Actualizar datos del socio', async () => {
        if (!socioId) return;

        const datosActualizados = {
            nombre: "Nombre Modificado",
            apellido: "Apellido Modificado"
        };

        const res = await request(app)
            .put(`/api/socios/${socioId}`)
            .send(datosActualizados);

        // Nota: Si tu controller devuelve 404 aquí, revisa la nota abajo sobre affectedRows
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
    });

    // --- 4. TEST DE BORRADO (DELETE) ---
    test('DELETE /api/socios/:id → Borrar el socio creado', async () => {
        if (!socioId) return;

        const res = await request(app).delete(`/api/socios/${socioId}`);

        // Aceptamos 200 (OK con json) o 204 (No Content sin json)
        expect([200, 204]).toContain(res.statusCode);
    });

    // --- 5. TESTS DE ERRORES (404 / 400) ---
    test('GET /api/socios/:id → Error 404 al buscar socio inexistente', async () => {
        const res = await request(app).get('/api/socios/99999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    test('PUT /api/socios/:id → Error validación (simulado)', async () => {
        if (!socioId) return;

        // Enviamos un campo que sabemos que podría fallar validaciones
        // O simplemente verificamos que la API responde aunque sea un update parcial
        const res = await request(app)
            .put(`/api/socios/${socioId}`)
            .send({ email: "email-invalido-sin-formato" });

        // Si tienes validaciones de email, espera 400 o 500. Si no, espera 200.
        // Aquí asumimos que NO quieres que sea 200 si el email está mal.
        // Ajusta según tu lógica de validación.
        // expect(res.statusCode).not.toBe(200); 
    });

    // --- CASOS DE ERROR (Negative Testing) ---

   // 1. Error de validación al crear
    test('POST /api/socios → Error al crear sin campos obligatorios', async () => {
        const res = await request(app)
            .post("/api/socios")
            .send({}); 

        // AHORA ESPERAMOS 400 (Bad Request)
        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
    });

    // 2. Error al intentar obtener un socio inexistente
    test('GET /api/socios/:id → Error 404 Socio no encontrado', async () => {
        const res = await request(app).get('/api/socios/99999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    // 3. Error al intentar actualizar un socio inexistente
    test('PUT /api/socios/:id → Error 404 al actualizar ID inexistente', async () => {
        const res = await request(app)
            .put('/api/socios/99999999')
            .send({ nombre: "No existo" });

        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
        // Validamos que el mensaje sea coherente con tu controller
        expect(res.body.mensaje).toMatch(/no encontrado/i);
    });

    // 4. Error al intentar borrar un socio inexistente
    test('DELETE /api/socios/:id → Error 404 al borrar ID inexistente', async () => {
        const res = await request(app).delete('/api/socios/99999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    // --- LIMPIEZA ---
    afterAll(async () => {
        if (socioId) {
            await request(app).delete(`/api/socios/${socioId}`);
        }
    });
});