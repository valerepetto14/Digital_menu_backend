declare type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    type: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    token?: string;
}