import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { TicketModel } from './ticket';
import { ProductModel } from './product';

export class TicketRowModel extends Model {
    public id!: string;
    public ticketId!: string;
    public productId!: string;
    public quantity!: number;
    public unitPrice!: number;
    public optIngredient!: Array<any>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TicketRowModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
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
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    optIngredient: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'ticketRows',
    timestamps: true
});
