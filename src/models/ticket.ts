import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Table } from './table';
import { Card } from './card';
import { User } from './user';
import { Review } from './review';

export class Ticket extends Model {
	public id!: string;
	public tableId!: string;
	public cardId!: string;
	public userId!: string;
	public status!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export const TicketModel = sequelize.define('tickets',{
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	tableId: {
		type: DataTypes.STRING(50),
		allowNull: false,
		references : {
		model: 'tables',
		key: 'id'
		}
	},
	cardId: {
		type: DataTypes.STRING(50),
		allowNull: false,
		references : {
		model: 'cards',
		key: 'id'
		}
	},
	userId: {
		type: DataTypes.STRING(50),
		allowNull: false,
		references : {
		model: 'users',
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

