import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Ticket from './ticket';

class Card extends Model {
  public id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Card.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  sequelize
});

// Add association to Ticket model
Card.hasMany(Ticket, {
  foreignKey: 'ticketId'
});

export default Ticket;