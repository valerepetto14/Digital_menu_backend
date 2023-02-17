import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { TicketModel } from './ticket';

export class Review extends Model {
  public id!: string;
  public ticketId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ReviewModel = sequelize.define<Review>('reviews',{
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    ticketId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: TicketModel,
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
