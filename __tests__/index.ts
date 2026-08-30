import request from 'supertest';
import {app} from "../src/index.js";


describe('Check / request', () => {
    it('returns 200 and a welcome message', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({message: 'Hello Backend!'});
    })
})
