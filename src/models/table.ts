import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Table extends Model {
  public id!: string;
  public number!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
