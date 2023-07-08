import { Model, DataTypes, Sequelize, Identifier } from 'sequelize';
import { Order } from './order';
import { TABLE_NOT_FOUND } from '../utils/errors';
export class Table extends Model {
	public id!: string;
	public number!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export const initTable = (sequelize:Sequelize) => {
	Table.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		number: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'tables',
		timestamps: true
	});
}


export const checkIfTableExists = async (tableId: Identifier): Promise<Table> => {
	try {
		const table = await Table.findByPk(tableId);
		if (table) {
			return table
		}
		throw TABLE_NOT_FOUND;
	} catch (error) {
		throw error;
	}
}