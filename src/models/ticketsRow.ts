import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Ticket } from './ticket';
import { Product } from './product';


export interface TicketRow extends Model {
    ticketId: string;
    ProductId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export const TicketRowModel = sequelize.define<TicketRow>('TicketRow', {
    ticketId: {
      type: DataTypes.UUID,
      references: {
        model: Ticket,
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.UUID,
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
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    },{
        timestamps:true
    }
  );