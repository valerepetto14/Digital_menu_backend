import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export interface Table extends Model {
  	id: string;
  	number: number;
  	createdAt: Date;
  	updatedAt: Date;
}

export const TableModel = sequelize.define<Table>('tables',{
	id: {
		type: DataTypes.UUID,
		primaryKey: true
	},
	number: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	timestamps: true
});
