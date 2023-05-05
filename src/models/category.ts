import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class CategoryModel extends Model {
  public id!: string;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true
  }
);
