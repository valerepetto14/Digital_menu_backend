import { Review } from './review';
import { Card} from './card';
import { Ticket } from './ticket';
import { Product } from './product';
import { Category} from './category';
import { SubCategory } from './subCategory';
import { OptIngredientProduct } from './optIngredientProduct';
import { TicketRow } from './ticketsRow';
import { OptIngredient } from './optIngredient';
import { Table } from './table';
// import { TicketRowOptIngredientModel } from './ticketsRowOptIngredient';

//Review <--> Ticket

export const initRelationships = () => {
    Review.belongsTo(Ticket, {
        foreignKey: 'ticketId'
    });


    Ticket.hasOne(Review, {
        foreignKey: 'ticketId'
    });

    Ticket.belongsToMany(Product, {
        through: TicketRow,
        foreignKey: 'ticketId',
        as: 'products'
    });


    Ticket.belongsTo(Card, {
        foreignKey: 'cardId'
    });

    Ticket.belongsTo(Table, {
        foreignKey: 'tableId',
        as: 'table'
    });



    Product.belongsToMany(Ticket, {
        through: TicketRow,
        foreignKey: 'productId',
    });

    Product.belongsToMany(OptIngredient, {
        through: OptIngredientProduct,
        foreignKey: 'productId',
        otherKey: 'optIngredientId',
        as : 'optIngredients'
    });

    Product.belongsTo(SubCategory, {
        foreignKey: 'subCategoryId',
        as: 'subCategories'
    });

    Product.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'categories'
    });


    TicketRow.belongsTo(Ticket, {
        foreignKey: 'ticketId'
    });

    TicketRow.belongsTo(Product, {
        foreignKey: 'productId'
    });


    OptIngredient.belongsToMany(Product, {
        through: OptIngredientProduct,
        foreignKey: 'optIngredientId',
        otherKey: 'productId',
    });




    Category.hasMany(SubCategory, {
        foreignKey: 'categoryId',
        as: 'subCategories'
    });

    Category.hasMany(Product, {
        foreignKey: 'categoryId',
    });





    SubCategory.belongsTo(Category, {
        foreignKey: 'categoryId'
    });

    SubCategory.hasMany(Product, {
        foreignKey: 'subCategoryId'
    });



    Table.hasMany(Ticket, {
        foreignKey: 'tableId',
        as: 'tickets'
    });
}
