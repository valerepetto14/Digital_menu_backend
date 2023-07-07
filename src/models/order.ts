import { Model, DataTypes, Sequelize } from 'sequelize';
import { Ticket } from './ticket';
import { Table } from './table';
import { Card } from './card';
import { OrderStatus } from '../utils/types/interfaces';

export class Order extends Model {
    id!: string;
    ticketId!: string;
    tableId!: string;
    cardId!: string;
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
            tableId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Table,
                    key: 'id',
                },
            },
            cardId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Card,
                    key: 'id',
                },
            },
            status: {
                type: DataTypes.STRING(20),
                allowNull: false,
                values: [OrderStatus.SEND, OrderStatus.IN_PROGRESS, OrderStatus.DONE],
                defaultValue: OrderStatus.IN_PROGRESS,
            },
        },
        {
            sequelize,
            tableName: 'orders',
            timestamps: true,
        }
    );
};
