import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Ticket } from './ticket';

export class Review extends Model {
  public id!: string;
  public ticketId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ReviewModel = sequelize.define('reviews',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ticketId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tickets',
        key: 'id'
      }
    },
    service: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3, 4, 5]],
        isInt : true
      }
    },
    attention: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3, 4, 5]],
        isInt : true
      }
    },
    environment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3, 4, 5]],
        isInt : true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3, 4, 5]],
        isInt : true
      }
    }
}, {
	timestamps: true
});
