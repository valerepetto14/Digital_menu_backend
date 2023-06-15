import { Model, DataTypes, Sequelize } from 'sequelize';
import { Ticket } from './ticket';
import { Product } from './product';
import { OptIngredientProductTicketRow } from '../utils/types/interfaces';

export class TicketRow extends Model {
    public id!: string;
    public ticketId!: string;
    public productId!: string;
    public quantity!: number;
    public unitPrice!: number;
    public optIngredient!: Array<OptIngredientProductTicketRow>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initTicketRow = (sequelize: Sequelize) => {
    TicketRow.init({
        ticketId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Ticket,
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
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
    })
}