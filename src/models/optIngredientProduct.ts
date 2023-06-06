import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { OptIngredientModel } from './optIngredient';
import { ProductModel } from './product';

export class OptIngredientProductModel extends Model {
    public productId!: string;
    public optIngredientId!: string;
    public addOrRem!: 'ADD' | 'REMOVE';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OptIngredientProductModel.init({
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
    },
    defaultQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    maxQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    sequelize,
    tableName: 'optIngredientsProduct',
    timestamps: true
});
