import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Card extends Model {
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
  },
  {
    sequelize,
    tableName: 'cards',
    timestamps: true
  }
);

export default Card;