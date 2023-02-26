import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { TicketModel } from './ticket';
import { ProductModel } from './product';

export interface TicketRow extends Model {
    id: string;
    ticketId: string;
    ProductId: string;
    quantity: number;
    unitPrice: number;
    
    createdAt: Date;
    updatedAt: Date;
}

export const TicketRowModel = sequelize.define<TicketRow>('ticketRow', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    ticketId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: TicketModel,
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
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