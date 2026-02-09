const request = require('supertest');
const app = require('../index'); // Asegúrate que la ruta es correcta

describe('Clubs API', () => {
    let clubId; // ID para pruebas de GET by ID
    let ramaId; // ID para pruebas de filtrado

    beforeAll(async () => {
        // Obtenemos una rama existente para usar en los tests de filtros
        const res = await request(app).get('/api/ramas');
        if (res.body.datos && res.body.datos.length > 0) {
            ramaId = res.body.datos[0].id_rama;
        }
    });

    // Test GET all
    test('GET /api/clubs → Obtener lista de clubes', async () => {
        const res = await request(app).get('/api/clubs');
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
        
        // Guardamos un ID válido para el siguiente test
        if (res.body.datos.length > 0) {
            clubId = res.body.datos[0].id_club;
        }
    });

    // Test GET graph
    test('GET /api/clubs/graph → Obtener datos de clubes para la gráfica', async () => {
        const res = await request(app).get('/api/clubs/graph');
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
    });

    // Test GET by ID
    test('GET /api/clubs/:id → Obtener club por id', async () => {
        if (!clubId) {
            console.log('Skipping test: no clubId available');
            return;
        }
        const res = await request(app).get(`/api/clubs/${clubId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        // Verificamos que el ID devuelto es el solicitado
        expect(res.body.datos).toHaveProperty('id_club', clubId);
    });

    // Test GET by Rama ID
    test('GET /api/clubs/ramas/:id → Obtener clubes por rama', async () => {
        if (!ramaId) {
            console.log('Skipping test: no ramaId available');
            return;
        }
        const res = await request(app).get(`/api/clubs/ramas/${ramaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
    });

    // --- CORRECCIÓN IMPORTANTE AQUÍ ---
    // Test GET by ID - Not Found (404)
    test('GET /api/clubs/:id → Error 404 cuando club no existe', async () => {
        const res = await request(app).get('/api/clubs/999999');
        
        // Tu controller devuelve 404 cuando no encuentra el club.
        // El test debe esperar 404, NO 200.
        expect(res.statusCode).toBe(404); 
        expect(res.body.ok).toBe(false);
    });

    // Test GET by Rama ID - Empty result
    test('GET /api/clubs/ramas/:id → Obtener clubes por rama inexistente', async () => {
        const res = await request(app).get('/api/clubs/ramas/999999');
        // Aquí si esperamos 200 porque devuelve un array vacío, no un error
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
        expect(res.body.datos.length).toBe(0);
    });

    // --- CASOS DE ERROR (Negative Testing) ---

    // 1. GET 404 - Club no existe
    test('GET /api/clubs/:id → Error 404 cuando club no existe', async () => {
        const res = await request(app).get('/api/clubs/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    // 2. POST Error - Faltan datos (Constraint Error)
    test('POST /api/clubs → Error 500 al crear club sin nombre', async () => {
        const clubInvalido = {
            descripcion: "Club sin nombre obligatorio"
        };

        const res = await request(app)
            .post('/api/clubs')
            .send(clubInvalido);

        // Al violar la restricción `allowNull: false` de 'nombre', salta al catch (500)
        expect(res.statusCode).toBe(500); 
        expect(res.body.ok).toBe(false);
    });

    // 3. PUT 404 - Actualizar club inexistente
    test('PUT /api/clubs/:id → Error 404 al actualizar club inexistente', async () => {
        const res = await request(app)
            .put('/api/clubs/999999')
            .send({ nombre: "Nuevo Nombre Fantasma" });

        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    // 4. DELETE 404 - Borrar club inexistente
    test('DELETE /api/clubs/:id → Error 404 al borrar club inexistente', async () => {
        const res = await request(app).delete('/api/clubs/999999');
        
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
    });

    // 5. GET 404 - Ruta/Endpoint mal escrito (Opcional, prueba general de Express)
    test('GET /api/clubs-que-no-existe → Error 404 ruta no encontrada', async () => {
        const res = await request(app).get('/api/clubs-que-no-existe');
        // Express por defecto devuelve 404 para rutas no definidas
        expect(res.statusCode).toBe(404);
    });
});