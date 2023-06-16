import { Model, DataTypes, Sequelize } from 'sequelize';
import { OptIngredient } from './optIngredient';
import { Product } from './product';

export class OptIngredientProduct extends Model {
    public productId!: string;
    public optIngredientId!: string;
    public addOrRem!: 'ADD' | 'REMOVE';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public defaultQuantity!: number;
    public maxQuantity!: number;
    public variants!: Array<String>;
}

export const initOptIngredientProduct = (sequelize: Sequelize) => {
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
        variants : {
            type: DataTypes.ARRAY(DataTypes.STRING(50)),
            defaultValue: []
        }
    }, {
        sequelize,
        tableName: 'optIngredientsProduct',
        timestamps: true
    });
}