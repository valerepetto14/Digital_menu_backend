import { ReviewModel } from './review';
import { CardModel } from './card';
import { TicketModel } from './ticket';
import { ProductModel } from './product';
import { CategoryModel } from './category';
import { SubCategoryModel } from './subCategory';
import { OptIngredientProductModel } from './optIngredientProduct';
import { TicketRowModel } from './ticketsRow';
import { OptIngredientModel } from './optIngredient';
// import { TicketRowOptIngredientModel } from './ticketsRowOptIngredient';

//Review <--> Ticket

ReviewModel.belongsTo(TicketModel, {
    foreignKey: 'ticketId'
});

TicketModel.hasOne(ReviewModel, {
    foreignKey: 'ticketId'
});

// Category <--> Product

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId'
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    as: 'category'
});

// Add association to Card model
// Ticket <--> Card

TicketModel.belongsTo(CardModel, {
    foreignKey: 'cardId'
});

// Product <--> Ticket

ProductModel.belongsToMany(TicketModel, {
    through: TicketRowModel,
    foreignKey: 'productId',
});

TicketModel.belongsToMany(ProductModel, {
    through: TicketRowModel,
    foreignKey: 'ticketId',
    as: 'products'
});

// Product <--> OptIngredient

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

// TicketRow <--> TicketRowOptIngredient

// TicketRowOptIngredientModel.belongsTo(TicketRowModel, {
//     foreignKey: 'ticketRowId'
// })

// TicketRowModel.hasMany(TicketRowOptIngredientModel, {
//     foreignKey: 'ticketRowId'
// })

// Category <--> SubCategory

CategoryModel.hasMany(SubCategoryModel, {
    foreignKey: 'categoryId',
    as: 'subCategories'
});
SubCategoryModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});

// Product <--> Category

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId',
});
ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});

// Product <--> SubCategory

SubCategoryModel.hasMany(ProductModel, {
    foreignKey: 'subCategoryId'
});
ProductModel.belongsTo(SubCategoryModel, {
    foreignKey: 'subCategoryId',
    as: 'subCategory'
});


