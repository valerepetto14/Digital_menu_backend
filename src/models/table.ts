import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Ticket from './ticket';

class Table extends Model {
  public id!: string;
  public number!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Table.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize
});

// Add association to Ticket model
Table.hasMany(Ticket, {
    foreignKey: 'tableId'
});  

export default Table;