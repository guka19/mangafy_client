export interface User {
    _id:       string;
    firstName: string;
    lastName:  string;
    email:     string;
    address?:   Address;
    role:      string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface Address {
    country:       string;
    city:          string;
    streetAddress: string;
    _id:           string;
}