import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 100);

const input = {
    id: "123",
    name: "Product 1",
    price: 100,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test Update Product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
