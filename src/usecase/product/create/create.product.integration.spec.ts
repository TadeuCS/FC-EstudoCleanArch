import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = ProductFactory.createDefault("Product Test", 125);

        const result = await usecase.execute(product);

        const productSaved = await productRepository.find(result.id);

        expect(productSaved).toBeDefined();
        expect(productSaved.name).toBe("Product Test");
        expect(productSaved.price).toBe(125);
    });
})