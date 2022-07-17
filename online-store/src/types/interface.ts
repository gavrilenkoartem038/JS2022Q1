export interface Car {
    id: string;
    popular: boolean;
    brand: string;
    model: string;
    image: string;
    body: string;
    fuelType: string;
    engineSize: string;
    price: string;
}

export interface FinalObj {
    brand: string[];
    body: string[];
    fuelType: string[];
    engineSize: string[];
    price: string[];
    search: string[];
    popular: boolean;
}
