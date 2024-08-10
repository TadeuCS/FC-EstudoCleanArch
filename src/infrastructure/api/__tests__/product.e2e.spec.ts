import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E Test for Product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const product1 = await request(app)
            .post('/products')
            .send({ name: 'Product 1', price: 100 });

        expect(product1.status).toBe(201);

        const product2 = await request(app)
            .post('/products')
            .send({ name: 'Product 2', price: 110 });

        expect(product2.status).toBe(201);


        const products = await request(app)
            .get("/products")
            .send();

        expect(products.status).toBe(200);
        expect(products.body.products.length).toBe(2);

        expect(products.body.products[0].name).toBe('Product 1');
        expect(products.body.products[0].price).toBe(100);

        expect(products.body.products[1].name).toBe('Product 2');
        expect(products.body.products[1].price).toBe(110);

    });
})