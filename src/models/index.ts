import { Sequelize } from 'sequelize';
import { initCard } from './card';
import { initCategory } from './category';
import { initOptIngredient } from './optIngredient';
import { initOptIngredientProduct } from './optIngredientProduct';
import { initProduct } from './product';
import { initReview } from './review';
import { initSubCategory } from './subCategory';
import { initTable } from './table';
import { initTicket } from './ticket';
import { initTicketRow } from './orderRow';
import { initUser } from './user';
import { initRelationships } from './relationships';

export const initModels = (sequelize: Sequelize) => {
    try {
        initUser(sequelize);
        initCard(sequelize);
        initCategory(sequelize);
        initSubCategory(sequelize);
        initProduct(sequelize);
        initOptIngredient(sequelize);
        initOptIngredientProduct(sequelize);
        initTable(sequelize);
        initTicket(sequelize);
        initTicketRow(sequelize);
        initReview(sequelize);
        initRelationships();
    } catch (error) {
        throw error;
    }
};
