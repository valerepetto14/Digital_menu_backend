import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { TicketModel } from './ticket';
import { ProductModel } from './product';

export interface TicketRow extends Model {
    ticketId: string;
    ProductId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export const TicketRowModel = sequelize.define<TicketRow>('ticketRow', {
    ticketId: {
      type: DataTypes.UUID,
      references: {
        model: TicketModel,
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
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
    }
    },{
        timestamps:true
    }
);