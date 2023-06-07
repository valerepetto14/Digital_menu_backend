import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { OptIngredient } from './optIngredient';
import { Product } from './product';

export class OptIngredientProduct extends Model {
    public productId!: string;
    public optIngredientId!: string;
    public addOrRem!: 'ADD' | 'REMOVE';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OptIngredientProduct.init({
    productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: Product,
			key: 'id'
		}
    },
    optIngredientId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: OptIngredient,
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
