import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Ticket from './ticket';

class Review extends Model {
  public id!: string;
  public ticketId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  ticketId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  attention: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  environment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize
});

// Add association to Ticket model
Review.belongsTo(Ticket, {
    foreignKey: 'ticketId'
});  

export default Review;