export interface IWhyUsCards {
    id: number,
    icon: string,
    description: string
}

export interface IRates {
    id: number,
    icon: string,
    name: string,
    description: string,
    price: string,
    discountPrice: string,
    installment?: string,
    services: string[],
    color: string,
    active: boolean,
    textColor: string,
}