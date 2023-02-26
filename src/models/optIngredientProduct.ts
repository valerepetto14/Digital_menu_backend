import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { OptIngredientModel } from './optIngredient';
import { ProductModel } from './product';

export interface OptIngredientProduct extends Model {
    productId: string;
    ingredientId: string;

    createdAt: Date;
    updatedAt: Date;
}

export const OptIngredientProductModel = sequelize.define<OptIngredientProduct>('optIngredientsProduct', {
    productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: ProductModel,
			key: 'id'
		}
    },
    optIngredientId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: OptIngredientModel,
			key: 'id'
		}
    }
}, {
    timestamps: true
}
)