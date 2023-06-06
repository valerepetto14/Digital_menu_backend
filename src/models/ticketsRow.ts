import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { TicketModel } from './ticket';
import { ProductModel } from './product';
import { OptIngredientProductTicketRow } from '../utils/types/interfaces';
export class TicketRowModel extends Model {
    public id!: string;
    public ticketId!: string;
    public productId!: string;
    public quantity!: number;
    public unitPrice!: number;
    public optIngredient!: Array<OptIngredientProductTicketRow>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TicketRowModel.init({
    ticketId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: TicketModel,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id'
        }
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
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'ticketRows',
    timestamps: true
});
