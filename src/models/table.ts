import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Ticket } from './ticket';

export class Table extends Model {
  public id!: string;
  public number!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const TableModel = sequelize.define('tables',{
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	number: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	timestamps: true
});
