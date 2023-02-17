import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Ticket extends Model {
	public id!: string;
	public tableId!: string;
	public cardId!: string;
	public userId!: string;
	public status!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
			model: 'tables',
			key: 'id'
		}
	},
	cardId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: 'cards',
			key: 'id'
		}
	},
	userId: {
		type: DataTypes.UUID,
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

