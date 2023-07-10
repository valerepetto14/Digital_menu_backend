export interface IOptIngredientProductOrderRow {
    optIngredientId: string;
    name?: string;
    quantity: number;
    unitPrice: string | undefined;
}

export interface IVariantIngredients {
    name: string;
}

export enum ProductStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SIN_STOCK = 'sin stock',
}

export enum OrderStatus {
    SENT = 'sent',
    IN_PROGRESS = 'in progress',
    DONE = 'done',
}

export enum TicketStatus {
    PAID = 'paid',
    IN_PROGRESS = 'in progress',
}

export enum OptIngredientStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SIN_STOCK = 'sin stock',
}

export enum CategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum SubCategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum UserTypes {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
}
