import { UserModel } from './user';
import { ReviewModel } from './review';
import { CardModel } from './card';
import { TicketModel } from './ticket';
import { TableModel } from './table';
import { ProductModel } from './product';
import { CategoryModel } from './category';
import { SessionModel } from './session';



ReviewModel.belongsTo(TicketModel, {
    foreignKey: 'ticketId'
});  

CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId'
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId'
});  

SessionModel.belongsTo(UserModel, {
    foreignKey: 'userId'
});
  
TableModel.hasMany(TicketModel, {
    foreignKey: 'tableId'
});  

// Add association to Table model
TicketModel.belongsTo(TableModel, {
    foreignKey: 'tableId'
});  

// Add association to Card model
TicketModel.belongsTo(CardModel, {
  foreignKey: 'cardId'
});

// Add association to User model
TicketModel.belongsTo(UserModel, {
  foreignKey: 'userId'
});
