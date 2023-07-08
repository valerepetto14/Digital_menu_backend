import { Model, DataTypes, Sequelize } from 'sequelize';
import { Order } from './order';
import { Product } from './product';
import { IOptIngredientProductOrderRow } from '../utils/types/interfaces';

export class OrderRow extends Model {
    public id!: string;
    public orderId!: string;
    public productId!: string;
    public quantity!: number;
    public unitPrice!: number;
    public optIngredient!: Array<IOptIngredientProductOrderRow>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initOrderRow = (sequelize: Sequelize) => {
    OrderRow.init(
        {
            orderId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Order,
                    key: 'id',
                },
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Product,
                    key: 'id',
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            unitPrice: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            optIngredients: {
                type: DataTypes.ARRAY(DataTypes.JSON),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'OrdersRows',
            timestamps: true,
        }
    );
};
