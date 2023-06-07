import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Category extends Model {
  public id!: string;
  public title!: string;
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true
  }
);
