import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { OptIngredientModel } from './optIngredient';
import { TicketRowModel } from './ticketsRow';

export interface TicketRowOptIngredient extends Model {
    id: string,
    ticketRowId: string;
    optIngredientId: string;

    createdAt: Date;
    updatedAt: Date;
}

export const TicketRowOptIngredientModel = sequelize.define<TicketRowOptIngredient>('ticketRowOptIngredient', {
    id: {
        type: DataTypes.UUID,
		primaryKey: true
    },
    ticketRowId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: TicketRowModel,
			key: 'id'
		}
    },
    optIngredientId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references : {
			model: OptIngredientModel,
			key: 'id'
		}
    },
    selected: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true
}
)