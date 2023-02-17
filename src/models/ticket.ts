import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Table from './table';
import Card from './card';
import User from './user';
import Review from './review';

class Ticket extends Model {
  public id!: string;
  public tableId!: string;
  public cardId!: string;
  public userId!: string;
  public status!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  tableId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: Table,
      key: 'id'
    }
  },
  cardId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: Card,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize
});

// Add association to Table model
Ticket.belongsTo(Table, {
    foreignKey: 'tableId'
});  

// Add association to Card model
Ticket.belongsTo(Card, {
  foreignKey: 'cardId'
});

// Add association to User model
Ticket.belongsTo(User, {
  foreignKey: 'userId'
});

// Add association to Review model
Ticket.hasOne(Review, {
  foreignKey: 'reviewId'
});

export default Ticket;