import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Product 1",
    price: 100,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const output = await createProductUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it("should throw an error when name is missing", () => {
        const productRepository = MockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)

        input.name = ""

        expect(() => createProductUseCase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should throw an error when price is missing", () => {
        const productRepository = MockRepository()
        const createProductUseCase = new CreateProductUseCase(productRepository)
        input.name = "Teste"
        input.price = -1;

        expect(() => createProductUseCase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })
})