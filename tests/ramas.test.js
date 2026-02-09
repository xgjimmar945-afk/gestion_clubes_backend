const request = require('supertest');
const app = require('../index');

describe('Ramas API', () => {
    let ramaId;

    // Test GET all
    test('GET /api/ramas → Obtener lista de ramas', async () => {
        const res = await request(app).get('/api/ramas');
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(Array.isArray(res.body.datos)).toBe(true);
        if (res.body.datos.length > 0) {
            ramaId = res.body.datos[0].id_rama;
        }
    });

    // Test GET by ID
    test('GET /api/ramas/:id → Obtener rama por id', async () => {
        if (!ramaId) {
            console.log('Skipping test: no ramaId available');
            return;
        }
        const res = await request(app).get(`/api/ramas/${ramaId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.datos).toHaveProperty('id_rama', ramaId);
    });

    // Test GET by ID - Not Found (404)
    test('GET /api/ramas/:id → Error 404 cuando rama no existe', async () => {
        const res = await request(app).get('/api/ramas/999999');
        expect(res.statusCode).toBe(404);
        expect(res.body.ok).toBe(false);
        expect(res.body.mensaje).toContain('no encontrado');
        expect(Array.isArray(res.body.datos)).toBe(false);
    });
});
