import { Model, DataTypes, Sequelize } from 'sequelize';
import { Ticket } from './ticket';
import { Table } from './table';
import { Card } from './card';
import { OrderStatus } from '../utils/types/interfaces';

export class Order extends Model {
    id!: string;
    ticketId!: string;
    price!: number;
    status!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

export const initOrder = (sequelize: Sequelize) => {
    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            ticketId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Ticket,
                    key: 'id',
                },
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
                defaultValue: 0.0,
            },
            status: {
                type: DataTypes.STRING(20),
                allowNull: false,
                values: [OrderStatus.SENT, OrderStatus.IN_PROGRESS, OrderStatus.DONE],
                defaultValue: OrderStatus.SENT,
            },
        },
        {
            sequelize,
            tableName: 'orders',
            timestamps: true,
        }
    );
};
