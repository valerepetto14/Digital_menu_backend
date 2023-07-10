import { Model, DataTypes, Sequelize } from 'sequelize';
import { Table } from './table';
import { Card } from './card';
import { Product } from './product';
import { Order } from './order';
import { TicketStatus } from '../utils/types/interfaces';

export class Ticket extends Model {
    public id!: string;
    public tableId!: string;
    public cardId!: string;
    public userId!: string;
    public status!: TicketStatus.IN_PROGRESS | TicketStatus.PAID;
    public products!: Product[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getOrders = async () => {
        try {
            const orders = await Order.findAll({
                where: {
                    ticketId: this.id,
                },
                attributes: ['id', 'status', 'createdAt', 'updatedAt'],
            });
            return orders;
        } catch (error) {
            throw error;
        }
    };
}

export const initTicket = (sequelize: Sequelize) => {
    Ticket.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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
                defaultValue: TicketStatus.IN_PROGRESS,
                values: [TicketStatus.IN_PROGRESS, TicketStatus.PAID],
            },
        },
        {
            sequelize,
            tableName: 'tickets',
            timestamps: true,
        }
    );
};
