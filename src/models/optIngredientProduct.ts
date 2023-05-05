import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { OptIngredientModel } from './optIngredient';
import { ProductModel } from './product';

export class OptIngredientProductModel extends Model {
    public productId!: string;
    public optIngredientId!: string;
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
    }
}, {
    sequelize,
    tableName: 'optIngredientsProduct',
    timestamps: true
});
