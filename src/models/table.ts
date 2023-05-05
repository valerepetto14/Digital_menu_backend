import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class TableModel extends Model {
	public id!: string;
	public number!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

TableModel.init({
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

export default TableModel;