export interface InputListProductDto {
    // page: number;
    // pageSize: number;
}

type OutputProductDto = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDto {
    // totalCount: number;
    products: OutputProductDto[];
}