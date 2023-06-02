import { ReviewModel } from './review';
import { CardModel } from './card';
import { TicketModel } from './ticket';
import { ProductModel } from './product';
import { CategoryModel } from './category';
import { SubCategoryModel } from './subCategory';
import { OptIngredientProductModel } from './optIngredientProduct';
import { TicketRowModel } from './ticketsRow';
import { OptIngredientModel } from './optIngredient';
import { TableModel } from './table';
// import { TicketRowOptIngredientModel } from './ticketsRowOptIngredient';

//Review <--> Ticket

ReviewModel.belongsTo(TicketModel, {
    foreignKey: 'ticketId'
});


TicketModel.hasOne(ReviewModel, {
    foreignKey: 'ticketId'
});

TicketModel.belongsToMany(ProductModel, {
    through: TicketRowModel,
    foreignKey: 'ticketId',
    as: 'products'
});


TicketModel.belongsTo(CardModel, {
    foreignKey: 'cardId'
});

TicketModel.belongsTo(TableModel, {
    foreignKey: 'tableId',
    as: 'table'
});



ProductModel.belongsToMany(TicketModel, {
    through: TicketRowModel,
    foreignKey: 'productId',
});

ProductModel.belongsToMany(OptIngredientModel, {
    through: OptIngredientProductModel,
    foreignKey: 'productId',
    otherKey: 'optIngredientId',
    as : 'optIngredients'
});

ProductModel.belongsTo(SubCategoryModel, {
    foreignKey: 'subCategoryId',
    as: 'subCategory'
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});





OptIngredientModel.belongsToMany(ProductModel, {
    through: OptIngredientProductModel,
    foreignKey: 'optIngredientId',
    otherKey: 'productId',
});




CategoryModel.hasMany(SubCategoryModel, {
    foreignKey: 'categoryId',
    as: 'subCategories'
});

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId',
});





SubCategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});

SubCategoryModel.hasMany(ProductModel, {
    foreignKey: 'subCategoryId'
});



TableModel.hasMany(TicketModel, {
    foreignKey: 'tableId',
    as: 'tickets'
});
