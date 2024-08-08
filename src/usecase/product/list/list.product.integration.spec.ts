import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

describe("Test list all products use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product1 = ProductFactory.createDefault("Product Test 1", 125);

        const product2 = ProductFactory.createDefault("Product Test 2", 100);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const list = await usecase.execute({});

        expect(list).toBeDefined();
        expect(list.products).toHaveLength(2);
        expect(list.products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price,
        });
        expect(list.products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price,
        });
    });
})