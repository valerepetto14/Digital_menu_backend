import './ticketsRow'
import { ReviewModel } from './review';
import { CardModel } from './card';
import { TicketModel } from './ticket';
import { ProductModel } from './product';
import { CategoryModel } from './category';
import { OptIngredientProductModel } from './optIngredientProduct';
import { TicketRowModel } from './ticketsRow';
import { OptIngredientModel } from './optIngredient';
import { TicketRowOptIngredientModel } from './ticketsRowOptIngredient';


ReviewModel.belongsTo(TicketModel, {
    foreignKey: 'ticketId'
});

TicketModel.hasOne(ReviewModel, {
    foreignKey: 'ticketId'
});

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId'
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});

// Add association to Card model
TicketModel.belongsTo(CardModel, {
    foreignKey: 'cardId'
});

ProductModel.belongsToMany(TicketModel, {
    through: TicketRowModel,
    foreignKey: 'productId',
});

TicketModel.belongsToMany(ProductModel, {
    through: TicketRowModel,
    foreignKey: 'ticketId',
    as: 'products'
});

ProductModel.belongsToMany(OptIngredientModel, {
    through: OptIngredientProductModel,
    foreignKey: 'productId',
    otherKey: 'optIngredientId',
    as : 'optIngredients'
});

OptIngredientModel.belongsToMany(ProductModel, {
    through: OptIngredientProductModel,
    foreignKey: 'optIngredientId',
    otherKey: 'productId',
});

TicketRowOptIngredientModel.belongsTo(TicketRowModel, {
    foreignKey: 'ticketRowId'
})

TicketRowModel.hasMany(TicketRowOptIngredientModel, {
    foreignKey: 'ticketRowId'
})
