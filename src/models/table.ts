import { Model, DataTypes, Sequelize } from 'sequelize';

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
