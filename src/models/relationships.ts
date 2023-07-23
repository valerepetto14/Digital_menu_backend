import { Review } from './review';
import { Card } from './card';
import { Ticket } from './ticket';
import { Product } from './product';
import { Category } from './category';
import { SubCategory } from './subCategory';
import { OptIngredientProduct } from './optIngredientProduct';
import { OrderRow } from './orderRow';
import { OptIngredient } from './optIngredient';
import { Table } from './table';
import { Order } from './order';
// import { TicketRowOptIngredientModel } from './ticketsRowOptIngredient';

//Review <--> Ticket

export const initRelationships = () => {
    //Review Relationship
    Review.belongsTo(Ticket, {
        foreignKey: 'ticketId',
    });

    //Ticket Relationship
    Ticket.hasOne(Review, {
        foreignKey: 'ticketId',
    });

    Ticket.belongsTo(Card, {
        foreignKey: 'cardId',
    });

    Ticket.belongsTo(Table, {
        foreignKey: 'tableId',
        as: 'table',
    });

    //Order Relationship
    Order.belongsToMany(Product, {
        through: OrderRow,
        foreignKey: 'orderId',
    });

    // Order.belongsTo(Card, {
    //     foreignKey: 'cardId',
    // });

    // Order.belongsTo(Table, {
    //     foreignKey: 'tableId',
    //     as: 'table',
    // });

    //Product Relationship
    Product.belongsToMany(Order, {
        through: OrderRow,
        foreignKey: 'productId',
    });

    Product.belongsToMany(OptIngredient, {
        through: OptIngredientProduct,
        foreignKey: 'productId',
        otherKey: 'optIngredientId',
        as: 'optIngredients',
    });

    Product.belongsTo(SubCategory, {
        foreignKey: 'subCategoryId',
        as: 'subCategory',
    });

    Product.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category',
    });

    //TicketRow Relationship
    OrderRow.belongsTo(Order, {
        foreignKey: 'orderId',
    });

    OrderRow.belongsTo(Product, {
        foreignKey: 'productId',
    });

    OptIngredient.belongsToMany(Product, {
        through: OptIngredientProduct,
        foreignKey: 'optIngredientId',
        otherKey: 'productId',
    });

    //category Relationship
    Category.hasMany(SubCategory, {
        foreignKey: 'categoryId',
        as: 'subCategories',
    });

    Category.hasMany(Product, {
        foreignKey: 'categoryId',
    });

    //SubCategory Relationship
    SubCategory.belongsTo(Category, {
        foreignKey: 'categoryId',
    });

    SubCategory.hasMany(Product, {
        foreignKey: 'subCategoryId',
    });

    //Card Relationship
    Table.hasMany(Ticket, {
        foreignKey: 'tableId',
        as: 'tickets',
    });
};
