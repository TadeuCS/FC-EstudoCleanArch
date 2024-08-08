import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
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

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.createDefault("Product Test", 125);

        await productRepository.create(product);

        product.changeName("Product Test Updated");
        product.changePrice(100);

        const productUpdated = await usecase.execute(product);

        expect(productUpdated).toBeDefined();
        expect(productUpdated.name).toBe("Product Test Updated");
        expect(productUpdated.price).toBe(100);
    });
})