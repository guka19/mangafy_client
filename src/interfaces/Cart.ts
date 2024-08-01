export interface Cart {
    _id:       string;
    user:      string;
    items:     Item[];
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

export interface Item {
    mangaId:  string;
    quantity: number;
    _id:      string;
}