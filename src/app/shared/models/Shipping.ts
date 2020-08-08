
export class Shipping {
    name: string;
    surname: string;
    street: string;
    postcode: number;
    city: string;
    region: string;

    constructor(name: string, surname: string, street: string, postcode: number, city: string, region: string) {
        this.name = name;
        this.surname = surname;
        this.street = street;
        this.postcode = postcode;
        this.city = city;
        this.region = region;
    }
}
