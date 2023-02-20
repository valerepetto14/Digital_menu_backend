import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { CardModel } from './card';
import { UserModel } from './user';
import { TableModel } from './table';

export interface Ticket extends Model {
	id: string;
	tableId: string;
	cardId: string;
	userId: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export const TicketModel = sequelize.define<Ticket>('tickets',{
	id: {
		type: DataTypes.UUID,
		primaryKey: true
	},
	tableId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: TableModel,
			key: 'id'
		}
	},
	cardId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: CardModel,
			key: 'id'
		}
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: UserModel,
			key: 'id'
		}
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
		isIn: [['send', 'inProgress', 'done']]
		}
	}
}, {
	timestamps: true
});

